# src/taskboard/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from taskboard.api.tasks import router as tasks_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)


@app.get("/health")
def health():
    return {"status": "ok"}

