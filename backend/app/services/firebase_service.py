"""
Firebase Admin SDK initialization and ID-token verification.
"""
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from fastapi import HTTPException, status

from app.core.config import settings
from app.core.logging import setup_logging

logger = setup_logging()

_firebase_app = None


def get_firebase_app():
    global _firebase_app
    if _firebase_app is None:
        cred = credentials.Certificate(
            {
                "type": "service_account",
                "project_id": settings.FIREBASE_PROJECT_ID,
                "private_key": settings.FIREBASE_PRIVATE_KEY.replace("\\n", "\n"),
                "client_email": settings.FIREBASE_CLIENT_EMAIL,
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        )
        _firebase_app = firebase_admin.initialize_app(cred)
        logger.info("Firebase Admin initialized.")
    return _firebase_app


def verify_firebase_token(id_token: str) -> dict:
    """Verifies a Firebase ID token and returns its decoded claims."""
    get_firebase_app()
    try:
        return firebase_auth.verify_id_token(id_token, check_revoked=True)
    except Exception as exc:
        logger.warning(f"Firebase token verification failed: {exc}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Firebase session",
        )