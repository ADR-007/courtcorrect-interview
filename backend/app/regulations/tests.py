from datetime import date
from http import HTTPStatus

from httpx import AsyncClient, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.categories.factories import CategoryFactory
from app.categories.models import Category
from app.companies.factories import CompanyFactory
from app.companies.models import Company
from app.decisions.factories import DecisionFactory
from app.decisions.models import Decision
from app.regulations.factories import RegulatoryFactory
from app.regulations.models import Regulatory

URL = '/v1/regulations'


async def test_get_fields(
    db: AsyncSession,
    client: AsyncClient,
    category: Category,
    company: Company,
    decision: Decision,
    regulatory: Regulatory,
) -> None:
    response = await client.get(URL)

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'items': [
            {
                'id': regulatory.id,
                'title': regulatory.title,
                'description': regulatory.description,
                'category_id': category.id,
                'company_id': company.id,
                'decision_id': decision.id,
                'publish_date': regulatory.publish_date.isoformat(),
                'category': {
                    'id': category.id,
                    'name': category.name,
                },
                'company': {
                    'id': company.id,
                    'name': company.name,
                },
                'decision': {
                    'id': decision.id,
                    'name': decision.name,
                },
            },
        ],
        'total': 1,
        'page': 1,
        'pages': 1,
        'size': 50,
    }


async def test_get_sorted(
    db: AsyncSession,
    client: AsyncClient,
    category: Category,
    company: Company,
    decision: Decision,
) -> None:
    regulations = await RegulatoryFactory.create_batch(
        5,
        category=category,
        company=company,
        decision=decision,
    )
    sorted_regulations = sorted(regulations, key=lambda x: x.title)

    response = await client.get(URL, params={'order_by': 'title'})

    assert response.status_code == HTTPStatus.OK
    assert (
        [r['id'] for r in response.json()['items']]
        == [r.id for r in sorted_regulations]
    )


async def test_get_filtered(
    db: AsyncSession,
    client: AsyncClient,
    category: Category,
    company: Company,
    decision: Decision,
    regulatory: Regulatory,
) -> None:
    different = {
        'title': '00000',  # different title
        'category': await CategoryFactory.create(),
        'company': await CompanyFactory.create(),
        'decision': await DecisionFactory.create(),
        'publish_date': date(2022, 1, 1),
    }
    for key, value in different.items():
        await RegulatoryFactory.create(**(
            {
                'title': regulatory.title,
                'description': '000',  # assume search by title
                'category': category,
                'company': company,
                'decision': decision,
                'publish_date': regulatory.publish_date,
            } | {key: value}),
        )

    response = await client.get(URL, params={
        'search': regulatory.title[1:5],
        'category_id': regulatory.category_id,
        'company_id': regulatory.company_id,
        'decision_id': regulatory.decision_id,
        'publish_date': regulatory.publish_date.isoformat(),
    })

    assert response.status_code == HTTPStatus.OK
    items = response.json()['items']
    assert len(items) == 1
    assert items[0]['id'] == regulatory.id


async def test_get_paginated(
    db: AsyncSession,
    client: AsyncClient,
    category: Category,
    company: Company,
    decision: Decision,
) -> None:
    regulations = await RegulatoryFactory.create_batch(
        5,
        category=category,
        company=company,
        decision=decision,
    )
    sorted_regulations = sorted(regulations, key=lambda x: x.title)

    params = {'order_by': 'title', 'size': 2}
    page1 = await client.get(URL, params=params | {'page': 1})  # type: ignore[arg-type]
    page2 = await client.get(URL, params=params | {'page': 2})  # type: ignore[arg-type]
    page3 = await client.get(URL, params=params | {'page': 3})  # type: ignore[arg-type]

    def assert_ids(response: Response, items: list[Regulatory]) -> None:
        assert response.status_code == HTTPStatus.OK
        assert (
            [r['id'] for r in response.json()['items']]
            == [r.id for r in items]
        )

    assert_ids(page1, sorted_regulations[:2])
    assert_ids(page2, sorted_regulations[2:4])
    assert_ids(page3, sorted_regulations[4:])
