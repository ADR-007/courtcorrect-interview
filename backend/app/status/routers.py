"""Routes for status page."""
from typing import Any

from fastapi import APIRouter

router = APIRouter(prefix="/status", tags=["Status"])


@router.get("")
def status() -> Any:
    """Return service status."""
    return {"status": "ok"}
