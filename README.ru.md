> 🌐 [English](README.md) · **Русский**

<div align="center">
  <img alt="Jira.js logo" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/jira.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" /></a>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-20%2B-green?style=flat-square&logo=node.js" /></a>

  <span>Библиотека на JavaScript / TypeScript для Node.js и браузеров для работы с API Atlassian Jira</span>
</div>

## О библиотеке

**Jira.js** — это мощная, готовая к продакшену TypeScript-библиотека для [Node.js](https://nodejs.org/) и браузеров, обеспечивающая удобное взаимодействие с API Atlassian Jira Cloud. Этот npm-пакет предоставляет полную поддержку:

- **[Jira Cloud REST API v2/v3](https://developer.atlassian.com/cloud/jira/platform/rest/)** — полное покрытие платформенного API
- **[Jira Agile Cloud API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** — управление спринтами, досками и бэклогами
- **[Jira Service Desk Cloud API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** — операции service desk

### Ключевые возможности

- ✅ **Типобезопасность**: полная поддержка TypeScript с исчерпывающими определениями типов и IntelliSense
- ✅ **Поддержка tree-shaking**: оптимизируйте размер бандла, импортируя только то, что нужно (идеально для браузерных приложений)
- ✅ **Универсальность**: работает в Node.js (v20+) и современных браузерах с полной поддержкой ESM/CJS
- ✅ **Полное покрытие**: почти 100% Jira Cloud REST API v2/v3, Agile и Service Desk API
- ✅ **Хорошая документация**: подробные JSDoc, справочник по API и примеры кода
- ✅ **Современный стек**: написана на TypeScript, поддерживает ES Modules и CommonJS
- ✅ **Активная поддержка**: регулярные обновления с новыми возможностями Jira API и исправлениями ошибок
- ✅ **Готовность к продакшену**: используется тысячами разработчиков в продакшене

Идеально подходит для создания интеграций с Jira, инструментов автоматизации, вебхуков, CI/CD-пайплайнов, кастомных приложений Jira и браузерных инструментов управления Jira.

## Содержание

- [Начало работы](#начало-работы)
  - [Установка](#установка)
  - [Быстрый пример](#быстрый-пример)
- [Документация](#документация)
- [Использование](#использование)
  - [Аутентификация](#аутентификация)
    - [Email и API-токен](#email-и-api-токен)
    - [OAuth 2.0](#oauth-20)
    - [JWT (Atlassian Connect)](#jwt-atlassian-connect)
  - [Обработка ошибок](#обработка-ошибок)
  - [Структура API](#структура-api)
- [Tree-shaking](#tree-shaking-и-оптимизация-бандла)
- [Другие продукты](#другие-продукты)
- [Лицензия](#лицензия)

## Начало работы

### Установка

Установите npm-пакет Jira.js с помощью предпочитаемого менеджера пакетов. **Требуется Node.js 20.0.0 или новее.**

```bash
# Через npm
npm install jira.js

# Через yarn
yarn add jira.js

# Через pnpm
pnpm add jira.js
```

**Пользователям TypeScript**: определения типов уже включены — отдельный пакет `@types` не нужен!

### Быстрый пример

Начните работу с Jira.js менее чем за 5 минут. В этом примере показано, как создать задачу в Jira с помощью TypeScript-клиента:

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'your@email.com',
      apiToken: 'YOUR_API_TOKEN', // Создайте его: https://id.atlassian.com/manage-profile/security/api-tokens
    },
  },
});

async function createIssue() {
  const project = await client.projects.getProject({ projectIdOrKey: 'Your project id or key' });

  const newIssue = await client.issues.createIssue({
    fields: {
      summary: 'Hello Jira.js!',
      issuetype: { name: 'Task' },
      project: { key: project.key },
    },
  });

  console.log(`Issue created: ${newIssue.id}`);
}

createIssue();
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

Jira.js предоставляет полную поддержку всех основных API Jira Cloud:

- **Jira Platform REST API v2**: устаревшие эндпоинты API для проектов, задач, пользователей и не только
- **Jira Platform REST API v3**: современный API с расширенными возможностями и улучшенной производительностью
- **Jira Software (Agile) API**: управление спринтами, доски, бэклоги и agile-процессы
- **Jira Service Desk API**: операции service desk, управление клиентами и обработка запросов

Все API полностью типизированы с помощью определений TypeScript, что делает разработку быстрее и безопаснее.

## Использование

### Аутентификация

#### Email и API-токен

1. Создайте API-токен: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Настройте клиент:

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
  },
});
```

#### OAuth 2.0

jira.js поддерживает полный поток Atlassian [OAuth 2.0 (3LO)](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/). Простейшая настройка использует статический access-токен:

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: { accessToken: 'YOUR_ACCESS_TOKEN' },
  },
});
```

**Полный поток с автоматическим обновлением и определением cloudId.** Передайте учётные данные для обновления — и клиент будет обновлять access-токен по истечении срока действия (а также при `401`), сохранять ротируемый refresh-токен через `onTokenRefresh` и направлять запросы через API-шлюз (`https://api.atlassian.com/ex/jira/{cloudId}`), так что `host` не требуется. `clientSecret` и обновление токенов — **только на стороне сервера**.

```typescript
const client = new Version3Client({
  // без `host` — cloudId определяется автоматически (передайте `siteUrl` или `cloudId`, чтобы зафиксировать его)
  authentication: {
    oauth2: {
      accessToken: 'CURRENT_ACCESS_TOKEN',
      refreshToken: 'CURRENT_REFRESH_TOKEN',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      expiresAt: Date.now() + 3600 * 1000, // необязательно; миллисекунды эпохи
      onTokenRefresh: async ({ accessToken, refreshToken, expiresAt }) => {
        await saveTokens({ accessToken, refreshToken, expiresAt }); // сохраните ротируемые токены
      },
    },
  },
});
```

jira.js также экспортирует stateless-хелперы для потока с кодом авторизации — `generateAuthorizationUrl`, `exchangeAuthorizationCode`, `refreshOAuth2Token`, `getAccessibleResources`. См. [пошаговое руководство по OAuth 2.0](./guides/oauth2-authentication.ru.md).

#### JWT (Atlassian Connect)

Для приложений [Atlassian Connect](https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/) аутентификация выполняется через JWT, формируемый для каждого запроса и подписываемый общим секретом (shared secret) вашего приложения. Это **серверный** поток — общий секрет никогда не должен попадать в браузер.

> **Примечание:** Для Atlassian Connect наступает [конец поддержки (Q4 2026)](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps), и новые приватные приложения больше нельзя установить через URL дескриптора. JWT-аутентификация здесь предназначена для **существующих** установок приложений Connect.

- `issuer`: ключ вашего приложения — поле `key` в дескрипторе `atlassian-connect.json`.
- `secret`: значение `sharedSecret`, которое ваше приложение получает в теле lifecycle-вебхука `installed` во время рукопожатия при установке. Храните его отдельно для каждого тенанта.
- `expiryTimeSeconds` (необязательно): время жизни токена в секундах (по умолчанию `180`, т.е. 3 минуты).

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    jwt: {
      issuer: 'YOUR_APP_KEY',
      secret: 'YOUR_SHARED_SECRET',
      expiryTimeSeconds: 180, // необязательно
    },
  },
});
```

Для каждого запроса генерируется новый JWT с хешем строки запроса (`qsh`), привязанным к методу и URL этого запроса. О том, как создать приложение Connect и получить `issuer` и `secret`, см. [пошаговое руководство по настройке](./guides/jwt-authentication.ru.md).

### Обработка ошибок

Ошибки делятся на категории:
- `HttpException`: сервер ответил ошибкой (включает разобранные детали ошибки)
- `AxiosError`: проблемы сети или конфигурации (например, таймауты)

**Пример обработки:**

```typescript
try {
  await client.issues.getIssue({ issueIdOrKey: 'INVALID-123' });
} catch (error) {
  if (error instanceof HttpException) {
    console.error('Server error:', error.message);
    console.debug('Response headers:', error.cause.response?.headers);
  } else if (error instanceof AxiosError) {
    console.error('Network error:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Структура API

Доступ к эндпоинтам осуществляется по схеме `client.<group>.<method>`:

```typescript
// Получить все проекты
const projects = await client.projects.searchProjects();

// Создать спринт
const sprint = await client.sprint.createSprint({ name: 'Q4 Sprint' });
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
  <summary>🔽 Core REST API (v2/v3)</summary>

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

Полный список групп см. в [исходной документации](#использование).

## Tree-shaking и оптимизация бандла

Jira.js поддерживает tree-shaking для минимизации размера бандла. Импортируйте только нужные модули:

```typescript
// custom-client.ts
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';
import { Board } from 'jira.js/agile';

export class CustomClient extends BaseClient {
  issues = new Issues(this);
  board = new Board(this);
}

// Использование
const client = new CustomClient({ /* конфигурация */ });
await client.issues.getIssue({ issueIdOrKey: 'KEY-1' });
```

Также можно импортировать типизированные барреля **parameters** и **models** через глубокие подпути:

```typescript
import type { SearchForIssuesUsingJqlEnhancedSearchPost } from 'jira.js/version3/parameters';
import type { Issue } from 'jira.js/version3/models';

// Эквивалент через корневой namespace (работает при любом moduleResolution):
import { Version3 } from 'jira.js';
// type Params = Version3.Version3Parameters.SearchForIssuesUsingJqlEnhancedSearchPost;
```

> Форма с глубоким подпутём (`jira.js/<api>/parameters`, `jira.js/<api>/models`) требует резолвера с
> поддержкой `exports` (`moduleResolution: "bundler" | "node16" | "nodenext"`). При устаревшем
> `moduleResolution: "node"` используйте форму через корневой namespace выше.

**Преимущества:**
- Меньший размер бандла для браузерных приложений
- Более быстрая загрузка
- Более высокая производительность в продакшене

## Сценарии использования

Jira.js идеально подходит для:

- 🔄 **Интеграция с CI/CD**: автоматизируйте создание и обновление задач в ваших пайплайнах развёртывания
- 🤖 **Скрипты автоматизации**: создавайте собственную автоматизацию для рабочих процессов и операций Jira
- 📊 **Отчётность и аналитика**: извлекайте и анализируйте данные Jira для кастомных дашбордов
- 🔗 **Обработчики вебхуков**: обрабатывайте вебхуки Jira и интегрируйтесь с внешними системами
- 🛠️ **Кастомные инструменты**: создавайте админ-инструменты, скрипты миграции и собственные приложения Jira
- 📱 **Браузерные приложения**: создавайте браузерные интерфейсы для управления Jira
- 🔌 **Сторонние интеграции**: связывайте Jira с другими сервисами и платформами

## Частые вопросы

**В: Работает ли это с Jira Server/Data Center?**  
О: Нет, Jira.js разработана специально для Jira Cloud. Для локальной (on-premise) Jira рассмотрите прямое использование REST API.

**В: Обязателен ли TypeScript?**  
О: Нет, но TypeScript полностью поддерживается с исчерпывающими определениями типов. Вы также можете использовать Jira.js с обычным JavaScript.

**В: Можно ли использовать это в браузере?**  
О: Да! Jira.js работает как в Node.js, так и в современных браузерах. Не забудьте обработать CORS, если вызываете API Jira из браузера.

**В: Как обрабатывать аутентификацию?**  
О: Jira.js поддерживает Basic Auth (email + API-токен), OAuth 2.0 и JWT для приложений Atlassian Connect. См. раздел [Аутентификация](#аутентификация) выше.

## Другие продукты

Изучите наши другие библиотеки для интеграции с Atlassian:
- [Confluence.js](https://github.com/MrRefactoring/confluence.js) — взаимодействие с API Confluence
- [Trello.js](https://github.com/MrRefactoring/trello.js) — интеграция с API Trello

## Участие в разработке

Вклад в проект приветствуется! Не стесняйтесь отправлять Pull Request. Для крупных изменений сначала откройте issue, чтобы обсудить, что вы хотели бы изменить.

## Лицензия

Лицензия MIT © MrRefactoring  
Подробности см. в [LICENSE](https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE).
