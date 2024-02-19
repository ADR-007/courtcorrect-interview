from __future__ import annotations

from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict, computed_field


class BaseSchema(BaseModel):
    """Data Schema."""  # General docstring for OpenAPI docs

    # Base schema for all schemas in the project.
    model_config = ConfigDict(
        from_attributes=True,
        str_max_length=10_000,
    )


class UpdatableSchema(BaseSchema):
    id: int

    created_at: datetime
    updated_at: datetime


class NamedModelSchema(BaseSchema):
    """Named model schema."""

    id: int
    name: str


ItemType = TypeVar("ItemType", bound=BaseModel)


class ListResponse(BaseModel, Generic[ItemType]):
    """List of items."""

    items: list[ItemType]

    @computed_field
    def total(self) -> int:
        """Total number of items."""
        return len(self.items)
