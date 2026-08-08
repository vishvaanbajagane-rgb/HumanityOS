"""
Food support endpoints — food banks, soup kitchens, meal delivery, grocery
assistance. Public read, same as the RLS policy on Supabase.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.models.food_support import FoodSupport
from app.schemas.food_support import FoodSupportOut, FoodSupportListResponse

router = APIRouter()


@router.get("", response_model=FoodSupportListResponse, response_model_by_alias=True)
async def list_food_support(
    type: str | None = Query(None, description="food-bank | soup-kitchen | meal-delivery | grocery-assistance"),
    search: str | None = Query(None, description="Search by name"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    query = select(FoodSupport)
    count_query = select(func.count()).select_from(FoodSupport)

    if type:
        query = query.where(FoodSupport.type == type)
        count_query = count_query.where(FoodSupport.type == type)
    if search:
        query = query.where(FoodSupport.name.ilike(f"%{search}%"))
        count_query = count_query.where(FoodSupport.name.ilike(f"%{search}%"))

    total = (await db.execute(count_query)).scalar_one()
    result = await db.execute(query.order_by(FoodSupport.name.asc()).limit(limit).offset(offset))
    items = result.scalars().all()

    return FoodSupportListResponse(total=total, items=[FoodSupportOut.model_validate(f) for f in items])