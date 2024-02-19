from datetime import date

import pytest

from app.categories.models import Category
from app.companies.models import Company
from app.decisions.models import Decision
from app.regulations.factories import RegulatoryFactory
from app.regulations.models import Regulatory


@pytest.fixture()
async def regulatory(
    category: Category,
    company: Company,
    decision: Decision,
) -> Regulatory:
    return await RegulatoryFactory.create(
        title='Test regulatory',
        description='Test description',
        category=category,
        company=company,
        decision=decision,
        publish_date=date(2000, 1, 1),
    )
