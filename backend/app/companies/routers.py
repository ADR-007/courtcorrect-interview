from typing import Any

from fastapi import APIRouter
from sqlalchemy import select

from app.companies.models import Company
from app.core.database import DbSession
from app.core.schemas import ListResponse, NamedModelSchema

router = APIRouter(
    prefix="/companies",
    tags=["Companies"],
)


@router.get(
    path="",
    response_model=ListResponse[NamedModelSchema],
)
async def get_companies(db: DbSession) -> Any:
    companies = (await db.scalars(select(Company))).all()
    return {
        "items": companies,
    }
