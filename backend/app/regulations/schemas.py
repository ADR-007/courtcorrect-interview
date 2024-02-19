from datetime import date

from app.core.schemas import BaseSchema, NamedModelSchema


class RegulatorySchema(BaseSchema):
    id: int
    title: str
    description: str
    category_id: int
    company_id: int
    decision_id: int
    publish_date: date
    category: NamedModelSchema
    company: NamedModelSchema
    decision: NamedModelSchema
