"""
Government schemes endpoints. Public read, same as the RLS policy on Supabase.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.models.government_scheme import GovernmentScheme
from app.schemas.government_scheme import GovernmentSchemeOut, GovernmentSchemeListResponse

router = APIRouter()


@router.get("", response_model=GovernmentSchemeListResponse, response_model_by_alias=True)
async def list_government_schemes(
    country: str | None = Query(None),
    category: str | None = Query(None),
    search: str | None = Query(None, description="Search by title"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    query = select(GovernmentScheme)
    count_query = select(func.count()).select_from(GovernmentScheme)

    if country:
        query = query.where(GovernmentScheme.country == country)
        count_query = count_query.where(GovernmentScheme.country == country)
    if category:
        query = query.where(GovernmentScheme.category == category)
        count_query = count_query.where(GovernmentScheme.category == category)
    if search:
        query = query.where(GovernmentScheme.title.ilike(f"%{search}%"))
        count_query = count_query.where(GovernmentScheme.title.ilike(f"%{search}%"))

    total = (await db.execute(count_query)).scalar_one()
    result = await db.execute(
        query.order_by(GovernmentScheme.deadline.asc().nullslast()).limit(limit).offset(offset)
    )
    items = result.scalars().all()

    return GovernmentSchemeListResponse(total=total, items=[GovernmentSchemeOut.model_validate(s) for s in items])