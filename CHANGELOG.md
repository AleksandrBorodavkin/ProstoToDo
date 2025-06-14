# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- поскольку django сам способен выдавать статику, то стоит попробовать обойтись без nginx и интегрировать во view выдачу HTML 

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
 
