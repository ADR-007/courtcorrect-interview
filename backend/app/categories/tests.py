from http import HTTPStatus

from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.categories.models import Category

URL = '/v1/categories'


async def test_get_all(
    db: AsyncSession,
    client: AsyncClient,
    category: Category,
) -> None:
    response = await client.get(URL)

    assert response.status_code == HTTPStatus.OK

    data = response.json()['items']
    assert len(data) == 1
    assert data[0] == {
        'id': category.id,
        'name': category.name,
    }
