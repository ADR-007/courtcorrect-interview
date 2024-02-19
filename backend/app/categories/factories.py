import factory

from app.categories.models import Category
from app.core.factories import BaseFactory


class CategoryFactory(BaseFactory):
    """Factory for Category model.

    The factory to generate mock data for tests.
    """

    class Meta:
        model = Category

    name = factory.Faker("sentence", nb_words=2)
