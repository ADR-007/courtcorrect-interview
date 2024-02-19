from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Annotated

from sqlalchemy import BigInteger, DateTime, func
from sqlalchemy import Enum as EnumField
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from typing_extensions import Doc

CiStr = Annotated[str, Doc("Case-insensitive string")]

DryBase = declarative_base(
    type_annotation_map={
        int: BigInteger(),
        datetime: DateTime(timezone=True),
        Enum: EnumField(values_callable=lambda obj: [e.value for e in obj]),
        CiStr: CITEXT(),
    },
)


class DbColumnOrder:
    """Column sort order."""

    ID = -100

    NAME = -50

    CREATED_AT = 100
    UPDATED_AT = 110
    DELETED_AT = 120


class Base(DryBase):  # type: ignore[valid-type, misc]
    __abstract__ = True

    id: Mapped[int] = mapped_column(
        primary_key=True,
        sort_order=DbColumnOrder.ID,
    )

    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now(),
        index=True,
        sort_order=DbColumnOrder.CREATED_AT,
    )
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(),
        onupdate=func.now(),
        index=True,
        sort_order=DbColumnOrder.UPDATED_AT,
    )


class NamedBase(Base):
    __abstract__ = True

    name: Mapped[CiStr] = mapped_column(
        unique=True,
        sort_order=DbColumnOrder.NAME,
    )
