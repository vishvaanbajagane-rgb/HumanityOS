"""
Request/response schemas for the employment (jobs) directory.
"""
import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class JobOut(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    category: str | None = None
    location: str | None = None
    salary_range: str | None = Field(None, alias="salaryRange")
    job_type: str | None = Field(None, alias="jobType")
    is_remote: bool = Field(False, alias="isRemote")
    application_url: str | None = Field(None, alias="applicationUrl")
    posted_at: datetime | None = Field(None, alias="postedAt")
    expires_at: datetime | None = Field(None, alias="expiresAt")

    model_config = {"populate_by_name": True, "from_attributes": True}


class JobListResponse(BaseModel):
    total: int
    items: list[JobOut]