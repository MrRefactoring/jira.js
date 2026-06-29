# Быстрый старт

`jira.js` — современная, готовая к продакшену библиотека для [Node.js](https://nodejs.org/) и браузеров на
TypeScript для работы с REST API Atlassian Jira Cloud. Полное покрытие:

- **[Jira Cloud REST API v2/v3](https://developer.atlassian.com/cloud/jira/platform/rest/)** — платформенный API
- **[Jira Agile API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** — доски, спринты, бэклог
- **[Jira Service Desk API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** — операции service desk

## Установка

```bash
npm install jira.js
```

Про yarn/pnpm и версии — см. [Установку](./installation).

## Создание клиента

Выберите клиент под нужную версию API. Большинство проектов использует `Version3Client` (платформа Jira
Cloud v3, использует [ADF](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/) для
форматированного текста); `Version2Client` использует wiki-разметку. Также есть `AgileClient` и
`ServiceDeskClient`.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'email@example.com',
      apiToken: 'YOUR_API_TOKEN',
    },
  },
});
```

> API-токен создаётся на [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

## Первый запрос

Каждый эндпоинт — метод на промисах. Например, получить текущего пользователя и найти задачи:

```typescript
// Кто я?
const me = await client.myself.getCurrentUser();
console.log(me.displayName);

// Поиск по JQL
const { issues } = await client.issueSearch.searchForIssuesUsingJql({
  jql: 'project = TEST AND statusCategory != Done ORDER BY created DESC',
  maxResults: 20,
});

for (const issue of issues ?? []) {
  console.log(issue.key, issue.fields.summary);
}
```

## Дальше

- [Аутентификация](./authentication) — Email + API-токен, OAuth 2.0 (3LO) и JWT.
- [Обработка ошибок](./error-handling) — как возвращаются сбои.
- [Tree-Shaking](./tree-shaking) — компактный бандл через подпутевые импорты.
- [API Reference](/api/) — каждый клиент, эндпоинт, параметр и модель.
