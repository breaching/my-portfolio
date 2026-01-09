from pydantic_settings import BaseSettings
from pydantic import field_validator, model_validator
from functools import lru_cache
from typing import List, Literal
import sys


class Settings(BaseSettings):
    # Application
    app_name: str = "Portfolio API"
    environment: Literal["development", "staging", "production"] = "development"
    debug: bool = False
    database_url: str = "sqlite+aiosqlite:///./portfolio.db"
    content_dir: str = "./content"

    # CORS
    cors_origins: List[str] = ["http://localhost:3000"]

    # SMTP (optional)
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    contact_email: str = ""

    # Security - CRITICAL
    admin_api_key: str = ""

    # Rate limiting
    max_request_size: int = 5_000_000
    enable_rate_limiting: bool = True
    rate_limit_calls: int = 100
    rate_limit_period: int = 60

    # HSTS
    enable_hsts: bool = False
    allowed_hosts: List[str] = ["*"]

    # Logging
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"
    log_format: Literal["json", "text"] = "json"

    # CSP Reporting (optional)
    csp_report_uri: str = ""  # e.g., "/csp-report" or external URL

    @field_validator("admin_api_key")
    @classmethod
    def validate_api_key(cls, v: str, info) -> str:
        if not v or len(v) < 32:
            # Will be checked at startup
            return v
        return v

    @model_validator(mode="after")
    def validate_production_settings(self):
        """Validate critical settings for production"""
        if self.environment == "production":
            errors = []

            if not self.admin_api_key or len(self.admin_api_key) < 32:
                errors.append("ADMIN_API_KEY must be at least 32 characters in production")

            if self.debug:
                errors.append("DEBUG must be False in production")

            if "*" in self.allowed_hosts:
                errors.append("ALLOWED_HOSTS cannot contain '*' in production")

            if "localhost" in str(self.cors_origins) or "127.0.0.1" in str(self.cors_origins):
                errors.append("CORS_ORIGINS should not contain localhost in production")

            if not self.enable_hsts:
                errors.append("ENABLE_HSTS should be True in production")

            if errors:
                print("\n" + "=" * 60, file=sys.stderr)
                print("CRITICAL SECURITY ERRORS - APPLICATION CANNOT START", file=sys.stderr)
                print("=" * 60, file=sys.stderr)
                for error in errors:
                    print(f"  ✗ {error}", file=sys.stderr)
                print("=" * 60 + "\n", file=sys.stderr)
                sys.exit(1)

        return self

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()


def validate_startup():
    """Called at application startup to validate configuration"""
    settings = get_settings()

    warnings = []

    if not settings.admin_api_key:
        warnings.append("ADMIN_API_KEY is not set - admin endpoints will be inaccessible")
    elif len(settings.admin_api_key) < 32:
        warnings.append("ADMIN_API_KEY is less than 32 characters - consider using a stronger key")

    if settings.environment == "development" and settings.debug:
        warnings.append("DEBUG mode is enabled - do not use in production")

    if warnings:
        print("\n" + "-" * 60, file=sys.stderr)
        print("CONFIGURATION WARNINGS", file=sys.stderr)
        print("-" * 60, file=sys.stderr)
        for warning in warnings:
            print(f"  ⚠ {warning}", file=sys.stderr)
        print("-" * 60 + "\n", file=sys.stderr)

    return settings
