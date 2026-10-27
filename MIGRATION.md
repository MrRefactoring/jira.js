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

## Four methods were renamed

Atlassian names these operations after the machinery behind them. **6.3.0** names them after what they do, and keeps
the old spelling as a deprecated alias that is removed in 7.0. The new names do not exist in 6.0 through 6.2 — only
the old spellings do, so reach 6.3.0 before rewriting a call.

| v5 | v6 |
|---|---|
| `issueSearch.searchForIssuesUsingJqlEnhancedSearch` | `issueSearch.searchIssues` |
| `issueSearch.searchForIssuesUsingJqlEnhancedSearchPost` | `issueSearch.searchIssuesPost` |
| `jiraExpressions.evaluateJiraExpressionUsingEnhancedSearch` | `jiraExpressions.evaluateExpression` |
| `status.search` | `status.searchStatuses` |

```diff
-const { issues } = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({ jql });
+const { issues } = await jira.issueSearch.searchIssuesPost({ jql });
```

The aliases cover Atlassian's spellings — `searchAndReconsileIssuesUsingJql`, `searchAndReconsileIssuesUsingJqlPost`,
`evaluateJSISJiraExpression`, `search` — because those are what 6.0 through 6.2 shipped.

`status.search` appears in both lists, and it keeps its alias: v5 spelled it that way and so did 6.0 through 6.2, so
the call goes on working until 7.0. The other three v5 names in the table — `searchForIssuesUsingJqlEnhancedSearch`,
`searchForIssuesUsingJqlEnhancedSearchPost` and `evaluateJiraExpressionUsingEnhancedSearch` — have no alias: they
never matched the specification, and 6.0 already dropped them.

Two neighbours of these methods are gone rather than renamed, because Atlassian is removing the endpoints:

- `issueSearch.searchForIssuesUsingJql` and `searchForIssuesUsingJqlPost` (`/rest/api/3/search`) → `searchIssues` and
  `searchIssuesPost`, which page by `nextPageToken` instead of `startAt`.
- `jiraExpressions.evaluateJiraExpression` (`/rest/api/3/expression/eval`) → `evaluateExpression`.

## Types the 6.3.0 regeneration changed

6.3.0 resyncs Cloud, Agile and Service Management against Atlassian's current documents. No operation is removed and
no URL changes, but the types moved, and the compiler is where you will meet it.

**Seven calls need an argument they did not need before**, because the document requires it and the endpoint always
did:

| Call | Now required |
|---|---|
| `users.getUser` | `accountId` |
| `issueWatchers.removeWatcher` | `accountId` |
| `issueBulkOperations.submitBulkEdit` | `editedFieldsInput` |
| `issueRemoteLinks.createOrUpdateRemoteIssueLink`, `issueRemoteLinks.updateRemoteIssueLink` | `object` |
| `screenSchemes.createScreenScheme` | `screens` |
| `issueNotificationSchemes.addNotifications` | `event` |

```diff
-const me = await jira.users.getUser();
+const me = await jira.myself.getCurrentUser();
```

`users.getUser()` without an `accountId` answered 400 in every version that let you write it. Use `myself.getCurrentUser`
when you meant the current user, and pass the id when you meant somebody else.

**Maps that were `Record<string, any>` now say what they hold** — ninety-five of them. The ones most likely to be in
your code take strings:

```diff
-transitions: [{ id: 't1', properties: { 'jira.issue.editable': false } }]
+transitions: [{ id: 't1', properties: { 'jira.issue.editable': 'false' } }]
```

`any` accepted the boolean and the endpoint never did, so this is a type error catching a call that was already wrong.

**An issue describes its fields.** `Issue.fields` was an untyped map and is now `IssueFields`: the forty system fields
by name, `null` where Jira clears one, and `customfield_*` keys through an index signature. That signature stays `any`,
as in 6.2, so `issue.fields?.customfield_10016.value` keeps compiling. The system fields are typed, and code that read
them as `any` needs updating: `summary` is `string | undefined`, values of `renderedFields` and `properties` are
`unknown`, and `created`, `updated`, `resolutiondate`, `statuscategorychangedate` and `lastViewed` are `Date` objects
rather than ISO strings:

