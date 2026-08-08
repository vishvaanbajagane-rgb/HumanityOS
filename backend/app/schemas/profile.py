"""
Request/response schemas for the profile page: identity, profile fields,
and notification preferences.
"""
from pydantic import BaseModel, Field


class ProfileOut(BaseModel):
    name: str | None = None
    email: str | None = None
    photo_url: str | None = Field(None, alias="photoUrl")
    preferred_language: str = Field("en", alias="preferredLanguage")
    country: str | None = None
    phone: str | None = None
    bio: str | None = None
    notification_email: bool = Field(True, alias="notificationEmail")
    notification_push: bool = Field(True, alias="notificationPush")
    high_contrast: bool = Field(False, alias="highContrast")
    large_text: bool = Field(False, alias="largeText")

    model_config = {"populate_by_name": True}


class ProfileUpdateRequest(BaseModel):
    name: str | None = Field(None, max_length=255)
    preferred_language: str | None = Field(None, alias="preferredLanguage", max_length=8)
    country: str | None = Field(None, max_length=100)
    phone: str | None = Field(None, max_length=32)
    bio: str | None = Field(None, max_length=500)
    notification_email: bool | None = Field(None, alias="notificationEmail")
    notification_push: bool | None = Field(None, alias="notificationPush")
    high_contrast: bool | None = Field(None, alias="highContrast")
    large_text: bool | None = Field(None, alias="largeText")

    model_config = {"populate_by_name": True}