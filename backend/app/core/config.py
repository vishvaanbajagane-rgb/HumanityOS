"""
Application configuration loaded from environment variables.
"""
from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # App
    APP_NAME: str = "HumanityOS"
    ENVIRONMENT: str = "development"
    API_V1_PREFIX: str = "/api/v1"

    # Security
    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Database (Supabase Postgres)
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    SUPABASE_ANON_KEY: str

    # Firebase Admin
    FIREBASE_PROJECT_ID: str = ""
    FIREBASE_PRIVATE_KEY: str = ""
    FIREBASE_CLIENT_EMAIL: str = ""

    # AI Providers
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    # Redis (caching / rate limiting store)
    REDIS_URL: str = "redis://localhost:6379/0"

    # Rate limiting
    RATE_LIMIT_DEFAULT: str = "200/minute"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()