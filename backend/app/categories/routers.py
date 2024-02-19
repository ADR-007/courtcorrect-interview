from typing import Any

from fastapi import APIRouter
from sqlalchemy import select

from app.categories.models import Category
from app.core.database import DbSession
from app.core.schemas import ListResponse, NamedModelSchema

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.get(
    path="",
    response_model=ListResponse[NamedModelSchema],
)
async def get_categories(db: DbSession) -> Any:
    categories = (await db.scalars(select(Category))).all()
    return {
        "items": categories,
    }
