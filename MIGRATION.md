# Migrating to jira.js 6.0

6.0 replaces the transport, the client shape and the API surface. This is a rewrite, not a refresh, and there is no version of this page that makes the upgrade small. What follows is what changed, why, and what to do about it.

A codemod handles the mechanical parts:

```bash
npx jscodeshift -t node_modules/jira.js/tools/codemod/v5-to-v6.ts \
  --parser ts --extensions ts,tsx,js,jsx src/
```

It rewrites client construction, authentication config and imports, and leaves a `TODO(jira.js@6)` comment wherever a human has to decide. Read every one of them.

## Should you upgrade at all?

Not if any of these apply:

- **You use JWT (Atlassian Connect).** 6.0 does not support it. Stay on `jira.js@5`.
- **You depend on `version2` returning plain strings for rich text.** 6.0 still lets you *send* strings — see below — but reads always come back as documents.
- **You cannot move off Node 20.** 6.0 requires Node 22.

5.x is closed to features. It will receive security fixes and fixes for critical regressions **until the end of 2026**, which is when [Atlassian Connect reaches end of support](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps) and the JWT users who cannot move have nothing left to stay for. After that it is end-of-life. That is a real cost, and it is the reason to read the rest of this page before starting.

## The client

`new XClient(config)` became a factory:

```diff
-import { Version3Client } from 'jira.js';
+import { createCloudClient } from 'jira.js';

-const jira = new Version3Client({
+const jira = createCloudClient({
   host: 'https://your-domain.atlassian.net',
-  authentication: { basic: { email, apiToken } },
+  auth: { type: 'basic', email, apiToken },
 });
```

Build the client once and hand it to every factory you need. That matters under OAuth 2.0: two clients means two token states, and since Atlassian rotates the refresh token on every refresh, the first one to refresh invalidates the other's copy.

```ts
import { createClient } from 'jira.js/core';
import { createAgileClient, createCloudClient } from 'jira.js';

const client = createClient({ host, auth });

const jira = createCloudClient(client);
const agile = createAgileClient(client);
```

## `version2` and `version3` became `cloud`

There is one platform surface now, generated from Jira's v3 specification, and `Version2Client` has no replacement.

The difference between the two was never the endpoints — it was rich text. v2 took wiki markup as a string; v3 takes [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).

**You can still pass a string.** Give a rich-text field a string and the library sends that write to Jira's v2 endpoint, which parses the markup server-side, then reads the result back through v3 so what you get is a real document:

```ts
// Wiki markup — still works, still formats
await jira.issueComments.addComment({
  issueIdOrKey: 'PROJ-1',
  body: 'h2. Heading\n\n*bold* and {code}inline{code}',
});

// A document — sent as-is
await jira.issueComments.addComment({
  issueIdOrKey: 'PROJ-1',
  body: { type: 'doc', version: 1, content: [/* … */] },
});
```

Both return a document. The string path costs one extra request; nothing else differs.

What this does **not** preserve is reading. A comment you fetch is `body: Document`, never a string. Code that treated it as text has to walk the document instead:

```diff
-const text = comment.body;
+const text = comment.body.content
+  ?.map(block => (block.content ?? []).map(node => node.text ?? '').join(''))
+  .join('\n');
```

Join the blocks, not the leaves — flattening the whole tree runs a heading straight into the paragraph after it. The snippet above turns `h2. Title` plus a paragraph into `"Title\nplain bold tail"`, which is what you want; flattening gives `"Titleplain bold tail"`, which is not.

## Authentication

```diff
-authentication: { basic: { email, apiToken } }
+auth: { type: 'basic', email, apiToken }

-authentication: { oauth2: { accessToken } }
+auth: { type: 'bearer', token: accessToken }

-authentication: { jwt: { issuer, secret } }
+// not supported — stay on jira.js@5
```

OAuth 2.0 is now a first-class strategy rather than a bare token. Hand over app credentials and a refresh token and the client refreshes before expiry, retries once on a `401`, resolves the cloud id and routes through Atlassian's gateway:

```ts
auth: {
  type: 'oauth2',
  clientId,
  clientSecret,
  refreshToken,
  onTokenRefresh: ({ refreshToken }) => tokenStore.save(refreshToken),
}
```

Persisting the new refresh token is not optional — Atlassian invalidates the previous one on every refresh.

## Errors

`AxiosError` is gone with axios. Every failure now has a type, and each has a predicate:

```diff
-} catch (error) {
-  if (error.response?.status === 404) return null;
-  throw error;
-}
+} catch (error) {
+  if (isNotFoundError(error)) return null;
+  throw error;
+}
```

`ApiError` and its subclasses — `AuthError`, `ScopeError`, `ForbiddenError`, `NotFoundError`, `RateLimitError` (with `retryAfterMs`), `ServerError` — plus `NetworkError` for transport faults and `OAuthError` for the token flow.

Use the predicates rather than `instanceof`. They read a branded symbol instead of the prototype chain, so they keep working when a bundler splits chunks, when minification renames classes, and when two copies of the package end up in one `node_modules`.

## Everything else that was removed

- **Callbacks.** Every method is promise-only. `client.issues.getIssue(params, callback)` → `await client.issues.getIssue(params)`.
- **`middlewares`, `baseRequestConfig`, `newErrorHandling`.** The transport is `fetch`; there is no axios config to pass through.
- **Namespace re-exports.** `Version3.Models.Issue` → import from `jira.js/cloud`.
- **The CJS build.** The package is ESM-only.
- **`mime-types`.** Attachment content types come from a built-in table now; an unknown extension is `application/octet-stream`, as before.

## Responses are validated, and a mismatch does not stop you

Every response is checked against a schema. When one does not match, the body comes back **unvalidated** and the library reports the problem once — one line on stderr per distinct field, however many responses repeat it:

```
[jira.js] GET /rest/api/3/project/{projectIdOrKey}/role answered with something the schema
does not describe: at `10002`, expected string, got number. The response is returned
unvalidated. Set `onSchemaMismatch` to 'silent' to stop these, or pass a function to handle
them yourself.
```

It warns rather than throws because the shapes Jira sends depend on things this library cannot see: your tenant's locale, whether a feature is switched on, team-managed versus company-managed projects, an enum Atlassian grew on a Thursday. None of that is your bug, and none of it should take your integration down.

Four behaviours:

```ts
createCloudClient({
  host,
  auth,
  onSchemaMismatch: 'warn',   // default — report once, hand back the body
  // 'silent'                 // hand back the body, say nothing
  // 'throw'                  // raise SchemaMismatchError; what you want in a test suite
  // report => log.warn(report)  // take it yourself; nothing is printed
});
```

The report names paths and types and never the values at them — it is meant to be pasted into an issue, and the body it describes is yours, not ours. `SchemaMismatchError` carries the same thing on `report`.

If you want the strict behaviour everywhere, set `'throw'` once on the shared client. If you are writing a CLI and the line bothers you, `'silent'` or a handler removes it; the warning goes to stderr, so redirecting or piping stdout is unaffected either way.

## What you gain

One runtime dependency (`zod`), down from three. Responses validated against a schema, so API drift surfaces immediately and by name rather than as `undefined` three frames later. A build that runs in browsers as well as Node. And a package roughly half the size, since one API surface replaced two near-identical ones.
