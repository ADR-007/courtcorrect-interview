from typing import Any

from fastapi import APIRouter
from sqlalchemy import select

from app.core.database import DbSession
from app.core.schemas import ListResponse, NamedModelSchema
from app.decisions.models import Decision

router = APIRouter(
    prefix="/decisions",
    tags=["Decisions"],
)


@router.get(
    path='',
    response_model=ListResponse[NamedModelSchema],
)
async def get_decisions(db: DbSession) -> Any:
    decisions = (await db.scalars(select(Decision))).all()
    return {
        'items': decisions,
    }
