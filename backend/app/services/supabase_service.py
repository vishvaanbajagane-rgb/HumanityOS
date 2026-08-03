"""
Supabase client (used for Storage buckets and any direct table access
outside the SQLAlchemy ORM layer).
"""
from functools import lru_cache

from supabase import create_client, Client

from app.core.config import settings


@lru_cache
def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)