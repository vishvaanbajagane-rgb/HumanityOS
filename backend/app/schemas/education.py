"""
Request/response schemas for the education directory.
"""
import uuid
from datetime import datetime

from pydantic import BaseModel


class EducationOut(BaseModel):
    id: uuid.UUID
    title: str
    provider: str | None = None
    category: str | None = None
    description: str | None = None
    eligibility: str | None = None
    url: str | None = None
    deadline: datetime | None = None

    model_config = {"from_attributes": True}


class EducationListResponse(BaseModel):
    total: int
    items: list[EducationOut]