# Быстрый старт

`jira.js` — TypeScript-клиент к REST API Atlassian Jira Cloud для [Node.js](https://nodejs.org/) и
браузеров. Покрывает семь поверхностей:

- **[Платформа Jira Cloud](https://developer.atlassian.com/cloud/jira/platform/rest/)** — задачи, проекты, поля, воркфлоу
- **[Jira Agile](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** — доски, спринты, бэклог
- **[Jira Service Management](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** — обращения, очереди, организации
- **[Assets](https://developer.atlassian.com/cloud/assets/rest/)** — объекты, схемы и типы, AQL
- **[Teams](https://developer.atlassian.com/platform/teams/rest/v1/)** — команды, их участники и внешние связи
- **[API организации](https://developer.atlassian.com/cloud/admin/organization/rest/)** — каталоги, пользователи, группы, домены, политики, SCIM
- **[Jira Data Center](https://developer.atlassian.com/server/jira/platform/rest/)** — самостоятельно размещённая платформа, вместе с Agile

## Установка

```bash
npm install jira.js
```

Требования и статус 6.0 — в разделе [Установка](./installation).

## Создание клиента

У каждой поверхности своя фабрика. Большинству проектов нужна платформенная:

```typescript
import { createCloudClient } from 'jira.js';

const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: {
    type: 'basic',
    email: 'email@example.com',
    apiToken: 'YOUR_API_TOKEN',
  },
});
```

`host` — это голый URL сайта: путь к API принадлежит запросу, а не конфигурации.

> Создать API-токен: [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

Если нужна больше чем одна поверхность, соберите клиент **один раз** и передайте его каждой фабрике. Это
важно при OAuth 2.0: два клиента — это два состояния токена, а поскольку Atlassian ротирует refresh-токен
при каждом обновлении, тот, кто обновится первым, обесценит копию второго.

```typescript
import { createClient } from 'jira.js/core';
import { createAgileClient, createCloudClient } from 'jira.js';

const client = createClient({ host, auth });

const jira = createCloudClient(client);
const agile = createAgileClient(client);
```

Общий клиент покрывает три поверхности сайта. Остальные собираются из собственной конфигурации, каждая по
своей причине. Assets вообще отвечает не на хосте вашего сайта и требует `workspaceId` — см.
[Assets](./assets). Teams отвечает на хосте сайта, но принимает только API-токен или bearer-токен и
никогда OAuth 2.0 — см. [Teams](./teams). Три API организации стоят над сайтом целиком, отвечают на
`api.atlassian.com` и принимают ключ организации — см.
[Администрирование организации](./administration).

## Первый запрос

Каждый эндпоинт — метод, возвращающий промис:

```typescript
// Кто я?
const me = await jira.myself.getCurrentUser();
console.log(me.displayName);

// Поиск через JQL
const { issues } = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({
  jql: 'project = TEST AND statusCategory != Done ORDER BY created DESC',
  maxResults: 20,
});

for (const issue of issues ?? []) {
  console.log(issue.key, issue.fields?.summary);
}
```

## Форматированный текст

Поля вроде тела комментария или описания задачи принимают
[Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
Записывать их по-прежнему можно **строкой** с wiki-разметкой: библиотека отправит такую запись через v2-эндпоинт,
Jira разберёт разметку на своей стороне, после чего результат перечитывается — и вам возвращается настоящий
документ:

```typescript
// Wiki-разметка — работает и форматируется
await jira.issueComments.addComment({
  issueIdOrKey: 'TEST-1',
  body: 'h2. Заголовок\n\n*жирный* и {code}моноширинный{code}',
});
```

При чтении всегда приходит документ, никогда не строка.

## Дальше

- [Аутентификация](./authentication) — API-токен, OAuth 2.0 (3LO)
- [Assets](./assets) — база конфигурационных единиц и клиент, которым с ней работают
- [Teams](./teams) — команды на уровне организации и `orgId`, которому адресован каждый вызов
- [Администрирование организации](./administration) — каталоги, пользователи, группы и SCIM, над сайтом
- [Обработка ошибок](./error-handling) — типизированные ошибки и предикаты
- [Валидация ответов](./response-validation) — что происходит, когда Jira присылает неожиданное
- [Tree-Shaking](./tree-shaking) — как не раздувать бандл
- [Справочник API](/api/) — все эндпоинты, параметры и модели
