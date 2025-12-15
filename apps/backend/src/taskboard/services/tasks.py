# src/taskboard/services/tasks.py

from typing import List, Dict

_tasks: List[Dict[str, str]] = []


def add_task(title: str) -> None:
    _tasks.append({"title": title})


def get_tasks() -> List[Dict[str, str]]:
    return _tasks

