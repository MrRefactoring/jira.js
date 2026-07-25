# Установка

`jira.js` — **только ESM**, с встроенными определениями типов TypeScript. Требует **Node.js 22 или новее**
и работает в современных браузерах.

::: warning 6.0 — это переписывание
`npm install jira.js` пока ставит 5.x. 6.0 находится в стадии release candidate: `npm install jira.js@next`.
Это не бесшовное обновление — сначала прочитайте [руководство по миграции](https://github.com/MrRefactoring/jira.js/blob/master/MIGRATION.md).
:::

## Менеджеры пакетов

```bash
# npm
npm install jira.js@next

# yarn
yarn add jira.js@next

# pnpm
pnpm add jira.js@next
```

## Импорт

```typescript
import { createCloudClient } from 'jira.js';
```

Сборки CommonJS нет. `require('jira.js')` не работает; из CommonJS-модуля используйте динамический
`await import('jira.js')`.

Пакет также отдаёт подпути по поверхностям — `jira.js/cloud`, `jira.js/agile`, `jira.js/serviceDesk` и
`jira.js/core`, — в которых лежат плоские функции вместе со всеми типами параметров и ответов. См.
[Tree-Shaking](./tree-shaking).

## Требования

| | |
| --- | --- |
| Node.js | ≥ 22 |
| Модули | только ESM |
| Зависимости в рантайме | `zod` |

## Использование в браузере

Пакет целиком браузеро-безопасен, а `jira.js/browser` — готовая сборка. Обращаться к Jira напрямую со
страницы обычно мешает CORS, и это раскрывает учётные данные любому, кто откроет devtools. Так что это
про расширения, Forge-приложения и проксирование, а не про то, чтобы положить API-токен в веб-приложение.

## Переход к исходникам

В опубликованный пакет входит `src/`, поэтому «перейти к определению» на любом символе приводит в
настоящий TypeScript — с JSDoc и схемой, по которой валидируется ответ, — а не в заглушку `.d.ts`.