```diff
-const title: string = issue.fields?.summary;
-const day = issue.fields?.created.slice(0, 10);
+const title = issue.fields?.summary ?? '';
+const day = issue.fields?.created?.toISOString().slice(0, 10);
```

`IssueSchema` stays a `ZodObject`, so `IssueSchema.extend(...)` and `.shape` keep working.

What `createIssue`, `editIssue` and `doTransition` send is `IssueFieldsInput`: the system fields a write can set by name
and `customfield_*` keys. A key that is neither no longer compiles, and neither does a field Jira only reports, such as
`status`, `created` or `votes` — move an issue between statuses with `issues.doTransition`:

```diff
-await jira.issues.editIssue({ issueIdOrKey: 'PROJ-1', fields: { sumary: 'Renamed' } });
+await jira.issues.editIssue({ issueIdOrKey: 'PROJ-1', fields: { summary: 'Renamed' } });
```

**A request names only the keys its models declare, at any depth.** Nested objects in a request used to accept any
extra key, and Jira dropped it without a word. A key a model does not declare is a type error now — fix the spelling,
or drop the key if it was never part of the API.

**A few one-line changes worth grepping for:**

- `SecurityLevelPayload.isDefault`, `BoardFeaturePayload.state` and `CardLayout.showDaysInColumn` are `boolean`, not the
  strings `'true'` and `'false'`.
- `targetToSourcesMapping`, `targetStatus`, `targetClassification` and `targetMandatoryFields` are capitalised. The old
  names stay as deprecated aliases until 7.0, so nothing has to change today.
- `DashboardUser` keeps its 6.2 shape and is still what `myself`, `users` and `userSearch` return, but it is deprecated
  in favor of `User` and removed in 7.0. Jira sends `null` for the `emailAddress` and `locale` of a user hidden by
  privacy settings, and `DashboardUser` turns it into `undefined` to match its type. `User` keeps the `null` and types
  both as nullable, and a returned `DashboardUser` can be assigned to it.
- On Data Center, `board.setBoardProperty`, `issues.rankIssues` and `issueSearch.getError` return `… | undefined`: each
  answers 204 with no body in one documented case, so a read of the result needs a guard. The Cloud and Agile methods
  that can answer 204 keep their 6.2 return types.
- Response fields Atlassian now marks required keep their 6.2 optional types, so guards like `member.holder?.type` stay
  as they are. The schemas still report a response that omits them.
- Wiki markup and a document in one `createIssue`, `editIssue` or `doTransition` write — a string `description` with a
  document `environment`, or the reverse — throws a `TypeError`. No endpoint accepts that combination. `update` counts
  too: a description or environment set there, and a comment body or a worklog comment added or edited there. A multi-line custom field is
  not looked at, so give it in the same form as the rest of the write.
- The values of `issueProperties.bulkSetIssuesPropertiesList` and `bulkSetIssuePropertiesByIssue`,
  `TaskProgressJsonNode.result` and Service Management's `FormAnswer.adf` accept any JSON value when written and read
  back as `any`, as `JsonNode` did. `JsonNode` is deprecated and removed in 7.0.
- `User.emailAddress` and `User.locale` are `string | null`, because a privacy setting hides them, so a read that
  assumed a string needs a guard.
- `issues.assignIssue({ issueIdOrKey, accountId: null })` compiles and unassigns the issue, and
  `StatusPayload.scope` accepts `null`.

## Everything else that was removed

