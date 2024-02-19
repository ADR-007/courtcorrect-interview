from http import HTTPStatus

from httpx import AsyncClient

URL = "/v1/status"


async def test_get_status(client: AsyncClient) -> None:
    response = await client.get(URL)
    assert response.status_code == HTTPStatus.OK, response.text
