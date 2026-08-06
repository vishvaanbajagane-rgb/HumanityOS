"""
Request/response schemas for the AI chat assistant.
"""
import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class ChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: uuid.UUID | None = None
    language: str = "en"


class ChatMessageOut(BaseModel):
    role: str
    message: str
    created_at: datetime | None = None

    model_config = {"from_attributes": True}


class ChatMessageResponse(BaseModel):
    session_id: uuid.UUID = Field(..., alias="sessionId")
    reply: str
    history: list[ChatMessageOut] = []

    model_config = {"populate_by_name": True}


class ChatHistoryResponse(BaseModel):
    session_id: uuid.UUID = Field(..., alias="sessionId")
    messages: list[ChatMessageOut]

    model_config = {"populate_by_name": True}