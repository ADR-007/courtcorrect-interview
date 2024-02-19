from typing import Any

from fastapi import APIRouter
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import DbSession
from app.regulations.filters import RegulatoryFilter
from app.regulations.models import Regulatory
from app.regulations.schemas import RegulatorySchema

router = APIRouter(
    prefix="/regulations",
    tags=["Regulations"],
)


@router.get(
    path='',
    response_model=Page[RegulatorySchema],
)
async def get_regulations(
    db: DbSession,
    filtering: RegulatoryFilter = FilterDepends(RegulatoryFilter),
) -> Any:
    query = select(Regulatory).options(
        selectinload(Regulatory.category),
        selectinload(Regulatory.company),
        selectinload(Regulatory.decision),
    )
    query = filtering.filter(query)
    query = filtering.sort(query)
    # Order by id to ensure consistent pagination results
    # todo: publish fix to to fastapi_filter
    query = query.order_by(Regulatory.id)
    return await paginate(db, query)
