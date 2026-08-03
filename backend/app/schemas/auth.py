"""
Request/response schemas for authentication endpoints.
"""
from datetime import datetime

from pydantic import BaseModel, Field


class SessionRequest(BaseModel):
    id_token: str = Field(..., description="Firebase ID token from the client SDK")
    is_guest: bool = False
    preferred_language: str = "en"


class UserOut(BaseModel):
    uid: str
    name: str | None
    email: str | None
    photo_url: str | None = Field(None, alias="photoUrl")
    preferred_language: str = Field(..., alias="preferredLanguage")
    country: str | None
    is_guest: bool = Field(..., alias="isGuest")
    created_at: datetime | None = Field(None, alias="createdAt")
    last_login: datetime | None = Field(None, alias="lastLogin")

    model_config = {"populate_by_name": True, "from_attributes": True}


class SessionResponse(BaseModel):
    access_token: str = Field(..., alias="accessToken")
    refresh_token: str = Field(..., alias="refreshToken")
    user: UserOut

    model_config = {"populate_by_name": True}


class RefreshRequest(BaseModel):
    refresh_token: str


class RefreshResponse(BaseModel):
    access_token: str = Field(..., alias="accessToken")

    model_config = {"populate_by_name": True}