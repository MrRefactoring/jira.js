# Аутентификация

Аутентификация настраивается полем `auth` в конфигурации клиента. Это размеченное объединение: `type`
выбирает стратегию, остальные поля следуют из неё.

| Способ | Когда | `auth.type` |
| --- | --- | --- |
| Email + API-токен | Скрипты, бэкенды, личные автоматизации | `'basic'` |
| Bearer-токен | Токен уже есть и вы управляете им сами | `'bearer'` |
| OAuth 2.0 (3LO) | Приложения, действующие от имени пользователя | `'oauth2'` |

У самостоятельно размещённой Jira набор другой — персональный токен, логин с паролем или её собственный
провайдер OAuth 2.0. См. [Jira Data Center](./data-center.md).

::: warning JWT (Atlassian Connect) не поддерживается
В 6.0 он убран, замены нет. Если вы аутентифицируете установки Connect общим секретом — оставайтесь на
`jira.js@5`, см. [руководство по миграции](https://github.com/MrRefactoring/jira.js/blob/master/MIGRATION.md).
:::

## Email + API-токен

Самый простой способ. Токен создаётся на
[id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

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

## Bearer-токен

Когда access-токен уже получен чем-то другим и его нужно отправлять как есть:

```typescript
const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', token: accessToken },
});
```

Здесь ничего не обновляется автоматически. Когда токен протухнет, запросы начнут падать с `AuthError` —
если это нужно обрабатывать, берите стратегию OAuth 2.0.

## OAuth 2.0 (3LO)

Передайте учётные данные приложения и refresh-токен: клиент сам обновит access-токен до истечения,
повторит запрос один раз при `401`, определит cloud id и пойдёт через шлюз Atlassian. Подробности — в
[руководстве по OAuth 2.0](./oauth2-authentication).

```typescript
const jira = createCloudClient({
  auth: {
    type: 'oauth2',
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    refreshToken: storedRefreshToken,
    onTokenRefresh: ({ refreshToken }) => tokenStore.save(refreshToken),
  },
});
```

`host` здесь необязателен и игнорируется: токены 3LO не принимаются на собственном домене сайта, поэтому
клиент сам выводит `https://api.atlassian.com/ex/jira/{cloudId}`.

**Сохранять ротированный refresh-токен — не опция.** Atlassian обесценивает предыдущий при каждом
обновлении, так что процесс, который его не запомнил, не сможет аутентифицироваться после перезапуска.

## Смена учётных данных на ходу

`getAuthOn401` вызывается, когда запрос вернулся неавторизованным, — долгоживущий процесс может подставить
свежие данные, не пересоздавая клиент:

```typescript
const jira = createCloudClient({
  host,
  auth,
  getAuthOn401: async () => ({ type: 'basic', email, apiToken: await vault.currentToken() }),
});
```
