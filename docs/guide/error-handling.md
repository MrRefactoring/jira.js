# Error Handling

Every client method returns a promise. When Jira answers with a non-2xx status, or the request never
reaches it, the promise rejects with one of the library's own error types.

```typescript
import { isNotFoundError } from 'jira.js';

try {
  const issue = await jira.issues.getIssue({ issueIdOrKey: 'TEST-1' });
} catch (error) {
  if (isNotFoundError(error)) return null;
  throw error;
}
```

## The error types

| Error | When | Extra fields |
| --- | --- | --- |
| `ApiError` | Any non-2xx response; base of the ones below | `status`, `statusText`, `body` |
| `AuthError` | `401` — credentials missing, expired or wrong | |
| `ScopeError` | `401` where the token lacks the required scope | |
| `ForbiddenError` | `403` — authenticated, not permitted | |
| `NotFoundError` | `404` | |
| `RateLimitError` | `429` | `retryAfterMs` |
| `ServerError` | `5xx` | |
| `NetworkError` | The request never completed — DNS, TLS, socket | `code` |
| `OAuthError` | The token flow itself failed | |
| `ConfigError` | The client was configured with something impossible | |
| `SchemaMismatchError` | 2xx, but not the shape the endpoint promises | `report` |

`body` carries Jira's own error payload, which is usually `{ errorMessages, errors }`:

```typescript
import { isApiError } from 'jira.js';

try {
  await jira.issues.createIssue({ fields });
} catch (error) {
  if (isApiError(error)) {
    console.error(error.status, error.body);
  }
}
```

## Use the predicates, not `instanceof`

Every error ships with a predicate — `isApiError`, `isAuthError`, `isForbiddenError`, `isNotFoundError`,
`isRateLimitError`, `isServerError`, `isNetworkError`, `isOAuthError`, `isConfigError`,
`isSchemaMismatchError`, `isScopeError`.

They read a branded symbol rather than walking the prototype chain, so they keep working when a bundler
splits chunks, when minification renames classes, and when two copies of the package end up in one
`node_modules` — all cases where `instanceof` silently returns `false`.

The predicates nest the way the types do: a `NotFoundError` satisfies `isApiError` too.

## Rate limits

`RateLimitError.retryAfterMs` is Jira's `Retry-After`, already converted to milliseconds:

```typescript
import { isRateLimitError } from 'jira.js';

try {
  await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({ jql });
} catch (error) {
  if (isRateLimitError(error) && error.retryAfterMs) {
    await new Promise(resolve => setTimeout(resolve, error.retryAfterMs));
  }
}
```

## Retrying transient failures

Retries are off by default — masking a failure hides real regressions. Opt in for the transport-level
ones only:

```typescript
const jira = createCloudClient({
  host,
  auth,
  retry: { maxAttempts: 3, initialDelayMs: 500, backoffFactor: 2 },
});
```

This covers network errors and `502`/`503`/`504`. It never retries a `4xx` — including `429`, which
carries its own `Retry-After` and deserves a considered wait rather than a blind one — nor any other
`5xx`.

## OAuth 2.0 and 401s

Under OAuth 2.0 the client refreshes the access token before expiry and retries once on a `401`. A second
`401` propagates. If refreshing itself fails, you get `OAuthError`; `isReauthorizationRequired(error)`
tells you the user has to grant consent again rather than the call being retryable. See the
[OAuth 2.0 guide](./oauth2-authentication).

## Responses that arrive but do not fit

A 2xx whose body does not match the endpoint's schema is not an error by default — it is reported and
handed back. See [Response Validation](./response-validation).
