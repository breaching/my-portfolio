import logging
import json
import sys
from datetime import datetime, timezone
from typing import Any, Optional
from enum import Enum


class SecurityEvent(str, Enum):
    AUTH_SUCCESS = "AUTH_SUCCESS"
    AUTH_FAILURE = "AUTH_FAILURE"
    RATE_LIMIT_TRIGGERED = "RATE_LIMIT_TRIGGERED"
    INPUT_REJECTED = "INPUT_REJECTED"
    ACCESS_DENIED = "ACCESS_DENIED"
    SUSPICIOUS_REQUEST = "SUSPICIOUS_REQUEST"
    HONEYPOT_TRIGGERED = "HONEYPOT_TRIGGERED"


class JSONFormatter(logging.Formatter):
    """Structured JSON log formatter"""

    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }

        # Add extra fields if present
        if hasattr(record, "ip"):
            log_data["ip"] = record.ip
        if hasattr(record, "user_agent"):
            log_data["user_agent"] = record.user_agent
        if hasattr(record, "path"):
            log_data["path"] = record.path
        if hasattr(record, "method"):
            log_data["method"] = record.method
        if hasattr(record, "status_code"):
            log_data["status_code"] = record.status_code
        if hasattr(record, "security_event"):
            log_data["security_event"] = record.security_event
        if hasattr(record, "details"):
            log_data["details"] = record.details

        # Add exception info if present
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_data, ensure_ascii=False)


class SecurityLogger:
    """Centralized security event logger"""

    def __init__(self, name: str = "security"):
        self.logger = logging.getLogger(name)

    def _log(
        self,
        level: int,
        event: SecurityEvent,
        message: str,
        ip: Optional[str] = None,
        user_agent: Optional[str] = None,
        path: Optional[str] = None,
        method: Optional[str] = None,
        details: Optional[dict] = None,
    ):
        extra = {
            "security_event": event.value,
        }
        if ip:
            # Mask last octet for privacy
            parts = ip.split(".")
            if len(parts) == 4:
                extra["ip"] = f"{parts[0]}.{parts[1]}.{parts[2]}.xxx"
            else:
                extra["ip"] = "masked"
        if user_agent:
            # Truncate user agent
            extra["user_agent"] = user_agent[:100] if user_agent else None
        if path:
            extra["path"] = path
        if method:
            extra["method"] = method
        if details:
            # Remove any sensitive data from details
            safe_details = {k: v for k, v in details.items()
                          if k.lower() not in ("password", "api_key", "token", "secret")}
            extra["details"] = safe_details

        self.logger.log(level, message, extra=extra)

    def auth_success(self, ip: str, path: str):
        self._log(
            logging.INFO,
            SecurityEvent.AUTH_SUCCESS,
            "Admin authentication successful",
            ip=ip,
            path=path,
        )

    def auth_failure(self, ip: str, path: str, reason: str = "invalid_key"):
        self._log(
            logging.WARNING,
            SecurityEvent.AUTH_FAILURE,
            f"Admin authentication failed: {reason}",
            ip=ip,
            path=path,
            details={"reason": reason},
        )

    def rate_limit_triggered(self, ip: str, path: str, limit: int):
        self._log(
            logging.WARNING,
            SecurityEvent.RATE_LIMIT_TRIGGERED,
            f"Rate limit exceeded: {limit} requests",
            ip=ip,
            path=path,
            details={"limit": limit},
        )

    def input_rejected(self, ip: str, path: str, field: str, reason: str):
        self._log(
            logging.WARNING,
            SecurityEvent.INPUT_REJECTED,
            f"Input validation failed on field '{field}'",
            ip=ip,
            path=path,
            details={"field": field, "reason": reason},
        )

    def access_denied(self, ip: str, path: str, method: str, reason: str = "unauthorized"):
        self._log(
            logging.WARNING,
            SecurityEvent.ACCESS_DENIED,
            f"Access denied: {reason}",
            ip=ip,
            path=path,
            method=method,
            details={"reason": reason},
        )

    def suspicious_request(self, ip: str, path: str, user_agent: str, reason: str):
        self._log(
            logging.WARNING,
            SecurityEvent.SUSPICIOUS_REQUEST,
            f"Suspicious request detected: {reason}",
            ip=ip,
            path=path,
            user_agent=user_agent,
            details={"reason": reason},
        )

    def honeypot_triggered(self, ip: str, path: str, user_agent: str):
        self._log(
            logging.WARNING,
            SecurityEvent.HONEYPOT_TRIGGERED,
            "Honeypot endpoint accessed",
            ip=ip,
            path=path,
            user_agent=user_agent,
        )


def setup_logging(log_level: str = "INFO", log_format: str = "json"):
    """Configure application logging"""
    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, log_level.upper()))

    # Remove existing handlers
    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)

    # Create handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(getattr(logging, log_level.upper()))

    # Set formatter based on format type
    if log_format == "json":
        handler.setFormatter(JSONFormatter())
    else:
        handler.setFormatter(logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        ))

    root_logger.addHandler(handler)

    # Reduce noise from third-party libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.error").setLevel(logging.WARNING)

    return root_logger


# Global security logger instance
security_logger = SecurityLogger()
