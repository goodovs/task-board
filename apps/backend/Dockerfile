# ========================
# Stage 1: build + test
# ========================
FROM python:3.12-slim AS build

WORKDIR /app

# کپی pyproject برای caching
COPY pyproject.toml /app/

# نصب همه dependencyها (تست + runtime)
RUN pip install --no-cache-dir fastapi uvicorn pytest httpx

# کپی کد و تست‌ها
COPY src/ /app/src/
COPY tests/ /app/tests/

# PYTHONPATH برای تست
ENV PYTHONPATH=/app/src

# اجرای pytest برای اطمینان از سبز بودن تست‌ها
RUN pytest /app/tests

# ========================
# Stage 2: runtime
# ========================
FROM python:3.12-slim AS runtime

WORKDIR /app

# فقط dependencyهای runtime
RUN pip install --no-cache-dir fastapi uvicorn

# کپی کد از stage build
COPY --from=build /app/src /app/src

# PYTHONPATH برای runtime
ENV PYTHONPATH=/app/src

# دستور اجرای uvicorn
CMD ["uvicorn", "taskboard.main:app", "--host", "0.0.0.0", "--port", "8000"]

