import factory

from app.categories.factories import CategoryFactory
from app.companies.factories import CompanyFactory
from app.core.factories import BaseFactory
from app.decisions.factories import DecisionFactory
from app.regulations.models import Regulatory


class RegulatoryFactory(BaseFactory):
    """Factory for Regulation model.

    The factory to generate mock data for tests.
    """

    class Meta:
        model = Regulatory

    title = factory.Faker("sentence", nb_words=5)
    description = factory.Faker("text")
    category = factory.SubFactory(CategoryFactory)
    company = factory.SubFactory(CompanyFactory)
    decision = factory.SubFactory(DecisionFactory)
    publish_date = factory.Faker("date_time")
