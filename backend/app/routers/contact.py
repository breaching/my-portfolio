from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import require_admin_auth
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate, ContactResponse, ContactListResponse

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=201)
async def create_message(
    message_data: ContactCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Submit a contact form message.

    All input is automatically sanitized by the ContactCreate schema.
    Rate limiting applies to prevent spam.
    """
    message = ContactMessage(
        name=message_data.name,
        email=message_data.email,
        subject=message_data.subject,
        message=message_data.message,
    )

    db.add(message)
    await db.flush()
    await db.refresh(message)

    # TODO: Send email notification here if SMTP is configured
    # await send_notification_email(message)

    return message


@router.get(
    "",
    response_model=ContactListResponse,
    dependencies=[Depends(require_admin_auth)],
)
async def list_messages(
    db: AsyncSession = Depends(get_db),
):
    """List all contact messages (admin only)."""
    # Get all messages
    query = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    result = await db.execute(query)
    messages = result.scalars().all()

    # Get total count
    total_result = await db.execute(select(func.count(ContactMessage.id)))
    total = total_result.scalar() or 0

    # Get unread count
    unread_result = await db.execute(
        select(func.count(ContactMessage.id)).where(ContactMessage.read == False)
    )
    unread = unread_result.scalar() or 0

    return ContactListResponse(
        items=messages,
        total=total,
        unread=unread,
    )


@router.get(
    "/{message_id}",
    response_model=ContactResponse,
    dependencies=[Depends(require_admin_auth)],
)
async def get_message(
    message_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Get a single contact message (admin only)."""
    query = select(ContactMessage).where(ContactMessage.id == message_id)
    result = await db.execute(query)
    message = result.scalar_one_or_none()

    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    return message


@router.patch(
    "/{message_id}/read",
    response_model=ContactResponse,
    dependencies=[Depends(require_admin_auth)],
)
async def mark_as_read(
    message_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Mark a message as read (admin only)."""
    query = select(ContactMessage).where(ContactMessage.id == message_id)
    result = await db.execute(query)
    message = result.scalar_one_or_none()

    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.read = True
    await db.flush()
    await db.refresh(message)

    return message


@router.delete(
    "/{message_id}",
    status_code=204,
    dependencies=[Depends(require_admin_auth)],
)
async def delete_message(
    message_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Delete a contact message (admin only)."""
    query = select(ContactMessage).where(ContactMessage.id == message_id)
    result = await db.execute(query)
    message = result.scalar_one_or_none()

    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    await db.delete(message)
