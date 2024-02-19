from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory

from app.core.database import PyTestMainSessionLocal


class BaseFactory(AsyncSQLAlchemyFactory):
    """Base class for all factories."""

    class Meta:
        abstract = True
        sqlalchemy_session = PyTestMainSessionLocal
        sqlalchemy_session_persistence = "commit"
