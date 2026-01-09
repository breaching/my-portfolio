import json
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import require_admin_auth
from app.models.project import Project
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectListResponse,
)

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=ProjectListResponse)
async def list_projects(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    category: str | None = None,
    featured: bool | None = None,
    db: AsyncSession = Depends(get_db),
):
    """List all projects with optional filtering."""
    query = select(Project)

    if category:
        query = query.where(Project.category == category)
    if featured is not None:
        query = query.where(Project.featured == featured)

    # Get total count
    count_query = select(func.count(Project.id))
    if category:
        count_query = count_query.where(Project.category == category)
    if featured is not None:
        count_query = count_query.where(Project.featured == featured)

    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0

    # Apply pagination
    query = query.offset((page - 1) * per_page).limit(per_page)
    query = query.order_by(Project.created_at.desc())

    result = await db.execute(query)
    projects = result.scalars().all()

    return ProjectListResponse(
        items=projects,
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/categories")
async def list_categories(db: AsyncSession = Depends(get_db)):
    """List all unique project categories."""
    query = select(Project.category).distinct()
    result = await db.execute(query)
    categories = result.scalars().all()
    return {"categories": categories}


@router.get("/{slug}", response_model=ProjectResponse)
async def get_project(slug: str, db: AsyncSession = Depends(get_db)):
    """Get a single project by slug."""
    query = select(Project).where(Project.slug == slug)
    result = await db.execute(query)
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@router.post(
    "",
    response_model=ProjectResponse,
    status_code=201,
    dependencies=[Depends(require_admin_auth)],
)
async def create_project(
    project_data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a new project (admin only)."""
    # Check if slug already exists
    existing = await db.execute(
        select(Project).where(Project.slug == project_data.slug)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")

    project = Project(
        slug=project_data.slug,
        title=project_data.title,
        description=project_data.description,
        long_description=project_data.long_description,
        category=project_data.category,
        tags=json.dumps(project_data.tags),
        date=project_data.date,
        image=project_data.image,
        github=project_data.github,
        demo=project_data.demo,
        featured=project_data.featured,
    )

    db.add(project)
    await db.flush()
    await db.refresh(project)

    return project


@router.patch(
    "/{slug}",
    response_model=ProjectResponse,
    dependencies=[Depends(require_admin_auth)],
)
async def update_project(
    slug: str,
    project_data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update an existing project (admin only)."""
    query = select(Project).where(Project.slug == slug)
    result = await db.execute(query)
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = project_data.model_dump(exclude_unset=True)

    if "tags" in update_data:
        update_data["tags"] = json.dumps(update_data["tags"])

    for field, value in update_data.items():
        setattr(project, field, value)

    await db.flush()
    await db.refresh(project)

    return project


@router.delete(
    "/{slug}",
    status_code=204,
    dependencies=[Depends(require_admin_auth)],
)
async def delete_project(slug: str, db: AsyncSession = Depends(get_db)):
    """Delete a project (admin only)."""
    query = select(Project).where(Project.slug == slug)
    result = await db.execute(query)
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await db.delete(project)
