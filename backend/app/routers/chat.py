"""
AI Chat Assistant endpoints.
"""
import time
import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user, TokenPayload
from app.database.session import get_db
from app.models.user import User
from app.models.chat_history import ChatHistory
from app.models.ai_log import AILog
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse, ChatMessageOut, ChatHistoryResponse
from app.ai.chat_engine import generate_reply

router = APIRouter()

MAX_HISTORY_MESSAGES = 20


async def _get_user_id(db: AsyncSession, current: TokenPayload) -> uuid.UUID | None:
    result = await db.execute(select(User.id).where(User.firebase_uid == current.sub))
    row = result.scalar_one_or_none()
    return row


@router.post("/message", response_model=ChatMessageResponse, response_model_by_alias=True)
async def send_message(
    payload: ChatMessageRequest,
    current: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user_id = await _get_user_id(db, current)
    session_id = payload.session_id or uuid.uuid4()

    user_message = ChatHistory(
        id=uuid.uuid4(),
        user_id=user_id,
        session_id=session_id,
        role="user",
        message=payload.message,
        language=payload.language,
    )
    db.add(user_message)
    await db.flush()

    result = await db.execute(
        select(ChatHistory)
        .where(ChatHistory.session_id == session_id)
        .order_by(ChatHistory.created_at.asc())
        .limit(MAX_HISTORY_MESSAGES)
    )
    history_rows = result.scalars().all()
    history_payload = [{"role": row.role, "content": row.message} for row in history_rows]

    start = time.monotonic()
    reply_text, provider, tokens_used = await generate_reply(history_payload, payload.language)
    latency_ms = int((time.monotonic() - start) * 1000)

    assistant_message = ChatHistory(
        id=uuid.uuid4(),
        user_id=user_id,
        session_id=session_id,
        role="assistant",
        message=reply_text,
        language=payload.language,
    )
    db.add(assistant_message)

    db.add(
        AILog(
            id=uuid.uuid4(),
            user_id=user_id,
            feature="chat",
            provider=provider,
            request_payload={"message": payload.message},
            response_payload={"reply": reply_text},
            tokens_used=tokens_used,
            latency_ms=latency_ms,
            success=provider != "none",
        )
    )

    await db.commit()

    full_history = history_rows + [user_message, assistant_message]
    return ChatMessageResponse(
        sessionId=session_id,
        reply=reply_text,
        history=[ChatMessageOut.model_validate(m) for m in full_history],
    )


@router.get("/history/{session_id}", response_model=ChatHistoryResponse, response_model_by_alias=True)
async def get_chat_history(
    session_id: uuid.UUID,
    current: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ChatHistory).where(ChatHistory.session_id == session_id).order_by(ChatHistory.created_at.asc())
    )
    rows = result.scalars().all()
    return ChatHistoryResponse(sessionId=session_id, messages=[ChatMessageOut.model_validate(m) for m in rows])