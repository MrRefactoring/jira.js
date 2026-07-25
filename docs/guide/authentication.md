# Authentication

Authentication is configured through the `auth` field of the client config. It is a discriminated union —
`type` picks the strategy, and the rest of the fields follow from it.

| Method | Use when | `auth.type` |
| --- | --- | --- |
| Email + API token | Scripts, backends, personal automations | `'basic'` |
| Bearer token | You already hold an access token and manage it yourself | `'bearer'` |
| OAuth 2.0 (3LO) | Apps acting on behalf of users | `'oauth2'` |

::: warning JWT (Atlassian Connect) is not supported
6.0 dropped it, and there is no replacement. If you authenticate Connect installations with a shared
secret, stay on `jira.js@5` — see [Migrating to 6.0](https://github.com/MrRefactoring/jira.js/blob/master/MIGRATION.md).
:::

## Email + API token

The simplest method. Generate a token at
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

## Bearer token

When something else already obtained an access token and you want the client to send it as-is:

```typescript
const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', token: accessToken },
});
```

Nothing is refreshed for you here. When the token expires, requests start failing with `AuthError` — use
the OAuth 2.0 strategy if you want that handled.

## OAuth 2.0 (3LO)

Hand over app credentials and a refresh token, and the client refreshes the access token before it
expires, retries once on a `401`, resolves the cloud id and routes through Atlassian's gateway. See the
dedicated [OAuth 2.0 guide](./oauth2-authentication).

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

`host` is optional here and ignored: 3LO tokens are not accepted on the site's own domain, so the client
derives `https://api.atlassian.com/ex/jira/{cloudId}` itself.

**Persisting the rotated refresh token is not optional.** Atlassian invalidates the previous one on every
refresh, so a process that forgets it will fail to authenticate after restart.

## Rotating credentials at runtime

`getAuthOn401` is called when a request comes back unauthorized, so a long-lived process can swap in fresh
credentials without being rebuilt:

```typescript
const jira = createCloudClient({
  host,
  auth,
  getAuthOn401: async () => ({ type: 'basic', email, apiToken: await vault.currentToken() }),
});
```
