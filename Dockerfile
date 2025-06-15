# Этап сборки Python
FROM python:3.11-alpine as builder

WORKDIR /app

# Установка зависимостей
RUN apk add --no-cache gcc musl-dev postgresql-dev python3-dev libffi-dev
RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Этап запуска
FROM python:3.11-alpine

WORKDIR /app

# Установка зависимостей
RUN apk add --no-cache libpq
COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .
RUN pip install --no-cache /wheels/*

# Копирование проекта
COPY . .

# Запуск приложения
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && uvicorn ProstoToDo.asgi:application --host 0.0.0.0 --port 8000"]