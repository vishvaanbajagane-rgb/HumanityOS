"""
HumanityOS Backend
FastAPI application entrypoint.
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.logging import setup_logging
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.database.session import init_db

logger = setup_logging()

limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting HumanityOS backend...")
    await init_db()
    yield
    logger.info("Shutting down HumanityOS backend...")


app = FastAPI(
    title="HumanityOS API",
    description="One Intelligent Platform for Every Human Need — Backend API",
    version="1.0.0",
    docs_url="/api/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/api/redoc" if settings.ENVIRONMENT != "production" else None,
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(SecurityHeadersMiddleware)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"success": False, "message": "Validation error", "errors": exc.errors()},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url.path}: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"success": False, "message": "Internal server error"},
    )


@app.get("/api/health", tags=["System"])
async def health_check():
    return {"status": "ok", "service": "HumanityOS API", "version": "1.0.0"}


# Routers are registered incrementally, module by module, in app/api/router.py
from app.api.router import api_router  # noqa: E402

app.include_router(api_router, prefix="/api/v1")