# Authentication

`jira.js` supports three authentication methods, configured via the `authentication` field of the client
config. Pick the one that matches how your integration runs.

| Method | Use when | Config key |
| --- | --- | --- |
| Email + API token | Scripts, backends, personal automations | `authentication.basic` |
| OAuth 2.0 (3LO) | Apps acting on behalf of users | `authentication.oauth2` |
| JWT (Atlassian Connect) | Existing Connect app installations | `authentication.jwt` |

## Email + API token

The simplest method. Generate a token at
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

For apps that act on behalf of users, with automatic access-token refresh and `cloudId` resolution. See the
dedicated [OAuth 2.0 guide](./oauth2-authentication).

```typescript
const client = new Version3Client({
  authentication: {
    oauth2: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: storedRefreshToken,
      onTokenRefresh: tokens => persist(tokens), // refresh tokens rotate
    },
  },
});
```

## JWT (Atlassian Connect)

For existing Atlassian Connect app installations. See the [JWT guide](./jwt-authentication).

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

> Note: [Atlassian Connect is reaching end of support](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps);
> JWT auth is intended for existing installations.
