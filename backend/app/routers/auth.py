"""
Authentication endpoints.

Flow:
1. Client authenticates with Firebase (Google popup, email/password, or anonymous).
2. Client sends the Firebase ID token to POST /auth/session.
3. Backend verifies the token, upserts the user + profile in Supabase Postgres,
   and issues HumanityOS-scoped access/refresh JWTs.
"""
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, create_refresh_token, decode_token, get_current_user, TokenPayload
from app.database.session import get_db
from app.models.user import User
from app.models.profile import Profile
from app.schemas.auth import (
    SessionRequest,
    SessionResponse,
    UserOut,
    RefreshRequest,
    RefreshResponse,
)
from app.services.firebase_service import verify_firebase_token

router = APIRouter()


def _to_user_out(user: User) -> UserOut:
    return UserOut(
        uid=user.firebase_uid,
        name=user.name,
        email=user.email,
        photoUrl=user.photo_url,
        preferredLanguage=user.profile.preferred_language if user.profile else "en",
        country=user.profile.country if user.profile else None,
        isGuest=user.is_guest,
        createdAt=user.created_at,
        lastLogin=user.last_login,
    )


@router.post("/session", response_model=SessionResponse, response_model_by_alias=True)
async def create_session(payload: SessionRequest, db: AsyncSession = Depends(get_db)):
    claims = verify_firebase_token(payload.id_token)
    firebase_uid = claims["uid"]
    is_guest = payload.is_guest or claims.get("firebase", {}).get("sign_in_provider") == "anonymous"

    result = await db.execute(select(User).where(User.firebase_uid == firebase_uid))
    user = result.scalar_one_or_none()

    if user is None:
        user = User(
            id=uuid.uuid4(),
            firebase_uid=firebase_uid,
            name=claims.get("name"),
            email=claims.get("email"),
            photo_url=claims.get("picture"),
            is_guest=is_guest,
        )
        db.add(user)
        await db.flush()

        profile = Profile(
            id=uuid.uuid4(),
            user_id=user.id,
            preferred_language=payload.preferred_language,
        )
        db.add(profile)
        await db.flush()
        user.profile = profile
    else:
        user.last_login = datetime.now(timezone.utc)
        if claims.get("name"):
            user.name = claims["name"]
        if claims.get("email"):
            user.email = claims["email"]
        if claims.get("picture"):
            user.photo_url = claims["picture"]

    await db.commit()
    await db.refresh(user, attribute_names=["profile"])

    access_token = create_access_token(subject=firebase_uid, is_guest=is_guest)
    refresh_token = create_refresh_token(subject=firebase_uid, is_guest=is_guest)

    return SessionResponse(
        accessToken=access_token,
        refreshToken=refresh_token,
        user=_to_user_out(user),
    )


@router.post("/refresh", response_model=RefreshResponse, response_model_by_alias=True)
async def refresh_access_token(payload: RefreshRequest):
    token_data = decode_token(payload.refresh_token)
    if token_data.type != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    new_access_token = create_access_token(subject=token_data.sub, is_guest=token_data.is_guest)
    return RefreshResponse(accessToken=new_access_token)


@router.get("/me", response_model=UserOut, response_model_by_alias=True)
async def get_me(
    current: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.firebase_uid == current.sub))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await db.refresh(user, attribute_names=["profile"])
    return _to_user_out(user)