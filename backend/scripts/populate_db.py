import random
from datetime import date, timedelta

from sqlalchemy import func, select

from app.categories.factories import CategoryFactory
from app.companies.factories import CompanyFactory
from app.core.database import AsyncSessionLocal
from app.decisions.factories import DecisionFactory
from app.regulations.factories import RegulatoryFactory
from app.regulations.models import Regulatory


async def main() -> None:
    async with AsyncSessionLocal() as db:
        if await db.scalar(select(func.count(Regulatory.id))):
            return

    companies = await CompanyFactory.create_batch(10)
    categories = await CategoryFactory.create_batch(5)
    decisions = [
        await DecisionFactory.create(name="Approved"),
        await DecisionFactory.create(name="Rejected"),
        await DecisionFactory.create(name="Aborted"),
    ]
    for _ in range(1000):
        await RegulatoryFactory.create(
            company=random.choice(companies),
            category=random.choice(categories),
            decision=random.choice(decisions),
            publish_date=date.today() - timedelta(days=random.randint(1, 10)),
        )

    print("Database populated")


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
