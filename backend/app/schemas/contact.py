from datetime import datetime
from pydantic import BaseModel, Field, EmailStr, field_validator
import bleach


class ContactCreate(BaseModel):
    """Schema for creating a contact message."""

    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)

    @field_validator("name", "subject", "message")
    @classmethod
    def sanitize_text(cls, v: str) -> str:
        """
        Sanitize text inputs to prevent XSS attacks.
        Remove all HTML tags and strip whitespace.
        """
        if not v:
            return v
        # Remove all HTML tags, keeping only plain text
        sanitized = bleach.clean(v, tags=[], strip=True)
        return sanitized.strip()


class ContactResponse(BaseModel):
    """Schema for contact message response."""

    id: int
    name: str
    email: str
    subject: str
    message: str
    read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ContactListResponse(BaseModel):
    """Schema for contact messages list."""

    items: list[ContactResponse]
    total: int
    unread: int
