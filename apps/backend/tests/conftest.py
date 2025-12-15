import pytest
from taskboard.services.tasks import _tasks  # این همان لیست در حافظه است

@pytest.fixture(autouse=True)
def clear_tasks():
    _tasks.clear()  # قبل از هر تست، لیست تسک‌ها خالی می‌شود

