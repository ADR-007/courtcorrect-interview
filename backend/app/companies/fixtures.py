import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.companies.factories import CompanyFactory
from app.companies.models import Company


@pytest.fixture()
async def company(db: AsyncSession) -> Company:
    return await CompanyFactory.create(
        name="Test company",
    )
