"""
Request/response schemas for government schemes.
"""
import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class GovernmentSchemeOut(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    category: str | None = None
    eligibility: str | None = None
    benefits: str | None = None
    application_url: str | None = Field(None, alias="applicationUrl")
    region: str | None = None
    country: str
    deadline: datetime | None = None

    model_config = {"populate_by_name": True, "from_attributes": True}


class GovernmentSchemeListResponse(BaseModel):
    total: int
    items: list[GovernmentSchemeOut]