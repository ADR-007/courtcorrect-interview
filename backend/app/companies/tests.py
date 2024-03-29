from http import HTTPStatus

from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.companies.models import Company

URL = "/v1/companies"


async def test_get_all(
    db: AsyncSession,
    client: AsyncClient,
    company: Company,
) -> None:
    response = await client.get(URL)

    assert response.status_code == HTTPStatus.OK

    data = response.json()["items"]
    assert len(data) == 1
    assert data[0] == {
        "id": company.id,
        "name": company.name,
    }
