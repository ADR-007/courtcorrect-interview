import factory

from app.core.factories import BaseFactory
from app.decisions.models import Decision


class DecisionFactory(BaseFactory):
    """Factory for Decision model.

    The factory to generate mock data for tests.
    """

    class Meta:
        model = Decision

    name = factory.Faker("sentence", nb_words=2)
