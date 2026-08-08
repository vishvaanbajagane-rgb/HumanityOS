"""
Central API router.

Each feature module (auth, profile, chat, healthcare, education, etc.)
registers its own router here as it is built, module by module.
"""
from fastapi import APIRouter

from app.routers.auth import router as auth_router
from app.routers.profile import router as profile_router
from app.routers.chat import router as chat_router
from app.routers.healthcare import router as healthcare_router
from app.routers.education import router as education_router
from app.routers.jobs import router as jobs_router
from app.routers.government_schemes import router as government_schemes_router
from app.routers.organizations import router as organizations_router
from app.routers.volunteers import router as volunteers_router
from app.routers.emergency import router as emergency_router
from app.routers.food_support import router as food_support_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(profile_router, prefix="/profile", tags=["Profile"])
api_router.include_router(chat_router, prefix="/chat", tags=["AI Chat"])
api_router.include_router(healthcare_router, prefix="/healthcare", tags=["Healthcare"])
api_router.include_router(education_router, prefix="/education", tags=["Education"])
api_router.include_router(jobs_router, prefix="/jobs", tags=["Employment"])
api_router.include_router(government_schemes_router, prefix="/government-schemes", tags=["Government Schemes"])
api_router.include_router(organizations_router, prefix="/organizations", tags=["Organizations"])
api_router.include_router(volunteers_router, prefix="/volunteers", tags=["Volunteers"])
api_router.include_router(emergency_router, prefix="/emergency", tags=["Emergency"])
api_router.include_router(food_support_router, prefix="/food-support", tags=["Food Support"])