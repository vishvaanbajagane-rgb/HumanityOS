"""
Request/response schemas for the food support directory.
"""
import uuid

from pydantic import BaseModel, Field


class FoodSupportOut(BaseModel):
    id: uuid.UUID
    name: str
    type: str
    address: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    phone: str | None = None
    schedule: str | None = None
    eligibility: str | None = None
    is_free: bool = Field(True, alias="isFree")

    model_config = {"populate_by_name": True, "from_attributes": True}


class FoodSupportListResponse(BaseModel):
    total: int
    items: list[FoodSupportOut]