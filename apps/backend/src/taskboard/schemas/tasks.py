# src/taskboard/schemas/tasks.py

from pydantic import BaseModel


class TaskIn(BaseModel):
    title: str


class TaskOut(BaseModel):
    title: str

