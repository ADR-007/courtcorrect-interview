from __future__ import annotations

import logging
from enum import Enum
from typing import Literal

from pydantic import SecretStr
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)

logger = logging.getLogger(__name__)


# mypy: disable-error-code=assignment


class Environment(str, Enum):
    LOCAL = "local"
    TEST = "test"
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"


class EnvSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )
    APP_ENV: Environment


class Settings(EnvSettings):
    """Application settings."""

    VERSION: str = "0.0.1"
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"

    DB_URL: SecretStr
    BACKEND_CORS_ORIGINS: list[str] = ["*"]


class LocalSettings(Settings):
    """Settings for local development with default values.

    Port number is calculated as follows:
    default + 20 (+1 for duplicated resource)
    """

    DEBUG: bool = True
    APP_ENV: Literal[Environment.LOCAL]

    DB_URL: SecretStr = SecretStr(
        "postgresql+asyncpg://postgres:postgres@0.0.0.0:5532/dev",
    )


class TestLocalSettings(LocalSettings):
    """Settings for local testing with default values."""

    model_config = SettingsConfigDict(
        env_file="",  # Do not load .env file for tests
    )

    APP_ENV: Literal[Environment.TEST]  # type: ignore[assignment]

    DB_URL: SecretStr = SecretStr(
        "postgresql+asyncpg://postgres:postgres@0.0.0.0:5533/test",
    )


class NonLocalSettings(Settings):
    """Settings to be used in cloud environments."""

    APP_ENV: Literal[
        Environment.DEVELOPMENT,
        Environment.STAGING,
        Environment.PRODUCTION,
    ]


def get_settings() -> Settings:
    new_settings: Settings = {
        Environment.LOCAL: LocalSettings,
        Environment.TEST: TestLocalSettings,
        Environment.DEVELOPMENT: NonLocalSettings,
        Environment.STAGING: NonLocalSettings,
        Environment.PRODUCTION: NonLocalSettings,
    }[EnvSettings().APP_ENV]()  # type: ignore[call-arg]

    logger.info(f"Loaded settings: {new_settings.model_dump_json(indent=2)}")

    return new_settings


settings: Settings = get_settings()
