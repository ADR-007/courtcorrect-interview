from datetime import date

from fastapi_filter.contrib.sqlalchemy import Filter

from app.regulations.models import Regulatory


class RegulatoryFilter(Filter):
    """Filter class for Audience."""

    order_by: list[str] | None = ["-publish_date"]
    search: str | None = None

    category_id: int | None = None
    company_id: int | None = None
    decision_id: int | None = None
    publish_date: date | None = None

    class Constants(Filter.Constants):
        model = Regulatory
        search_model_fields = ["title", "description"]
        order_by_fields = [
            "title",
            "publish_date",
        ]

    # TODO: make PR to fastapi-filters with fix
