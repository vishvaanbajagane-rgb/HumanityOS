"""
Chat engine: builds the system prompt for HumanityOS's assistant, calls the
configured AI provider (OpenAI first, Gemini as fallback), and returns the
reply text plus token usage for logging.
"""
from app.ai.openai_client import get_chat_completion
from app.ai.gemini_client import get_gemini_completion
from app.core.config import settings
from app.core.logging import setup_logging

logger = setup_logging()

SYSTEM_PROMPT = (
    "You are the HumanityOS AI Assistant — a multilingual assistant that helps "
    "underserved communities find healthcare, education, government schemes, "
    "emergency services, employment, food support, and NGO/volunteer resources. "
    "Be warm, clear, and practical. Keep answers concise. If the person describes "
    "an emergency or life-threatening situation, tell them to contact local "
    "emergency services immediately before anything else. Never provide medical, "
    "legal, or financial advice beyond general guidance and pointing them to the "
    "right service or professional."
)


async def generate_reply(history: list[dict], language: str = "en") -> tuple[str, str, int]:
    """
    history: list of {"role": "user"|"assistant", "content": str}, most recent last.
    Returns (reply_text, provider_used, tokens_used).
    """
    messages = [{"role": "system", "content": f"{SYSTEM_PROMPT} Respond in language code: {language}."}]
    messages.extend(history)

    if settings.OPENAI_API_KEY:
        try:
            reply, tokens = await get_chat_completion(messages)
            return reply, "openai", tokens
        except Exception as exc:
            logger.warning(f"OpenAI chat completion failed, falling back to Gemini: {exc}")

    if settings.GEMINI_API_KEY:
        combined_prompt = "\n".join(f"{m['role']}: {m['content']}" for m in messages)
        reply, tokens = await get_gemini_completion(combined_prompt)
        return reply, "gemini", tokens

    return (
        "The AI assistant is not fully configured yet — no AI provider API key is set. "
        "Please add OPENAI_API_KEY or GEMINI_API_KEY to the backend environment.",
        "none",
        0,
    )