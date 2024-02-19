from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_scoped_session,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import relationship

from app.core.settings import settings

async_engine = create_async_engine(settings.DB_URL.get_secret_value())
# Async session for FastAPI endpoints
AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)
# Async session for PyTest fixtures
PyTestMainSessionLocal = async_scoped_session(
    AsyncSessionLocal,
    scopefunc=lambda: "testing",
)
# Async session for PyTest FastAPI endpoints
PyTestFastApiSessionLocal = async_scoped_session(
    AsyncSessionLocal,
    scopefunc=lambda: "fastapi",
)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


# Dependency to get a database session
DbSession = Annotated[AsyncSession, Depends(get_session)]

# Lazy load is not supported in async SQLAlchemy and leads to errors
# that are hard to debug
relationship.__kwdefaults__["lazy"] = "raise_on_sql"
