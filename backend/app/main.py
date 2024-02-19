import logging

from fastapi import APIRouter, FastAPI
from fastapi.routing import APIRoute
from fastapi_pagination import add_pagination
from starlette.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s][%(levelname)s] %(name)s: %(message)s",
)


def make_app() -> FastAPI:
    from app.core.settings import settings

    fast_api = FastAPI(
        title='Courtcorrect Interview',
        version=settings.VERSION,
        swagger_ui_parameters=dict(
            docExpansion='none',
            operationsSorter='alpha',
            tagsSorter='alpha',
        ),
        debug=settings.DEBUG,
    )
    fast_api.add_middleware(
        middleware_class=CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    import app.categories.routers
    import app.companies.routers
    import app.decisions.routers
    import app.regulations.routers
    import app.status.routers

    root_router = APIRouter(prefix='/v1')
    root_router.include_router(app.status.routers.router)
    root_router.include_router(app.categories.routers.router)
    root_router.include_router(app.decisions.routers.router)
    root_router.include_router(app.companies.routers.router)
    root_router.include_router(app.regulations.routers.router)
    fast_api.include_router(root_router)

    use_route_names_as_operation_ids(fast_api)
    add_pagination(fast_api)

    return fast_api


def use_route_names_as_operation_ids(fast_api: FastAPI) -> None:
    """Use route names as operation IDs.

    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    operation_ids: set[str] = set()
    for route in fast_api.routes:
        if isinstance(route, APIRoute):
            operation_id = route.name
            if operation_id in operation_ids:
                raise ValueError(f'Duplicated operation_id: {operation_id}')
            route.operation_id = operation_id


app = make_app()

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app)
