"""
Profile endpoints: view and update the current user's profile fields
and notification/accessibility preferences.
"""
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user, TokenPayload
from app.database.session import get_db
from app.models.user import User
from app.models.profile import Profile
from app.models.user_preference import UserPreferences
from app.schemas.profile import ProfileOut, ProfileUpdateRequest

router = APIRouter()


async def _load_user_with_relations(db: AsyncSession, current: TokenPayload) -> tuple[User, Profile, UserPreferences]:
    result = await db.execute(select(User).where(User.firebase_uid == current.sub))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    await db.refresh(user, attribute_names=["profile"])
    profile = user.profile
    if profile is None:
        profile = Profile(id=uuid.uuid4(), user_id=user.id)
        db.add(profile)
        await db.flush()

    prefs_result = await db.execute(select(UserPreferences).where(UserPreferences.user_id == user.id))
    prefs = prefs_result.scalar_one_or_none()
    if prefs is None:
        prefs = UserPreferences(id=uuid.uuid4(), user_id=user.id)
        db.add(prefs)
        await db.flush()

    return user, profile, prefs


def _to_profile_out(user: User, profile: Profile, prefs: UserPreferences) -> ProfileOut:
    return ProfileOut(
        name=user.name,
        email=user.email,
        photoUrl=user.photo_url,
        preferredLanguage=profile.preferred_language,
        country=profile.country,
        phone=profile.phone,
        bio=profile.bio,
        notificationEmail=prefs.notification_email,
        notificationPush=prefs.notification_push,
        highContrast=prefs.high_contrast,
        largeText=prefs.large_text,
    )


@router.get("/me", response_model=ProfileOut, response_model_by_alias=True)
async def get_my_profile(
    current: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user, profile, prefs = await _load_user_with_relations(db, current)
    await db.commit()
    return _to_profile_out(user, profile, prefs)


@router.put("/me", response_model=ProfileOut, response_model_by_alias=True)
async def update_my_profile(
    payload: ProfileUpdateRequest,
    current: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user, profile, prefs = await _load_user_with_relations(db, current)

    if payload.name is not None:
        user.name = payload.name
    if payload.preferred_language is not None:
        profile.preferred_language = payload.preferred_language
    if payload.country is not None:
        profile.country = payload.country
    if payload.phone is not None:
        profile.phone = payload.phone
    if payload.bio is not None:
        profile.bio = payload.bio
    if payload.notification_email is not None:
        prefs.notification_email = payload.notification_email
    if payload.notification_push is not None:
        prefs.notification_push = payload.notification_push
    if payload.high_contrast is not None:
        prefs.high_contrast = payload.high_contrast
    if payload.large_text is not None:
        prefs.large_text = payload.large_text

    await db.commit()
    await db.refresh(user)
    await db.refresh(profile)
    await db.refresh(prefs)

    return _to_profile_out(user, profile, prefs)