"""
FoodSupport ORM model — mirrors the Supabase `food_support` table.
"""
import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Boolean, DateTime, ForeignKey, Float, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database.session import Base


class FoodSupport(Base):
    __tablename__ = "food_support"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="SET NULL"), nullable=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[str] = mapped_column(String(32), nullable=False)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(32), nullable=True)
    schedule: Mapped[str | None] = mapped_column(String(255), nullable=True)
    eligibility: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_free: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))