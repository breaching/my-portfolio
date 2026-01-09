from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import logging

from app.config import get_settings, validate_startup
from app.database import init_db
from app.routers import projects, contact
from app.middleware.security import (
    SecurityHeadersMiddleware,
    RateLimitMiddleware,
    BruteForceMiddleware,
    ContactRateLimitMiddleware,
    SuspiciousRequestMiddleware,
)
from app.logging_config import setup_logging, security_logger

# Validate configuration at import time
settings = validate_startup()

# Setup structured logging
setup_logging(log_level=settings.log_level, log_format=settings.log_format)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    logger.info("Starting application", extra={
        "environment": settings.environment,
        "debug": settings.debug,
    })
    await init_db()
    logger.info("Database initialized successfully")
    yield
    logger.info("Shutting down application")


app = FastAPI(
    title=settings.app_name,
    description="API backend for the portfolio website",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
    openapi_url="/openapi.json" if settings.debug else None,
)


class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    """Middleware to limit request body size."""

    async def dispatch(self, request: Request, call_next):
        if request.method in ["POST", "PUT", "PATCH"]:
            content_length = request.headers.get("content-length")
            if content_length and int(content_length) > settings.max_request_size:
                return JSONResponse(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    content={"detail": "Request body too large"}
                )
        return await call_next(request)


# Middleware stack (LIFO order)
if settings.allowed_hosts and settings.allowed_hosts != ["*"]:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.allowed_hosts
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "X-API-Key"],
    expose_headers=["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset", "Retry-After"],
)

app.add_middleware(RequestSizeLimitMiddleware)

if settings.enable_rate_limiting:
    app.add_middleware(
        RateLimitMiddleware,
        calls=settings.rate_limit_calls,
        period=settings.rate_limit_period,
    )

# Contact-specific rate limit (5 submissions per hour)
app.add_middleware(ContactRateLimitMiddleware, max_submissions=5, period=3600)

# Brute force protection (blocks after 5 failed auth attempts)
app.add_middleware(BruteForceMiddleware, max_failures=5, block_duration=900)

# Suspicious request detection (SQL injection, XSS, path traversal)
app.add_middleware(SuspiciousRequestMiddleware)

app.add_middleware(
    SecurityHeadersMiddleware,
    enable_hsts=settings.enable_hsts,
    csp_report_uri=settings.csp_report_uri or None
)

# Include routers
app.include_router(projects.router, prefix="/api")
app.include_router(contact.router, prefix="/api")


def get_client_ip(request: Request) -> str:
    """Extract client IP from request headers."""
    return (
        request.headers.get("cf-connecting-ip")
        or request.headers.get("x-real-ip")
        or request.headers.get("x-forwarded-for", "").split(",")[0].strip()
        or request.client.host if request.client else "unknown"
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler - never expose internal details in production."""
    ip = get_client_ip(request)

    logger.error(
        f"Unhandled exception on {request.method} {request.url.path}",
        exc_info=True,
        extra={
            "ip": ip,
            "path": str(request.url.path),
            "method": request.method,
        }
    )

    if settings.debug:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "detail": "Internal server error",
                "error": str(exc),
                "type": type(exc).__name__,
            }
        )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error"}
    )


@app.get("/")
async def root():
    """Root endpoint - minimal info only."""
    return {
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post("/csp-report")
async def csp_report(request: Request):
    """
    Endpoint to collect CSP violation reports.
    Logs violations for security monitoring.
    """
    try:
        body = await request.json()
        csp_report_data = body.get("csp-report", body)

        security_logger.suspicious_request(
            ip=get_client_ip(request),
            path=csp_report_data.get("document-uri", "unknown"),
            user_agent=request.headers.get("user-agent", ""),
            reason=f"csp_violation:{csp_report_data.get('violated-directive', 'unknown')}"
        )

        logger.warning(
            "CSP Violation",
            extra={
                "blocked_uri": csp_report_data.get("blocked-uri"),
                "violated_directive": csp_report_data.get("violated-directive"),
                "document_uri": csp_report_data.get("document-uri"),
            }
        )
    except Exception:
        pass  # Silently ignore malformed reports

    return {"status": "received"}


# =============================================================================
# HONEYPOT ENDPOINTS
# These fake admin endpoints attract and log malicious requests
# =============================================================================

@app.get("/admin")
@app.get("/admin/")
@app.get("/admin/login")
@app.post("/admin/login")
@app.get("/wp-admin")
@app.get("/wp-login.php")
@app.get("/.env")
@app.get("/config.php")
@app.get("/phpinfo.php")
@app.get("/api/admin/users")
@app.post("/api/admin/users")
async def honeypot_endpoint(request: Request):
    """
    Honeypot endpoint to detect and log malicious scanning attempts.
    Returns a fake 404 but logs the attempt for security monitoring.
    """
    ip = get_client_ip(request)
    user_agent = request.headers.get("user-agent", "")

    security_logger.honeypot_triggered(
        ip=ip,
        path=str(request.url.path),
        user_agent=user_agent,
    )

    # Return generic 404 - don't reveal this is a honeypot
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": "Not found"}
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        access_log=settings.debug,
    )
