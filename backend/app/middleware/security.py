"""Security middleware for the FastAPI application."""

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
import time
from typing import Callable
from collections import defaultdict

from app.logging_config import security_logger


# Global brute force tracker (shared across middleware instances)
_brute_force_tracker: dict[str, list[float]] = defaultdict(list)
_blocked_ips: dict[str, float] = {}


def get_client_ip(request: Request) -> str:
    """Extract real client IP considering proxy headers."""
    return (
        request.headers.get("cf-connecting-ip")
        or request.headers.get("x-real-ip")
        or request.headers.get("x-forwarded-for", "").split(",")[0].strip()
        or (request.client.host if request.client else "unknown")
    )


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Adds comprehensive security headers to all responses.

    Headers applied:
    - Content-Security-Policy: Restrictive CSP for API
    - X-Content-Type-Options: Prevents MIME sniffing
    - X-XSS-Protection: Legacy XSS protection
    - X-Frame-Options: Prevents clickjacking
    - Referrer-Policy: Controls referrer information
    - Strict-Transport-Security: HSTS (optional)
    - Permissions-Policy: Restricts browser features
    """

    def __init__(self, app: ASGIApp, enable_hsts: bool = False, csp_report_uri: str | None = None):
        super().__init__(app)
        self.enable_hsts = enable_hsts
        self.csp_report_uri = csp_report_uri

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        response = await call_next(request)

        # Content Security Policy with optional reporting
        csp = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
        if self.csp_report_uri:
            csp += f"; report-uri {self.csp_report_uri}"
        response.headers["Content-Security-Policy"] = csp

        # Prevent MIME type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"

        # XSS Protection (legacy)
        response.headers["X-XSS-Protection"] = "1; mode=block"

        # Prevent clickjacking
        response.headers["X-Frame-Options"] = "DENY"

        # Referrer Policy
        response.headers["Referrer-Policy"] = "no-referrer"

        # HSTS (only in production with HTTPS)
        if self.enable_hsts:
            response.headers["Strict-Transport-Security"] = (
                "max-age=31536000; includeSubDomains; preload"
            )

        # Permissions Policy
        response.headers["Permissions-Policy"] = (
            "accelerometer=(), camera=(), geolocation=(), "
            "gyroscope=(), magnetometer=(), microphone=(), "
            "payment=(), usb=()"
        )

        # Remove server header
        response.headers.pop("Server", None)

        return response


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    In-memory rate limiting middleware with security logging.

    Features:
    - Per-IP rate limiting
    - Cloudflare/proxy IP detection
    - Security event logging
    - Rate limit headers in responses

    Note: For multi-worker production, use Redis-based solution.
    """

    def __init__(self, app: ASGIApp, calls: int = 100, period: int = 60):
        super().__init__(app)
        self.calls = calls
        self.period = period
        self.clients: dict[str, list[float]] = {}

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        client_ip = get_client_ip(request)
        current_time = time.time()

        # Clean up old entries
        if client_ip in self.clients:
            self.clients[client_ip] = [
                timestamp for timestamp in self.clients[client_ip]
                if current_time - timestamp < self.period
            ]
        else:
            self.clients[client_ip] = []

        # Check rate limit
        if len(self.clients[client_ip]) >= self.calls:
            # Log rate limit event
            security_logger.rate_limit_triggered(
                ip=client_ip,
                path=str(request.url.path),
                limit=self.calls
            )

            return Response(
                content='{"detail":"Too many requests"}',
                status_code=429,
                media_type="application/json",
                headers={
                    "Retry-After": str(self.period),
                    "X-RateLimit-Limit": str(self.calls),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": str(int(current_time + self.period)),
                }
            )

        # Add current request
        self.clients[client_ip].append(current_time)

        response = await call_next(request)

        # Add rate limit headers
        remaining = self.calls - len(self.clients[client_ip])
        response.headers["X-RateLimit-Limit"] = str(self.calls)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        response.headers["X-RateLimit-Reset"] = str(int(current_time + self.period))

        return response


class SuspiciousRequestMiddleware(BaseHTTPMiddleware):
    """
    Detects and logs suspicious requests based on patterns.

    Checks:
    - SQL injection patterns
    - Path traversal attempts
    - Common attack signatures
    """

    SUSPICIOUS_PATTERNS = [
        "../",
        "..\\",
        "<script",
        "javascript:",
        "' OR ",
        "\" OR ",
        "1=1",
        "UNION SELECT",
        "/etc/passwd",
        "cmd.exe",
        "powershell",
    ]

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        client_ip = get_client_ip(request)
        path = str(request.url)
        user_agent = request.headers.get("user-agent", "")

        # Check URL for suspicious patterns
        url_lower = path.lower()
        for pattern in self.SUSPICIOUS_PATTERNS:
            if pattern.lower() in url_lower:
                security_logger.suspicious_request(
                    ip=client_ip,
                    path=path,
                    user_agent=user_agent,
                    reason=f"suspicious_pattern:{pattern}"
                )
                return Response(
                    content='{"detail":"Bad request"}',
                    status_code=400,
                    media_type="application/json"
                )

        return await call_next(request)


