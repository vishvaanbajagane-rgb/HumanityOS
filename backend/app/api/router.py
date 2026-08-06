"""
Central API router.

Each feature module (auth, profile, chat, healthcare, education, etc.)
registers its own router here as it is built, module by module.
"""
from fastapi import APIRouter

from app.routers.auth import router as auth_router
from app.routers.chat import router as chat_router
from app.routers.healthcare import router as healthcare_router
from app.routers.education import router as education_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(chat_router, prefix="/chat", tags=["AI Chat"])
api_router.include_router(healthcare_router, prefix="/healthcare", tags=["Healthcare"])
api_router.include_router(education_router, prefix="/education", tags=["Education"])

# --- Registered feature routers (added incrementally as modules are built) ---
# from app.routers.profile import router as profile_router
# api_router.include_router(profile_router, prefix="/profile", tags=["Profile"])