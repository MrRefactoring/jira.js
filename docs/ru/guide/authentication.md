# Аутентификация

`jira.js` поддерживает три способа аутентификации, задаваемые через поле `authentication` конфигурации
клиента. Выбирайте подходящий вашему сценарию.

| Способ | Когда | Ключ конфигурации |
| --- | --- | --- |
| Email + API-токен | Скрипты, бэкенды, личные автоматизации | `authentication.basic` |
| OAuth 2.0 (3LO) | Приложения от имени пользователя | `authentication.oauth2` |
| JWT (Atlassian Connect) | Существующие установки Connect-приложений | `authentication.jwt` |

## Email + API-токен

Самый простой способ. Токен создаётся на
[id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

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

## OAuth 2.0 (3LO)

Для приложений, действующих от имени пользователя, с автоматическим обновлением access-токена и
разрешением `cloudId`. См. отдельное [руководство по OAuth 2.0](./oauth2-authentication).

```typescript
const client = new Version3Client({
  authentication: {
    oauth2: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: storedRefreshToken,
      onTokenRefresh: tokens => persist(tokens), // refresh-токены ротируются
    },
  },
});
```

## JWT (Atlassian Connect)

Для существующих установок Atlassian Connect-приложений. См. [руководство по JWT](./jwt-authentication).

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    jwt: {
      issuer: 'your-app-key',
      secret: sharedSecret,
    },
  },
});
```

> Примечание: [Atlassian Connect приближается к окончанию поддержки](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps);
> JWT-аутентификация предназначена для существующих установок.
