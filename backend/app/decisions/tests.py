from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.decisions.models import Decision

URL = "/v1/decisions"


async def test_get_all(
    db: AsyncSession,
    client: AsyncClient,
    decision: Decision,
) -> None:
    response = await client.get(URL)

    assert response.status_code == 200

    data = response.json()["items"]
    assert len(data) == 1
    assert data[0] == {
        "id": decision.id,
        "name": decision.name,
    }