def record_auth_failure(ip: str) -> None:
    """Record a failed auth attempt for brute force tracking."""
    current_time = time.time()
    _brute_force_tracker[ip].append(current_time)


def is_ip_blocked(ip: str, max_failures: int = 5, block_duration: int = 900) -> bool:
    """
    Check if IP is blocked due to too many failed attempts.

    Args:
        ip: Client IP address
        max_failures: Number of failures before blocking (default: 5)
        block_duration: Block duration in seconds (default: 15 minutes)

    Returns:
        True if IP is blocked, False otherwise
    """
    current_time = time.time()

    # Check if IP is in block list
    if ip in _blocked_ips:
        if current_time < _blocked_ips[ip]:
            return True
        else:
            # Block expired, remove from list
            del _blocked_ips[ip]
            _brute_force_tracker[ip] = []

    # Clean old failures (last 15 minutes only)
    window = 900  # 15 minutes
    _brute_force_tracker[ip] = [
        t for t in _brute_force_tracker[ip]
        if current_time - t < window
    ]

    # Check if should be blocked
    if len(_brute_force_tracker[ip]) >= max_failures:
        _blocked_ips[ip] = current_time + block_duration
        security_logger.suspicious_request(
            ip=ip,
            path="/api/admin/*",
            user_agent="",
            reason=f"brute_force_blocked:failures={len(_brute_force_tracker[ip])}"
        )
        return True

    return False


class BruteForceMiddleware(BaseHTTPMiddleware):
    """
    Protects against brute force attacks on admin endpoints.

    Features:
    - Tracks failed auth attempts per IP
    - Blocks IPs after threshold (default: 5 failures)
    - Auto-unblock after cooldown (default: 15 minutes)
    """

    def __init__(
        self,
        app: ASGIApp,
        max_failures: int = 5,
        block_duration: int = 900,
        protected_paths: list[str] | None = None
    ):
        super().__init__(app)
        self.max_failures = max_failures
        self.block_duration = block_duration
        self.protected_paths = protected_paths or ["/api/projects", "/api/contact"]

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Only check protected paths with auth-required methods
        path = request.url.path
        method = request.method

        is_protected = any(path.startswith(p) for p in self.protected_paths)
        is_write_method = method in ("POST", "PUT", "PATCH", "DELETE")

        if is_protected and is_write_method:
            client_ip = get_client_ip(request)

            if is_ip_blocked(client_ip, self.max_failures, self.block_duration):
                return Response(
                    content='{"detail":"Too many failed attempts. Try again later."}',
                    status_code=429,
                    media_type="application/json",
                    headers={"Retry-After": str(self.block_duration)}
                )

        return await call_next(request)


class ContactRateLimitMiddleware(BaseHTTPMiddleware):
    """
    Stricter rate limiting specifically for the contact endpoint.

    Prevents spam by limiting contact form submissions to:
    - 5 submissions per IP per hour (default)
    """

    def __init__(self, app: ASGIApp, max_submissions: int = 5, period: int = 3600):
        super().__init__(app)
        self.max_submissions = max_submissions
        self.period = period  # 1 hour default
        self.submissions: dict[str, list[float]] = {}

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Only apply to POST /api/contact
        if request.url.path == "/api/contact" and request.method == "POST":
            client_ip = get_client_ip(request)
            current_time = time.time()

            # Clean old entries
            if client_ip in self.submissions:
                self.submissions[client_ip] = [
                    t for t in self.submissions[client_ip]
                    if current_time - t < self.period
                ]
            else:
                self.submissions[client_ip] = []

            # Check limit
            if len(self.submissions[client_ip]) >= self.max_submissions:
                security_logger.rate_limit_triggered(
                    ip=client_ip,
                    path="/api/contact",
                    limit=self.max_submissions
                )
                return Response(
                    content='{"detail":"Too many contact submissions. Please try again later."}',
                    status_code=429,
                    media_type="application/json",
                    headers={"Retry-After": str(self.period)}
                )

            # Record submission
            self.submissions[client_ip].append(current_time)

        return await call_next(request)
