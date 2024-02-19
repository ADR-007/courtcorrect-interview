from datetime import date

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.categories.models import Category
from app.companies.models import Company
from app.core.models import Base
from app.decisions.models import Decision


class Regulatory(Base):
    __tablename__ = 'regulatories'

    title: Mapped[str]
    description: Mapped[str]

    category_id: Mapped[int] = mapped_column(ForeignKey('categories.id'))
    company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'))
    decision_id: Mapped[int] = mapped_column(ForeignKey('decisions.id'))

    category: Mapped[Category] = relationship()
    company: Mapped[Company] = relationship()
    decision: Mapped[Decision] = relationship()
    publish_date: Mapped[date]
