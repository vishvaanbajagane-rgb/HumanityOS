"""
Employment (jobs) directory endpoints. Public read, same as the RLS policy on Supabase.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.models.job import Job
from app.schemas.job import JobOut, JobListResponse

router = APIRouter()


@router.get("", response_model=JobListResponse, response_model_by_alias=True)
async def list_jobs(
    job_type: str | None = Query(None, description="full-time | part-time | daily-wage | contract | internship"),
    is_remote: bool | None = Query(None),
    category: str | None = Query(None),
    search: str | None = Query(None, description="Search by title"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    query = select(Job)
    count_query = select(func.count()).select_from(Job)

    if job_type:
        query = query.where(Job.job_type == job_type)
        count_query = count_query.where(Job.job_type == job_type)
    if is_remote is not None:
        query = query.where(Job.is_remote == is_remote)
        count_query = count_query.where(Job.is_remote == is_remote)
    if category:
        query = query.where(Job.category == category)
        count_query = count_query.where(Job.category == category)
    if search:
        query = query.where(Job.title.ilike(f"%{search}%"))
        count_query = count_query.where(Job.title.ilike(f"%{search}%"))

    total = (await db.execute(count_query)).scalar_one()
    result = await db.execute(query.order_by(Job.posted_at.desc()).limit(limit).offset(offset))
    items = result.scalars().all()

    return JobListResponse(total=total, items=[JobOut.model_validate(j) for j in items])