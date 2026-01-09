from fastapi import Header, HTTPException, status, Request
import secrets
import logging

from app.config import get_settings
from app.logging_config import security_logger
from app.middleware.security import record_auth_failure

logger = logging.getLogger(__name__)


def get_client_ip(request: Request) -> str:
    """Extract client IP from request headers."""
    return (
        request.headers.get("cf-connecting-ip")
        or request.headers.get("x-real-ip")
        or request.headers.get("x-forwarded-for", "").split(",")[0].strip()
        or (request.client.host if request.client else "unknown")
    )


async def require_admin_auth(
    request: Request,
    x_api_key: str = Header(..., alias="X-API-Key"),
) -> None:
    """
    Validates admin API key using timing-safe comparison.

    Security features:
    - Timing-safe comparison prevents timing attacks
    - Logs all auth attempts (success and failure)
    - Generic error messages to prevent enumeration
    """
    settings = get_settings()
    ip = get_client_ip(request)
    path = str(request.url.path)

    if not settings.admin_api_key:
        logger.error("Admin auth not configured - rejecting request")
        security_logger.access_denied(
            ip=ip,
            path=path,
            method=request.method,
            reason="auth_not_configured"
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporarily unavailable",
        )

    # Timing-safe comparison to prevent timing attacks
    if not secrets.compare_digest(x_api_key, settings.admin_api_key):
        security_logger.auth_failure(ip=ip, path=path, reason="invalid_api_key")
        # Record failure for brute force protection
        record_auth_failure(ip)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "API-Key"},
        )

    # Log successful authentication
    security_logger.auth_success(ip=ip, path=path)
