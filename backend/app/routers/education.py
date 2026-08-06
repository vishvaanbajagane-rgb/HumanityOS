"""
Education directory endpoints — scholarships, courses, admissions, vocational
training, literacy programs. Public read, same as the RLS policy on Supabase.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.models.education import Education
from app.schemas.education import EducationOut, EducationListResponse

router = APIRouter()


@router.get("", response_model=EducationListResponse)
async def list_education(
    category: str | None = Query(None, description="scholarship | course | school-admission | vocational-training | literacy-program"),
    search: str | None = Query(None, description="Search by title"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    query = select(Education)
    count_query = select(func.count()).select_from(Education)

    if category:
        query = query.where(Education.category == category)
        count_query = count_query.where(Education.category == category)
    if search:
        query = query.where(Education.title.ilike(f"%{search}%"))
        count_query = count_query.where(Education.title.ilike(f"%{search}%"))

    total = (await db.execute(count_query)).scalar_one()
    result = await db.execute(query.order_by(Education.deadline.asc().nullslast()).limit(limit).offset(offset))
    items = result.scalars().all()

    return EducationListResponse(total=total, items=[EducationOut.model_validate(e) for e in items])