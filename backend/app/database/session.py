"""
Async SQLAlchemy engine and session management for Supabase PostgreSQL.
"""
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings
from app.core.logging import setup_logging

logger = setup_logging()


class Base(DeclarativeBase):
    """Base class for all ORM models."""
    pass


_db_url = settings.DATABASE_URL
if _db_url.startswith("postgresql://"):
    _db_url = _db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

print("=" * 80)
print(_db_url)
print("=" * 80)

engine = create_async_engine(
    _db_url,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency that yields a database session per request."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db() -> None:
    """Verify database connectivity on startup. Table creation is managed via Alembic migrations."""
    try:
        async with engine.begin() as conn:
            await conn.run_sync(lambda sync_conn: None)
        logger.info("Database connection established.")
    except Exception as exc:
        logger.error(f"Database connection failed: {exc}")
        raise