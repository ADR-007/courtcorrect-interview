def discover_models() -> None:
    """Import all SQLAlchemy models from the app.

    Import all app/*/models.py and app/*/models/__init__.py
    """
    # todo: publish auto-discovery of models to pypi. manual import for now
    from app.categories.models import Category  # noqa: F401
    from app.companies.models import Company  # noqa: F401
    from app.decisions.models import Decision  # noqa: F401
    from app.regulations.models import Regulatory  # noqa: F401
