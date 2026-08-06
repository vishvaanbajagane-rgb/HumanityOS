"""
Thin wrapper around the OpenAI SDK for chat completions.
"""
from openai import AsyncOpenAI

from app.core.config import settings

_client: AsyncOpenAI | None = None


def get_openai_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    return _client


async def get_chat_completion(messages: list[dict], model: str = "gpt-4o-mini") -> tuple[str, int]:
    """
    Sends a list of {role, content} messages to OpenAI and returns (reply_text, tokens_used).
    """
    client = get_openai_client()
    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.4,
        max_tokens=800,
    )
    reply = response.choices[0].message.content or ""
    tokens_used = response.usage.total_tokens if response.usage else 0
    return reply, tokens_used