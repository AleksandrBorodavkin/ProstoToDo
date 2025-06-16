# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- реализовать интеграцию с API авторизации на фронтенд

## [0.1.0] - 2025-06-14
### Added
- Создана базовая модель Todo для старта
- В проект в проект Django установлен DRF c маршрутизацией через DefaultRouter
### Changed
- Параметры проекта вынесены в переменные окружения и доступ к ним осуществляется через библиотеку через django-environ

## [0.2.0] - 2025-06-14
### Added
- Добавлен frontend(react). Функционал простой отрисовка списка задач

## [0.2.0] - 2025-06-14
### Added
- Автоматическая генерация типов с помощью drf-spectacular + openapi-typescript
  ```shell
  # Шаг 1. Генерация
  python manage.py spectacular --file schema.yaml
   ```
  ```shell
  # Шаг 2. Превращение в ts для дальнейшего использования
  npx openapi-typescript schema.yaml -o frontend/src/api-types.ts 
   ```
 
## [0.3.0] - 2025-06-15
Для старта нужно будет создать .env, в репозитории есть пример. И изменить в Nginx.conf `server_name localhost;` на свой домен.
```shell
# Остановить старые контейнеры:
docker-compose down -v   
# Запустить с пересборкой
docker-compose up --build 
# Запуск в фоновом режиме с логами
docker-compose up -d && docker-compose logs -f
# Просто логи конкретного сервиса
docker-compose logs -f <service_name>
```
### Added
- Проект подготовлен к развертыванию в docker. 
- Настроен docker-compose.yml со следующими сервисами:
  - postgres:15-alpine - база данных
  - Бэкенд на Django с ASGI-сервером Uvicorn( хоть асинхронного кода нет пока в проекте)
  - Фронтенд Nginx проксирует бекэнд и выдает статику фронтенда
  - Настроен volume для постоянного хранения данных БД(важно)
  - Веб интерфейс DRF доступен на порту http://localhost:8000/api/ напрямую и не зависит от фронта

### Changed
- .env я не понял как разделить на прод и локал, docker только так подхватывает. Пускай пока так используется.

## [0.4.0] - 2025-06-16
### Added
- Было создано приложение account для авторизации и управления пользователями
  - Реализована JWT авторизация
  - Задача теперь принадлежит тому пользователю кто её создал
- Добавлены endpoints для работы с токенами
  - получение пары токенов `/api/auth/token/`
  - обновление токенов `/api/auth/token/refresh/`

### Changed
- Обновлены типы для фронтенд