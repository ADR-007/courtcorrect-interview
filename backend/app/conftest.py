from typing import AsyncIterator

import pytest
from httpx import AsyncClient
from pytest_mock import MockerFixture
from sqlalchemy.ext.asyncio import AsyncSession

pytest_plugins = [
    "app.categories.fixtures",
    "app.companies.fixtures",
    "app.decisions.fixtures",
    "app.regulations.fixtures",
]


@pytest.fixture(scope="session", autouse=True)
def anyio_backend() -> str:
    """AnyIO backend configuration for tests."""
    return "asyncio"


@pytest.fixture(scope="session", autouse=True)
def _validate_settings() -> None:
    """Validate settings."""
    from app.core.settings import Environment, settings

    assert settings.APP_ENV == Environment.TEST


@pytest.fixture(scope="session", autouse=True)
def _autodiscover_models() -> None:
    """Autodiscover models."""
    from app.core.utils.discover_models import discover_models

    discover_models()


@pytest.fixture(scope="session")
async def _cleanup_database_on_startup(anyio_backend: str) -> None:
    """Cleanup database on startup."""
    from app.core.database import async_engine
    from app.core.utils.psqldbcleaner import cleanup_database

    await cleanup_database(async_engine)


@pytest.fixture(scope="class")
async def _cleanup_database_after_each_class(
    anyio_backend: str,
) -> AsyncIterator[None]:
    """Cleanup database after each class."""
    yield

    from app.core.database import (
        PyTestFastApiSessionLocal,
        PyTestMainSessionLocal,
        async_engine,
    )

    await PyTestMainSessionLocal.remove()
    await PyTestFastApiSessionLocal.remove()
    from app.core.utils.psqldbcleaner import cleanup_database

    await cleanup_database(async_engine)


@pytest.fixture(scope="class")
async def db(
    _cleanup_database_on_startup: None,
    _cleanup_database_after_each_class: None,
) -> AsyncIterator[AsyncSession]:
    """Database session."""
    from app.core.database import PyTestMainSessionLocal

    async with PyTestMainSessionLocal() as session:
        try:
            yield session
        finally:
            await session.flush()
            await session.rollback()


@pytest.fixture(scope="class")
async def api_db(db: AsyncSession) -> AsyncIterator[AsyncSession]:
    from app.core.database import PyTestFastApiSessionLocal

    async with PyTestFastApiSessionLocal() as session:
        try:
            yield session
        finally:
            await session.flush()
            await session.rollback()


@pytest.fixture()
async def client(api_db: AsyncSession) -> AsyncIterator[AsyncClient]:
    """Unauthenticated client."""
    from app.core.database import get_session
    from app.main import app

    app.dependency_overrides[get_session] = lambda: api_db
    try:
        async with AsyncClient(app=app, base_url="http://tests") as client:
            yield client
    finally:
        del app.dependency_overrides[get_session]


@pytest.fixture()
def _settings_debug_off(mocker: MockerFixture) -> None:
    mocker.patch("app.core.settings.settings.DEBUG", False)
