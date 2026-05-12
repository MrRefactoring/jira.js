# @jira.js/base

Core transport, auth, error types, and utilities for the `@jira.js/*` package family.

[![npm](https://img.shields.io/npm/v/@jira.js/base?style=flat-square)](https://www.npmjs.com/package/@jira.js/base)

## Install

```bash
pnpm add @jira.js/base
```

## What's in this package

| Export | Description |
|--------|-------------|
| `createClient` | Low-level HTTP client factory |
| `ApiError` | Error class for non-2xx HTTP responses |
| `withRetry` | Automatic retry with exponential backoff |
| `sendRequest` | Raw HTTP request primitive |
| `buildAtlassianAuthUrl` | Build OAuth 2.0 authorization URL |
| `obtainAtlassianOAuthTokens` | Full OAuth 2.0 (3LO) token exchange |
| `refreshAtlassianOAuthTokens` | Refresh OAuth tokens |
| `parseAtlassianCallbackUrl` | Parse OAuth callback URL |
| `ClientConfig` | Client configuration type |
| `Auth` | Auth discriminated union type |

## Usage

### Error handling

```typescript
import { ApiError } from '@jira.js/base';

try {
  await client.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
} catch (err) {
  if (err instanceof ApiError) {
    console.log(err.status, err.statusText, err.body);
  }
}
```

### Retry

```typescript
import { withRetry } from '@jira.js/base';

const result = await withRetry(
  () => client.issues.getIssue({ issueIdOrKey: 'PROJ-1' }),
  { maxAttempts: 4, initialDelayMs: 500, backoffFactor: 2 },
);
```

Retries only on: **429, 502, 503, 504**. Never retries 4xx client errors.

### OAuth 2.0

```typescript
import { obtainAtlassianOAuthTokens } from '@jira.js/base';

const tokens = await obtainAtlassianOAuthTokens({
  clientId: 'MY_CLIENT_ID',
  clientSecret: 'MY_CLIENT_SECRET',
  redirectUri: 'http://localhost:8765/callback',
  scope: 'read:jira-work write:jira-work offline_access',
  openBrowser: true,
});
```

## Typically used alongside

```bash
pnpm add @jira.js/cloud   # or @jira.js/agile
```

Most `@jira.js/base` utilities are automatically re-exported by consumer packages, but you can import them directly here.

## Links

- [Documentation](https://jirajs.dev)
- [GitHub](https://github.com/MrRefactoring/jira.js)

## License

MIT