- **Callbacks.** Every method is promise-only. `client.issues.getIssue(params, callback)` → `await client.issues.getIssue(params)`.
- **`middlewares`, `baseRequestConfig`, `newErrorHandling`.** The transport is `fetch`; there is no axios config to pass through. What the interceptors were used for has somewhere to go: `fetch` in the client configuration wraps the transport itself (logging, tracing, a proxy), `withRetry` retries the failures worth retrying, and `getAuthOn401` swaps in fresh credentials when the ones you gave are refused.
- **Namespace re-exports.** `Version3.Models.Issue` → import from `jira.js/cloud`.
- **The CJS build.** The package is ESM-only.
- **`mime-types`.** Attachment content types come from a built-in table now; an unknown extension is `application/octet-stream`, as before.

## Avatar images come back as a `Blob`

In v5 the three avatar image methods returned `AvatarWithDetails` — `{ avatar: Uint8Array, contentType: string }`. In v6 they return a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob), which carries both:

```ts
const image = await client.avatars.getAvatarImageByID({ type: 'project', id: 10011 });

image.type;                                   // 'image/svg+xml' — was `contentType`
new Uint8Array(await image.arrayBuffer());    // the bytes — was `avatar`

return new Response(image);                   // proxying it on takes no unpacking at all
```

The content type is worth keeping hold of: the same endpoint answers with SVG for a system avatar and PNG for an uploaded one, and nothing in the request says which is coming.

This landed in **6.2.0**. Between 6.0.0 and 6.1.0 these three methods were generated from a JSON schema and threw `SchemaMismatchError` on every call — see [#434](https://github.com/MrRefactoring/jira.js/issues/434). Attachments are unaffected: `getAttachmentContent` and `getAttachmentThumbnail` still return the bytes alone, since their content type is already on the attachment metadata.

Uploading works the same way round. In v5 `storeAvatar` took `{ avatar, mimeType }`; it now takes a `Blob`, which carries both:

```ts
await jira.avatars.storeAvatar({
  type: 'project',
  entityId: project.id,
  size: 48,
  body: new Blob([bytes], { type: 'image/png' }),   // was `avatar` + `mimeType`
});
```

The same applies to `createProjectAvatar` and `createIssueTypeAvatar`. The `X-Atlassian-Token: no-check` header v5 asked you to think about is now sent for you.

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

## Some models that were empty are now unions

A handful of types in v5 were declared as `{}` — `CustomFieldContextDefaultValue`, `JqlQueryClause` and the operand types beneath it, `WorkflowCondition`. That was never what the API documents; the generator collapsed schemas built from a list of alternatives into an empty object and dropped every alternative on the floor. An empty interface accepts anything, so nothing complained.

They now carry the alternatives the spec declares. `CustomFieldContextDefaultValue` is the widest: twenty-seven branches, discriminated on `type`.

Where you previously got a value with no properties and had to cast to reach anything, you now narrow on `type` and the branch is yours:

```ts
const page = await client.issueCustomFieldContexts.getContextDefaultValues({ fieldId });

for (const context of page.values ?? []) {
  for (const { value } of context.defaultValues ?? []) {
    if (value?.type === 'datepicker') {
      console.log(value.date, value.useCurrent);
    } else if (value?.type === 'option.single') {
      console.log(value.optionId);
    }
  }
}
```

TypeScript now knows which fields go together — `useCurrent` belongs to `datepicker`, `optionId` to `option.single` — so a typo in a branch-specific field is a compile error rather than `undefined` at runtime.

The cost is that these types no longer accept an arbitrary object. If you were building one of them by hand, the compiler will ask which branch you meant; add the `type` the API already required. And since the union is checked at runtime as well, a `type` Atlassian adds later matches no branch and is reported the way any other drift is — one warning, body handed back unvalidated, nothing thrown.

## What you gain

One runtime dependency (`zod`), down from three. Responses validated against a schema, so API drift surfaces immediately and by name rather than as `undefined` three frames later. A build that runs in browsers as well as Node. And one API surface instead of two near-identical ones, which takes the unpacked package from 16.4 MiB to 11.4 MiB.
