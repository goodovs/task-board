# src/taskboard/api/tasks.py

from fastapi import APIRouter
from taskboard.schemas.tasks import TaskIn, TaskOut
from taskboard.services.tasks import add_task, get_tasks

router = APIRouter()


@router.post("/tasks", status_code=201)
def create_task(task: TaskIn):
    add_task(task.title)


@router.get("/tasks", response_model=list[TaskOut])
def list_tasks():
    return get_tasks()

