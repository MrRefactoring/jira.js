# Error Handling

Every client method returns a promise. When Jira responds with a non-2xx status (or the request fails),
the promise rejects — wrap calls in `try/catch` (or `.catch()`).

```typescript
try {
  const issue = await client.issues.getIssue({ issueIdOrKey: 'TEST-1' });
} catch (error) {
  // Inspect the failure
  console.error(error);
}
```

## Inspecting the error

The library is built on axios, so failures are axios errors carrying the server response. The useful
fields are the HTTP `status` and Jira's structured error body (`errorMessages` / `errors`):

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({ host, authentication });

try {
  await client.issues.getIssue({ issueIdOrKey: 'MISSING-1' });
} catch (error: any) {
  const status = error.response?.status;          // e.g. 404
  const data = error.response?.data;              // Jira error payload
  console.error(status, data?.errorMessages, data?.errors);
}
```

## Global error/response middleware

Instead of handling each call, you can register middlewares on the client config. `onError` runs for every
failed request and `onResponse` for every successful one:

```typescript
const client = new Version3Client({
  host,
  authentication,
  middlewares: {
    onError(error) {
      reportToSentry(error);
    },
    onResponse(data) {
      // inspect/log successful responses
    },
  },
});
```

## OAuth 2.0 and 401s

With OAuth 2.0, the client automatically refreshes the access token on expiry and retries once on a `401`.
A second `401` propagates as an error. See the [OAuth 2.0 guide](./oauth2-authentication).
