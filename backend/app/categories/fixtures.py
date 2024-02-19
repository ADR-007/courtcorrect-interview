import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.categories.factories import CategoryFactory
from app.categories.models import Category


@pytest.fixture()
async def category(db: AsyncSession) -> Category:
    return await CategoryFactory.create(
        name="Test category",
    )
