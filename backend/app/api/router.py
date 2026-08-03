"""
Central API router.

Each feature module (auth, profile, chat, healthcare, education, etc.)
registers its own router here as it is built, module by module.
"""
from fastapi import APIRouter

from app.routers.auth import router as auth_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])

# --- Registered feature routers (added incrementally as modules are built) ---
# from app.routers.profile import router as profile_router
# from app.routers.chat import router as chat_router
#
# api_router.include_router(profile_router, prefix="/profile", tags=["Profile"])
# api_router.include_router(chat_router, prefix="/chat", tags=["AI Chat"])