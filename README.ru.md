> 🌐 [English](README.md) · **Русский**

<div align="center">
  <img alt="jira.js — клиент Jira REST API для JavaScript и TypeScript" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/jira.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" /></a>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-22%2B-green?style=flat-square&logo=node.js" /></a>

  <h1>jira.js — клиент Jira REST API для Node.js, TypeScript и браузеров</h1>
  <p>Библиотека на JavaScript / TypeScript для Node.js и браузеров для работы с API Atlassian Jira</p>
</div>

## О библиотеке

**Jira.js** — TypeScript-клиент к REST API Atlassian Jira Cloud для [Node.js](https://nodejs.org/) и браузеров. Покрывает три поверхности:

- **[Платформенный API Jira Cloud](https://developer.atlassian.com/cloud/jira/platform/rest/)** — задачи, проекты, поля, воркфлоу
- **[Jira Agile API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** — спринты, доски, бэклог
- **[Jira Service Management API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** — обращения, очереди, организации
- **[Assets API](https://developer.atlassian.com/cloud/assets/rest/)** — база конфигурационных единиц
- **[Teams API](https://developer.atlassian.com/platform/teams/rest/v1/)** — команды, их участники и внешние связи, на уровне организации

> **6.0 — это переписывание, а не обновление.** `npm install jira.js` теперь ставит 6.x. Перед обновлением прочитайте [MIGRATION.md](./MIGRATION.md): там прямо сказано, кому стоит остаться на `jira.js@5`, который поддерживается до конца 2026 года.

### Ключевые возможности

- ✅ **Типобезопасность**: типизированы все эндпоинты, параметры и модели, а `src/` входит в пакет — «перейти к определению» приводит в настоящий исходник
- ✅ **Валидация в рантайме**: ответы проверяются по схеме, и расхождение сообщается по полю, а не всплывает как `undefined` через три кадра стека
- ✅ **На промисах**: понятные async/await-методы во всей библиотеке
- ✅ **Tree-shaking**: импортируйте одну функцию эндпоинта вместо целого клиента
- ✅ **Универсальность**: одна ESM-сборка для Node.js 22+ и современных браузеров
- ✅ **Одна зависимость**: `zod`, и больше ничего
- ✅ **Типизированные ошибки**: иерархия с предикатами, которые переживают бандлинг, минификацию и дубли в `node_modules`
- ✅ **OAuth 2.0 (3LO)**: автообновление, single-flight, повтор при `401` и определение cloud id

Подходит для интеграций с Jira, автоматизации, обработчиков вебхуков, CI/CD-пайплайнов и браузерных инструментов.

## Содержание

- [Начало работы](#начало-работы)
  - [Установка](#установка)
  - [Быстрый пример](#быстрый-пример)
- [Документация](#документация)
- [Использование](#использование)
  - [Аутентификация](#аутентификация)
  - [Обработка ошибок](#обработка-ошибок)
  - [Валидация ответов](#валидация-ответов)
  - [Структура API](#структура-api)
- [Tree-shaking](#tree-shaking-и-оптимизация-бандла)
- [Другие продукты](#другие-продукты)
- [Лицензия](#лицензия)

## Начало работы

### Установка

**Требуется Node.js 22 или новее.** Пакет — только ESM, сборки CommonJS нет.

```bash
# Через npm
npm install jira.js

# Через yarn
yarn add jira.js

# Через pnpm
pnpm add jira.js
```

**Пользователям TypeScript**: определения типов уже включены — отдельный пакет `@types` не нужен.

### Быстрый пример

```typescript
import { createCloudClient } from 'jira.js';

const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: {
    type: 'basic',
    email: 'your@email.com',
    apiToken: 'YOUR_API_TOKEN', // Создайте его: https://id.atlassian.com/manage-profile/security/api-tokens
  },
});

const project = await jira.projects.getProject({ projectIdOrKey: 'YOUR_PROJECT_KEY' });

const issue = await jira.issues.createIssue({
  fields: {
    summary: 'Hello Jira.js!',
    issuetype: { name: 'Task' },
    project: { key: project.key },
  },
});

console.log(`Issue created: ${issue.key}`);
```

`host` — это голый URL сайта: путь к API принадлежит запросу, а не конфигурации.

Нужна не одна поверхность? Соберите клиент **один раз** и передайте его каждой фабрике. При OAuth 2.0 это важно: два клиента — два состояния токена, а поскольку Atlassian ротирует refresh-токен при каждом обновлении, тот, кто обновится первым, обесценит копию второго.

```typescript
import { createClient } from 'jira.js/core';
import { createAgileClient, createCloudClient } from 'jira.js';

const client = createClient({ host, auth });

const jira = createCloudClient(client);
const agile = createAgileClient(client);
```

## Документация

📚 **Полный справочник по API, руководства и примеры** доступны по адресу:
**[https://mrrefactoring.github.io/jira.js/](https://mrrefactoring.github.io/jira.js/)**

Документация включает:
- Полный справочник по API для всех эндпоинтов
- Примеры на TypeScript и фрагменты кода
- Руководства по аутентификации
- Паттерны обработки ошибок
- Лучшие практики и советы

## Поддерживаемые API

- **Платформенный API Jira Cloud**: задачи, проекты, пользователи, поля, воркфлоу, схемы
- **Jira Software (Agile) API**: спринты, доски, бэклоги, agile-процессы
- **Jira Service Management API**: обращения, очереди, клиенты, организации
- **Assets API**: объекты, схемы, типы и AQL — `createAssetsClient`
- **Teams API**: команды, участники и внешние связи, на уровне организации — `createTeamsClient`

Платформенная поверхность одна, сгенерированная из v3-спецификации Jira. `Version2Client` и `Version3Client` убраны: разница между ними была не в эндпоинтах, а в форматированном тексте. Такие поля по-прежнему принимают **строку** с wiki-разметкой — запись уходит через v2-эндпоинт, Jira разбирает разметку у себя, после чего результат перечитывается, и вы получаете настоящий документ [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).

```typescript
// Wiki-разметка — работает и форматируется
await jira.issueComments.addComment({
  issueIdOrKey: 'PROJ-1',
  body: 'h2. Заголовок\n\n*жирный* и {code}моноширинный{code}',
});
```

При чтении всегда приходит документ, никогда не строка.

## Использование

### Аутентификация

Аутентификация задаётся полем `auth` — размеченным объединением по `type`.

#### Email и API-токен

1. Создайте API-токен: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Настройте клиент:

```typescript
const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
});
```

#### Bearer-токен

Когда access-токен уже получен чем-то другим и вы сами следите за его временем жизни:

```typescript
const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', token: 'YOUR_ACCESS_TOKEN' },
});
```

Здесь ничего не обновляется автоматически — когда токен протухнет, запросы упадут с `AuthError`.

#### OAuth 2.0

Поддержан полный поток Atlassian [OAuth 2.0 (3LO)](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/). Передайте учётные данные обновления — и клиент обновит access-токен до истечения (и при `401`), схлопнет параллельные обновления в один запрос, отдаст ротированный refresh-токен в `onTokenRefresh` и направит запросы через шлюз (`https://api.atlassian.com/ex/jira/{cloudId}`), так что `host` не нужен. `clientSecret` и обновление — **только на сервере**.

```typescript
const jira = createCloudClient({
  // без `host` — cloudId определяется автоматически (задайте `siteUrl` или `cloudId`, чтобы закрепить)
  auth: {
    type: 'oauth2',
    accessToken: 'CURRENT_ACCESS_TOKEN',
    refreshToken: 'CURRENT_REFRESH_TOKEN',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    expiresAt: Date.now() + 3600 * 1000, // опционально; epoch в миллисекундах
    onTokenRefresh: async ({ accessToken, refreshToken, expiresAt }) => {
      await saveTokens({ accessToken, refreshToken, expiresAt }); // сохраните ротированные токены
    },
  },
});
```

**Сохранять ротированный refresh-токен — не опция**: Atlassian обесценивает предыдущий при каждом обновлении.

Библиотека также экспортирует stateless-помощники для authorization-code потока: `generateAuthorizationUrl`, `exchangeAuthorizationCode`, `refreshOAuth2Token`, `getAccessibleResources`, `parseCallbackUrl`. См. [пошаговое руководство по OAuth 2.0](https://mrrefactoring.github.io/jira.js/ru/guide/oauth2-authentication).

> **JWT (Atlassian Connect) в 6.0 не поддерживается**, замены нет. Если вы аутентифицируете установки Connect общим секретом — оставайтесь на `jira.js@5`, см. [MIGRATION.md](./MIGRATION.md). Сам Atlassian Connect [снимается с поддержки в Q4 2026](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps).

### Обработка ошибок

Любой сбой приходит одной из собственных ошибок библиотеки, у каждой есть предикат:

```typescript
import { isNotFoundError, isRateLimitError } from 'jira.js';

try {
  await jira.issues.getIssue({ issueIdOrKey: 'INVALID-123' });
} catch (error) {
  if (isNotFoundError(error)) return null;

  if (isRateLimitError(error) && error.retryAfterMs) {
    await new Promise(resolve => setTimeout(resolve, error.retryAfterMs));
  }

  throw error;
}
```

| Ошибка | Когда | Дополнительно |
| --- | --- | --- |
| `ApiError` | Любой не-2xx; база для остальных | `status`, `statusText`, `body` |
| `AuthError` | `401` | |
| `ScopeError` | `401`, не хватает scope | |
| `ForbiddenError` | `403` | |
| `NotFoundError` | `404` | |
| `RateLimitError` | `429` | `retryAfterMs` |
| `ServerError` | `5xx` | |
| `NetworkError` | Запрос не дошёл | `code` |
| `OAuthError` | Упал поток получения токена | |
| `ConfigError` | Невозможная конфигурация клиента | |
| `SchemaMismatchError` | 2xx не той формы | `report` |

Используйте предикаты, а не `instanceof`: они читают брендированный символ вместо цепочки прототипов и потому продолжают работать, когда бандлер режет код на чанки, когда минификация переименовывает классы и когда в `node_modules` оказались две копии пакета.

Повторы выключены по умолчанию. `retry: { maxAttempts, initialDelayMs, backoffFactor }` включает их только для сетевых ошибок и `502`/`503`/`504` — никогда для `4xx` и прочих `5xx`.

### Валидация ответов

Каждый ответ проверяется по схеме. Если он не совпал, библиотека **не бросает исключение**: тело возвращается невалидированным, а о проблеме сообщается один раз на каждое отдельное поле, в stderr.

```
[jira.js] GET /rest/api/3/project/{projectIdOrKey}/role answered with something the schema
does not describe: at `10002`, expected string, got number. The response is returned
unvalidated.
```

Формы, которые присылает Jira, зависят от того, чего библиотека видеть не может: локали сайта, включённых фич, типа проекта, выросшего на этой неделе enum. Ошибка схемы здесь — не ваш баг, и она не должна останавливать вашу программу.

```typescript
const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: 'warn', // 'silent' | 'throw' | (report) => void
});
```

В тестах ставьте `'throw'` — там несовпадение и есть предмет проверки. Отчёт содержит пути полей и типы и **никогда значения** — он предназначен для вставки в issue. См. [руководство по валидации ответов](https://mrrefactoring.github.io/jira.js/ru/guide/response-validation).

### Структура API

Доступ к эндпоинтам осуществляется по схеме `client.<group>.<method>`:

```typescript
// Получить все проекты
const projects = await jira.projects.searchProjects();

// Создать спринт
const sprint = await agile.sprint.createSprint({ name: 'Q4 Sprint' });
```

**Доступные группы API:**
<details>
  <summary>🔽 Agile Cloud API</summary>

  - [backlog](https://developer.atlassian.com/cloud/jira/software/rest/api-group-backlog/#api-group-backlog)
  - [board](https://developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-group-board)
  - [builds](https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds)
  - [deployments](https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments)
  - [developmentInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-development-information/#api-group-development-information)
  - [devopsComponents](https://developer.atlassian.com/cloud/jira/software/rest/api-group-devops-components/#api-group-devops-components)
  - [epic](https://developer.atlassian.com/cloud/jira/software/rest/api-group-epic/#api-group-epic)
  - [featureFlags](https://developer.atlassian.com/cloud/jira/software/rest/api-group-feature-flags/#api-group-feature-flags)
  - [issue](https://developer.atlassian.com/cloud/jira/software/rest/api-group-issue/#api-group-issue)
  - [operations](https://developer.atlassian.com/cloud/jira/software/rest/api-group-operations/#api-group-operations)
  - [remoteLinks](https://developer.atlassian.com/cloud/jira/software/rest/api-group-remote-links/#api-group-remote-links)
  - [securityInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-security-information/#api-group-security-information)
  - [sprint](https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-group-sprint)
</details>

<details>
  <summary>🔽 Платформенный API Jira Cloud</summary>

  - [api](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-other-operations/#api-group-other-operations)
  - [announcementBanner](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner/#api-group-announcement-banner)
  - [appDataPolicy](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-data-policies/#api-group-app-data-policies)
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles/#api-group-application-roles)
  - [appMigration](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-migration/#api-group-app-migration)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-group-avatars)
  - [classificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels/#api-group-classification-levels)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-group-filters)
  - [fieldSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-group-issues)
  - [issueAttachments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments/#api-group-issue-attachments)
  - [issueBulkOperations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-bulk-operations/#api-group-issue-bulk-operations)
  - [issueComments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments/#api-group-issue-comments)
  - [issueCustomFieldAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-associations/#api-group-issue-custom-field-associations)
  - [issueCustomFieldConfigurationApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration--apps-/#api-group-issue-custom-field-configuration--apps-)
  - [issueCommentProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comment-properties/#api-group-issue-comment-properties)
  - [issueFields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-group-issue-fields)
  - [issueFieldConfigurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-group-issue-field-configurations)
  - [issueCustomFieldContexts](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-contexts/#api-group-issue-custom-field-contexts)
  - [issueCustomFieldOptions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-group-issue-custom-field-options)
  - [issueCustomFieldOptionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options--apps-/#api-group-issue-custom-field-options--apps-)
  - [issueCustomFieldValuesApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-values--apps-/#api-group-issue-custom-field-values--apps-)
  - [issueLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-links/#api-group-issue-links)
  - [issueLinkTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-link-types/#api-group-issue-link-types)
  - [issueNavigatorSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-navigator-settings/#api-group-issue-navigator-settings)
  - [issueNotificationSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-notification-schemes/#api-group-issue-notification-schemes)
  - [issuePriorities](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-priorities/#api-group-issue-priorities)
  - [issueProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-properties/#api-group-issue-properties)
  - [issueRedaction](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-redaction/#api-group-issue-redaction)
  - [issueRemoteLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-remote-links/#api-group-issue-remote-links)
  - [issueResolutions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-resolutions/#api-group-issue-resolutions)
  - [issueSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-group-issue-search)
  - [issueSecurityLevel](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-level/#api-group-issue-security-level)
  - [issueSecuritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-group-issue-security-schemes)
  - [issueTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-types/#api-group-issue-types)
  - [issueTypeSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-group-issue-type-schemes)
  - [issueTypeScreenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/#api-group-issue-type-screen-schemes)
  - [issueTypeProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-properties/#api-group-issue-type-properties)
  - [issueVotes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-votes/#api-group-issue-votes)
  - [issueWatchers](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-watchers/#api-group-issue-watchers)
  - [issueWorklogs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-group-issue-worklogs)
  - [issueWorklogProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklog-properties/#api-group-issue-worklog-properties)
  - [jiraExpressions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-expressions/#api-group-jira-expressions)
  - [jiraSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-settings/#api-group-jira-settings)
  - [jql](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-group-jql)
  - [jqlFunctionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql-functions--apps-/#api-group-jql-functions--apps-)
  - [labels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-labels/#api-group-labels)
  - [licenseMetrics](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-license-metrics/#api-group-license-metrics)
  - [migrationOfConnectModulesToForge](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-migration-of-connect-modules-to-forge/#api-group-migration-of-connect-modules-to-forge)
  - [myself](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-group-myself)
  - [permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions/#api-group-permissions)
  - [permissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-group-permission-schemes)
  - [plans](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-plans/#api-group-plans)
  - [prioritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority-schemes/#api-group-priority-schemes)
  - [projects](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-group-projects)
  - [projectTemplates](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-templates/#api-group-project-templates)
  - [projectAvatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-avatars/#api-group-project-avatars)
  - [projectCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-categories/#api-group-project-categories)
  - [projectClassificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-classification-levels/#api-group-project-classification-levels)
  - [projectComponents](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-components/#api-group-project-components)
  - [projectEmail](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-email/#api-group-project-email)
  - [projectFeatures](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-features/#api-group-project-features)
  - [projectKeyAndNameValidation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-key-and-name-validation/#api-group-project-key-and-name-validation)
  - [projectPermissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-group-project-permission-schemes)
  - [projectProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-properties/#api-group-project-properties)
  - [projectRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles/#api-group-project-roles)
  - [projectRoleActors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-role-actors/#api-group-project-role-actors)
  - [projectTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-types/#api-group-project-types)
  - [projectVersions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-versions/#api-group-project-versions)
  - [screens](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-group-screens)
  - [screenTabs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tabs/#api-group-screen-tabs)
  - [screenTabFields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-group-screen-tab-fields)
  - [screenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-group-screen-schemes)
  - [serverInfo](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-server-info/#api-group-server-info)
  - [serviceRegistry](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-service-registry/#api-group-service-registry)
  - [status](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-group-status)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks)
  - [teamsInPlan](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-teams-in-plan/#api-group-teams-in-plan)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking/#api-group-time-tracking)
  - [uiModificationsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-ui-modifications--apps-/#api-group-ui-modifications--apps-)
  - [users](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-group-users)
  - [userNavProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-other-operations/#api-group-other-operations)
  - [userProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-properties/#api-group-user-properties)
  - [userSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-group-user-search)
  - [webhooks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-group-webhooks)
  - [workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-group-workflows)
  - [workflowTransitionRules](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-group-workflow-transition-rules)
  - [workflowSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-schemes/#api-group-workflow-schemes)
  - [workflowSchemeProjectAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-project-associations/#api-group-workflow-scheme-project-associations)
  - [workflowSchemeDrafts](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-drafts/#api-group-workflow-scheme-drafts)
  - [workflowStatuses](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses/#api-group-workflow-statuses)
  - [workflowStatusCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-status-categories/#api-group-workflow-status-categories)
  - [workflowTransitionProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-properties/#api-group-workflow-transition-properties)
  - [appProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-properties/#api-group-app-properties)
  - [dynamicModules](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dynamic-modules/#api-group-dynamic-modules)
</details>

<details>
  <summary>🔽 Service Desk API</summary>

  - [customer](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-customer/)
  - [info](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-info/#api-group-info)
  - [insight](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-insight/#api-group-insight)
  - [knowledgeBase](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-knowledgebase/#api-group-knowledgebase)
  - [organizations](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-organization/#api-group-organization)
  - [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/#api-group-request)
  - [requestType](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-requesttype/#api-group-requesttype)
  - [serviceDesk](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-group-servicedesk)
</details>

Полный справочник по эндпоинтам — в [документации API](https://mrrefactoring.github.io/jira.js/).

## Tree-shaking и оптимизация бандла

Пакет объявляет `"sideEffects": false` и поставляется по модулю на исходный файл, поэтому бандлер может выбросить всё, что вы не импортируете.

`createCloudClient` удобен и дорог: он поднимает все эндпоинты платформенной поверхности. Если в бандле вызывается несколько эндпоинтов, соберите клиент сами из плоских функций:

```typescript
import { createClient } from 'jira.js/core';
import { getIssue, createIssue } from 'jira.js/cloud';
import { createSprint } from 'jira.js/agile';

const client = createClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email, apiToken },
});

const issue = await getIssue(client, { issueIdOrKey: 'KEY-1' });
```

Каждая функция принимает клиент первым аргументом — тот же самый, который строят фабрики, так что стили свободно смешиваются.

| Импорт | Что внутри |
| --- | --- |
| `jira.js` | Пять фабрик, типы ошибок и предикаты, помощники OAuth |
| `jira.js/core` | `createClient`, транспорт, ошибки, OAuth, multipart |
| `jira.js/cloud` | Функции платформенного API, параметры и типы ответов |
| `jira.js/agile` | Функции Agile API, параметры и типы ответов |
| `jira.js/serviceDesk` | Функции Service Management, параметры и типы ответов |
| `jira.js/assets` | Функции Assets Cloud, параметры и типы ответов |
| `jira.js/teams` | Функции Teams, параметры и типы ответов |
| `jira.js/browser` | Готовая браузерная сборка |

Подпути поверхностей несут типы вместе с функциями, поэтому импорт только типа ничего не стоит в рантайме:

```typescript
import type { Issue, GetIssue } from 'jira.js/cloud';
```

Три поверхности не реэкспортируются из корня — они сталкиваются на десятке имён, импортируйте из нужной.

> Глубоким импортам нужен резолвер, понимающий `exports`: `moduleResolution: "bundler"`, `"node16"` или `"nodenext"`. Легаси-резолвинг `"node"` их не видит и ESM-only пакет всё равно не загрузит.

Основной вес пакета — схемы: каждый тип ответа несёт схему, по которой валидируется. Так что выигрыш примерно пропорционален тому, какую долю API вы не используете.

## Сценарии использования

Jira.js идеально подходит для:

- 🔄 **Интеграция с CI/CD**: автоматизируйте создание и обновление задач в ваших пайплайнах развёртывания
- 🤖 **Скрипты автоматизации**: создавайте собственную автоматизацию для рабочих процессов и операций Jira
- 📊 **Отчётность и аналитика**: извлекайте и анализируйте данные Jira для кастомных дашбордов
- 🔗 **Обработчики вебхуков**: обрабатывайте вебхуки Jira и интегрируйтесь с внешними системами
- 🛠️ **Кастомные инструменты**: создавайте админ-инструменты, скрипты миграции и собственные приложения Jira
- 📱 **Браузерные приложения**: создавайте браузерные интерфейсы для управления Jira
- 🔌 **Сторонние интеграции**: связывайте Jira с другими сервисами и платформами

## Частые вопросы (FAQ)

**В: Работает ли это с Jira Server/Data Center?**  
О: Нет, Jira.js разработана специально для Jira Cloud. Для локальной (on-premise) Jira рассмотрите прямое использование REST API.

**В: Обязателен ли TypeScript?**  
О: Нет, но TypeScript полностью поддерживается с исчерпывающими определениями типов. Вы также можете использовать Jira.js с обычным JavaScript.

**В: Можно ли использовать это в браузере?**  
О: Да. Пакет целиком браузеро-безопасен и содержит готовую сборку `jira.js/browser`. Но обращаться к Jira напрямую со страницы обычно мешает CORS, и это раскрывает учётные данные любому, кто откроет devtools, — так что это про расширения, Forge-приложения и проксирование, а не про API-токен в веб-приложении.

**В: Как обрабатывать аутентификацию?**  
О: Email + API-токен, bearer-токен или OAuth 2.0 (3LO) с автообновлением. См. раздел [Аутентификация](#аутентификация) выше.

**В: Можно ли по-прежнему использовать CommonJS?**  
О: Нет. 6.0 — только ESM, `require('jira.js')` не работает. Из CommonJS-модуля используйте динамический `await import('jira.js')` либо оставайтесь на `jira.js@5`.

**В: Что случилось с JWT / Atlassian Connect?**  
О: Убран в 6.0, замены нет. Оставайтесь на `jira.js@5` — она получает исправления безопасности и критических багов до конца 2026 года, когда сам Atlassian Connect снимается с поддержки.

**В: Ответ не прошёл валидацию — это баг в моём коде?**  
О: Обычно нет. Это значит, что схема здесь отстала от того, что реально присылает ваша Jira. По умолчанию тело всё равно возвращается, а о проблеме сообщается один раз — пожалуйста, [заведите issue](https://github.com/MrRefactoring/jira.js/issues/new) с этим отчётом: в нём пути полей и типы и никаких значений из ваших данных.

## Другие продукты

Изучите наши другие библиотеки для интеграции с Atlassian:
- [Confluence.js](https://github.com/MrRefactoring/confluence.js) — взаимодействие с API Confluence
- [Trello.js](https://github.com/MrRefactoring/trello.js) — интеграция с API Trello

## Участие в разработке

Вклад в проект приветствуется! Не стесняйтесь отправлять Pull Request. Для крупных изменений сначала откройте issue, чтобы обсудить, что вы хотели бы изменить.

## Лицензия

Лицензия MIT © MrRefactoring  
Подробности см. в [LICENSE](https://github.com/mrrefactoring/jira.js/blob/master/LICENSE).
