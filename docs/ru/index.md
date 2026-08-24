---
layout: home
title: jira.js — клиент Jira REST API для Node.js и TypeScript
hero:
  name: jira.js
  text: Клиент Jira REST API
  tagline: Типобезопасный клиент для Jira — облачной или self-hosted. Node.js и браузеры, ESM, каждый ответ валидируется.
  image:
    src: /logo.svg
    alt: jira.js
  actions:
    - theme: brand
      text: Быстрый старт
      link: /ru/guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/MrRefactoring/jira.js
features:
  - icon: 🧩
    title: Cloud и Data Center
    details: Платформенный API Jira Cloud, Agile, Service Management и Assets, а также self-hosted API Data Center, Service Management и Assets — почти все эндпоинты, один клиент.
  - icon: 🔒
    title: TypeScript в первую очередь
    details: Типизированы все эндпоинты, параметры и модели, а исходники входят в пакет — «перейти к определению» приводит в настоящий код.
  - icon: 🛡️
    title: Валидация в рантайме
    details: Ответы проверяются по схеме. О расхождении сообщается по полю, один раз, не роняя вашу интеграцию.
  - icon: 🌳
    title: Tree-shaking
    details: Импортируйте нужную плоскую функцию вместо целого клиента — остальное не попадёт в бандл.
  - icon: 🔑
    title: OAuth 2.0 из коробки
    details: Email + API-токен, bearer-токены или 3LO с автообновлением, single-flight, повтором при 401 и определением cloud id.
  - icon: 🌍
    title: Node.js и браузеры
    details: Одна ESM-сборка для Node.js 22+ и браузера, с одной зависимостью в рантайме.
---
