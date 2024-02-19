import factory

from app.companies.models import Company
from app.core.factories import BaseFactory


class CompanyFactory(BaseFactory):
    """Factory for Company model.

    The factory to generate mock data for tests.
    """

    class Meta:
        model = Company

    name = factory.Faker("sentence", nb_words=2)
