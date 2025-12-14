FROM python:3.12-slim

WORKDIR /app/backend

COPY backend /app/backend
COPY pyproject.toml /app/pyproject.toml

RUN pip install --no-cache-dir fastapi uvicorn pytest httpx

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

