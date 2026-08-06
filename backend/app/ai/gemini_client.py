"""
Thin wrapper around Google's Gemini SDK — used as a fallback provider
if the OpenAI call fails or OPENAI_API_KEY is not configured.
"""
import google.generativeai as genai

from app.core.config import settings

_configured = False


def _ensure_configured() -> None:
    global _configured
    if not _configured:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        _configured = True


async def get_gemini_completion(prompt: str, model: str = "gemini-1.5-flash") -> tuple[str, int]:
    """
    Sends a single combined prompt to Gemini and returns (reply_text, approx_tokens_used).
    """
    _ensure_configured()
    gemini_model = genai.GenerativeModel(model)
    response = await gemini_model.generate_content_async(prompt)
    text = response.text or ""
    approx_tokens = len(text.split())
    return text, approx_tokens"""
Thin wrapper around Google's Gemini SDK — used as a fallback provider
if the OpenAI call fails or OPENAI_API_KEY is not configured.
"""
import google.generativeai as genai

from app.core.config import settings

_configured = False


def _ensure_configured() -> None:
    global _configured
    if not _configured:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        _configured = True


async def get_gemini_completion(prompt: str, model: str = "gemini-1.5-flash") -> tuple[str, int]:
    """
    Sends a single combined prompt to Gemini and returns (reply_text, approx_tokens_used).
    """
    _ensure_configured()
    gemini_model = genai.GenerativeModel(model)
    response = await gemini_model.generate_content_async(prompt)
    text = response.text or ""
    approx_tokens = len(text.split())
    return text, approx_tokens