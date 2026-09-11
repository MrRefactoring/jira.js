# Tree-Shaking и оптимизация бандла

Пакет объявляет `"sideEffects": false` и поставляется по модулю на исходный файл, поэтому бандлер может
выбросить всё, что вы не импортируете. Особенно важно для браузерных и Forge-сборок.

## Цена фабрики

`createCloudClient` удобен и дорог: он поднимает все эндпоинты платформенной поверхности, так что импорт
тянет их целиком. Если в бандле вызываются три эндпоинта, соберите клиент сами из плоских функций:

```typescript
import { createClient } from 'jira.js/core';
import { getIssue, createIssue } from 'jira.js/cloud';

const client = createClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email, apiToken },
});

const issue = await getIssue(client, { issueIdOrKey: 'TEST-1' });
```

Каждая функция принимает клиент первым аргументом. Это тот же клиент, который строят фабрики, поэтому оба
стиля свободно смешиваются: фабрика — там, где размер не важен, плоские функции — там, где важен.

## Подпути

| Импорт | Что внутри |
| --- | --- |
| `jira.js` | Восемь фабрик, типы ошибок и предикаты, помощники OAuth |
| `jira.js/core` | `createClient`, транспорт, ошибки, OAuth, multipart |
| `jira.js/cloud` | Функции платформенного API и типы ответов |
| `jira.js/cloud/models` | Только типы ответов платформенного API |
| `jira.js/cloud/parameters` | Типы параметров запросов платформенного API |
| `jira.js/agile` | Функции Agile API и типы ответов |
| `jira.js/agile/models` | Только типы ответов Agile API |
| `jira.js/agile/parameters` | Типы параметров запросов Agile API |
| `jira.js/serviceDesk` | Функции Service Management и типы ответов |
| `jira.js/serviceDesk/models` | Только типы ответов Service Management |
| `jira.js/serviceDesk/parameters` | Типы параметров запросов Service Management |
| `jira.js/server` | Функции Data Center и типы ответов |
| `jira.js/server/models` | Только типы ответов Data Center |
| `jira.js/server/parameters` | Типы параметров запросов Data Center |
| `jira.js/assets` | Функции Assets Cloud и типы ответов |
| `jira.js/assets/models` | Только типы ответов Assets Cloud |
| `jira.js/assets/parameters` | Типы параметров запросов Assets Cloud |
| `jira.js/teams` | Функции Teams и типы ответов |
| `jira.js/teams/models` | Только типы ответов Teams |
| `jira.js/teams/parameters` | Типы параметров запросов Teams |
| `jira.js/admin` | Функции API организации и типы ответов |
| `jira.js/admin/models` | Только типы ответов API организации |
| `jira.js/admin/parameters` | Типы параметров запросов API организации |
| `jira.js/userManagement` | Функции управления пользователями и типы ответов |
| `jira.js/userManagement/models` | Только типы ответов управления пользователями |
| `jira.js/userManagement/parameters` | Типы параметров запросов управления пользователями |
| `jira.js/userProvisioning` | Функции SCIM-провижининга и типы ответов |
| `jira.js/userProvisioning/models` | Только типы ответов SCIM-провижининга |
| `jira.js/userProvisioning/parameters` | Типы параметров запросов SCIM-провижининга |
| `jira.js/webhooks` | События, полезные нагрузки и заголовки, которые Jira шлёт вам, и проверка подписи |
| `jira.js/browser` | Готовая браузерная сборка |

Подпути поверхностей несут типы ответов вместе с функциями, поэтому импорт только типа ничего не стоит в
рантайме. Типы параметров запросов лежат уровнем ниже, потому что параметр и модель иногда носят одно имя:

```typescript
import type { Issue } from 'jira.js/cloud';
import type { GetIssue } from 'jira.js/cloud/parameters';
```

Девять поверхностей не реэкспортируются из корня, потому что сталкиваются на десятке имён — импортируйте из
той, которую имеете в виду.

> Глубоким импортам нужен резолвер, понимающий `exports`: `moduleResolution: "bundler"`, `"node16"` или
> `"nodenext"`. Легаси-резолвинг `"node"` их не видит и ESM-only пакет всё равно не загрузит.

## Что именно уменьшается

Основной вес пакета — схемы: каждый тип ответа несёт zod-схему, по которой валидируется. Импорт одного
эндпоинта тянет его схему и модели, на которые она ссылается, и больше ничего — так что выигрыш плоского
стиля примерно пропорционален тому, какую долю API вы не используете.
