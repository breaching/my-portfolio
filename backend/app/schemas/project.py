from datetime import datetime
from pydantic import BaseModel, Field, field_validator
import json
import re


class ProjectBase(BaseModel):
    """Base schema for project data."""

    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    long_description: str | None = None
    category: str = Field(..., min_length=1, max_length=50)
    tags: list[str] = Field(default_factory=list)
    date: str = Field(..., min_length=4, max_length=20)
    image: str | None = None
    github: str | None = None
    demo: str | None = None
    featured: bool = False

    @field_validator("image", "github", "demo")
    @classmethod
    def validate_url(cls, v: str | None) -> str | None:
        """Validate URLs to prevent injection attacks."""
        if v is None or v == "":
            return v

        # Only allow http, https protocols
        if not re.match(r'^https?://', v, re.IGNORECASE):
            raise ValueError("URL must start with http:// or https://")

        # Basic URL validation (prevent javascript:, data:, etc.)
        if re.search(r'(javascript|data|vbscript):', v, re.IGNORECASE):
            raise ValueError("Invalid URL protocol")

        return v.strip()

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, v: list[str]) -> list[str]:
        """Validate and sanitize tags."""
        if not v:
            return []

        # Limit number of tags
        if len(v) > 20:
            raise ValueError("Maximum 20 tags allowed")

        # Validate each tag
        sanitized = []
        for tag in v:
            # Remove whitespace and convert to lowercase
            clean_tag = tag.strip().lower()
            # Only allow alphanumeric, hyphens, and spaces
            if re.match(r'^[a-z0-9\s-]+$', clean_tag) and len(clean_tag) <= 30:
                sanitized.append(clean_tag)

        return sanitized


class ProjectCreate(ProjectBase):
    """Schema for creating a new project."""

    slug: str = Field(..., min_length=1, max_length=100, pattern=r"^[a-z0-9-]+$")


class ProjectUpdate(BaseModel):
    """Schema for updating a project (all fields optional)."""

    title: str | None = Field(None, min_length=1, max_length=200)
    description: str | None = Field(None, min_length=1)
    long_description: str | None = None
    category: str | None = Field(None, min_length=1, max_length=50)
    tags: list[str] | None = None
    date: str | None = Field(None, min_length=4, max_length=20)
    image: str | None = None
    github: str | None = None
    demo: str | None = None
    featured: bool | None = None


class ProjectResponse(ProjectBase):
    """Schema for project response."""

    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    @field_validator("tags", mode="before")
    @classmethod
    def parse_tags(cls, v):
        """Parse tags from JSON string if needed."""
        if isinstance(v, str):
            try:
                return json.loads(v)
            except json.JSONDecodeError:
                return []
        return v

    class Config:
        from_attributes = True


class ProjectListResponse(BaseModel):
    """Schema for paginated project list."""

    items: list[ProjectResponse]
    total: int
    page: int
    per_page: int
