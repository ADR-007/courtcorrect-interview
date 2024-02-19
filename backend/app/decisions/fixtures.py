import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.decisions.factories import DecisionFactory
from app.decisions.models import Decision


@pytest.fixture()
async def decision(db: AsyncSession) -> Decision:
    return await DecisionFactory.create(
        name='Test decision',
    )
