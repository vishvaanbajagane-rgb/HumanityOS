"""
Healthcare directory endpoints. Public read (no auth required) since this
data is a public reference directory, same as the RLS policy allows on Supabase.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.models.healthcare import Healthcare
from app.schemas.healthcare import HealthcareOut, HealthcareListResponse

router = APIRouter()


@router.get("", response_model=HealthcareListResponse, response_model_by_alias=True)
async def list_healthcare(
    type: str | None = Query(None, description="Filter by facility type"),
    is_24x7: bool | None = Query(None),
    is_free: bool | None = Query(None),
    search: str | None = Query(None, description="Search by name"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    query = select(Healthcare)
    count_query = select(func.count()).select_from(Healthcare)

    if type:
        query = query.where(Healthcare.type == type)
        count_query = count_query.where(Healthcare.type == type)
    if is_24x7 is not None:
        query = query.where(Healthcare.is_24x7 == is_24x7)
        count_query = count_query.where(Healthcare.is_24x7 == is_24x7)
    if is_free is not None:
        query = query.where(Healthcare.is_free == is_free)
        count_query = count_query.where(Healthcare.is_free == is_free)
    if search:
        query = query.where(Healthcare.name.ilike(f"%{search}%"))
        count_query = count_query.where(Healthcare.name.ilike(f"%{search}%"))

    total = (await db.execute(count_query)).scalar_one()
    result = await db.execute(query.order_by(Healthcare.name.asc()).limit(limit).offset(offset))
    items = result.scalars().all()

    return HealthcareListResponse(
        total=total,
        items=[
            HealthcareOut(
                id=h.id,
                name=h.name,
                type=h.type,
                services=h.services or [],
                address=h.address,
                latitude=h.latitude,
                longitude=h.longitude,
                phone=h.phone,
                is24x7=h.is_24x7,
                isFree=h.is_free,
            )
            for h in items
        ],
    )