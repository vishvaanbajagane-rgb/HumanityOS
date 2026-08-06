"""
Request/response schemas for the healthcare directory.
"""
import uuid

from pydantic import BaseModel, Field


class HealthcareOut(BaseModel):
    id: uuid.UUID
    name: str
    type: str
    services: list[str] = []
    address: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    phone: str | None = None
    is_24x7: bool = Field(False, alias="is24x7")
    is_free: bool = Field(False, alias="isFree")

    model_config = {"populate_by_name": True, "from_attributes": True}


class HealthcareListResponse(BaseModel):
    total: int
    items: list[HealthcareOut]