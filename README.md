> 🌐 **English** · [Русский](README.ru.md)

<div align="center">
  <img alt="jira.js — Jira REST API client for JavaScript and TypeScript" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/jira.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" /></a>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-22%2B-green?style=flat-square&logo=node.js" /></a>

  <h1>jira.js — Jira REST API client for Node.js, TypeScript &amp; browsers</h1>
  <p>JavaScript / TypeScript library for Node.js and browsers to interact with Atlassian Jira APIs</p>
</div>

## About

**Jira.js** is a TypeScript client for the Atlassian Jira Cloud REST APIs, for [Node.js](https://nodejs.org/) and browsers. It covers three surfaces:

- **[Jira Cloud platform API](https://developer.atlassian.com/cloud/jira/platform/rest/)** - issues, projects, fields, workflows
- **[Jira Agile API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** - sprints, boards, backlog
- **[Jira Service Management API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** - requests, queues, organizations

> **6.0 is a rewrite, not a refresh.** `npm install jira.js` now installs 6.x. Read [MIGRATION.md](./MIGRATION.md) before upgrading — it says plainly who should stay on `jira.js@5`, which is supported until the end of 2026.

### Key Features

- ✅ **Type-Safe**: every endpoint, parameter and model is typed, and `src/` ships with the package so "go to definition" lands on the real source
- ✅ **Validated at runtime**: responses are checked against a schema, and drift is reported by field instead of surfacing as `undefined` three frames later
- ✅ **Promise-based**: clean, async/await-friendly methods throughout
- ✅ **Tree-Shakable**: import a single endpoint function instead of a whole client
- ✅ **Universal**: one ESM build for Node.js 22+ and modern browsers
- ✅ **One dependency**: `zod`, and nothing else
- ✅ **Typed errors**: a hierarchy with predicates that survive bundling, minification and duplicate installs
- ✅ **OAuth 2.0 (3LO)**: automatic refresh, single-flight, `401` retry and cloud id resolution

Built for Jira integrations, automation, webhook handlers, CI/CD pipelines and browser-based tools.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Quick Example](#quick-example)
- [Documentation](#documentation)
- [Usage](#usage)
  - [Authentication](#authentication)
    - [Email and API Token](#email-and-api-token)
    - [Bearer Token](#bearer-token)
    - [OAuth 2.0](#oauth-20)
  - [Error Handling](#error-handling)
  - [Response Validation](#response-validation)
  - [API Structure](#api-structure)
- [Tree Shaking](#tree-shaking)
- [Other Products](#other-products)
- [License](#license)

## Getting Started

### Installation

**Requires Node.js 22 or newer.** The package is ESM-only — there is no CommonJS build.

```bash
# Using npm
npm install jira.js

# Using yarn
yarn add jira.js

# Using pnpm
pnpm add jira.js
```

**TypeScript users**: type definitions are included - no additional `@types` package needed.

### Quick Example

```typescript
import { createCloudClient } from 'jira.js';

const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: {
    type: 'basic',
    email: 'your@email.com',
    apiToken: 'YOUR_API_TOKEN', // Create one: https://id.atlassian.com/manage-profile/security/api-tokens
  },
});

const project = await jira.projects.getProject({ projectIdOrKey: 'YOUR_PROJECT_KEY' });

const issue = await jira.issues.createIssue({
  fields: {
    summary: 'Hello Jira.js!',
    issuetype: { name: 'Task' },
    project: { key: project.key },
  },
});

console.log(`Issue created: ${issue.key}`);
```

`host` is the bare site URL — the API path belongs to the request, not here.

Need more than one surface? Build the client **once** and hand it to each factory. Under OAuth 2.0 this matters: two clients mean two token states, and since Atlassian rotates the refresh token on every refresh, whichever refreshes first invalidates the other's copy.

```typescript
import { createClient } from 'jira.js/core';
import { createAgileClient, createCloudClient } from 'jira.js';

const client = createClient({ host, auth });

const jira = createCloudClient(client);
const agile = createAgileClient(client);
```

## Documentation

📚 **Full API reference, guides, and examples** available at:
**[https://mrrefactoring.github.io/jira.js/](https://mrrefactoring.github.io/jira.js/)**

The documentation includes:
- Complete API reference for all endpoints
- TypeScript examples and code samples
- Authentication guides
- Error handling patterns
- Best practices and tips

## Supported APIs

- **Jira Cloud platform API**: issues, projects, users, fields, workflows, schemes
- **Jira Software (Agile) API**: sprint management, boards, backlogs, agile workflows
- **Jira Service Management API**: request handling, queues, customers, organizations

There is one platform surface, generated from Jira's v3 specification. `Version2Client` and `Version3Client` are gone — the difference between them was never the endpoints, it was rich text. Rich-text fields still accept a wiki-markup **string**: that write is routed through Jira's v2 endpoint, which parses the markup server-side, and the result is read back so what you get is a real [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/) document.

```typescript
// Wiki markup — still works, still formats
await jira.issueComments.addComment({
  issueIdOrKey: 'PROJ-1',
  body: 'h2. Heading\n\n*bold* and {code}inline{code}',
});
```

Reads always come back as a document, never as a string.

## Usage

### Authentication

Authentication is the `auth` field — a discriminated union on `type`.

#### Email and API Token

1. Create an API token: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Configure the client:

```typescript
const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
});
```

#### Bearer Token

When something else already obtained an access token and you manage its lifetime yourself:

```typescript
const jira = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', token: 'YOUR_ACCESS_TOKEN' },
});
```

Nothing is refreshed for you here — when the token expires, requests fail with `AuthError`.

#### OAuth 2.0

jira.js supports the full Atlassian [OAuth 2.0 (3LO)](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) flow. Provide refresh credentials and the client refreshes the access token before expiry (and on `401`), collapses concurrent refreshes into one call, persists the rotated refresh token via `onTokenRefresh`, and routes requests through the API gateway (`https://api.atlassian.com/ex/jira/{cloudId}`) — so no `host` is needed. `clientSecret` and refresh are **server-side only**.

```typescript
const jira = createCloudClient({
  // no `host` — the cloudId is resolved automatically (pass `siteUrl` or `cloudId` to pin it)
  auth: {
    type: 'oauth2',
    accessToken: 'CURRENT_ACCESS_TOKEN',
    refreshToken: 'CURRENT_REFRESH_TOKEN',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    expiresAt: Date.now() + 3600 * 1000, // optional; epoch milliseconds
    onTokenRefresh: async ({ accessToken, refreshToken, expiresAt }) => {
      await saveTokens({ accessToken, refreshToken, expiresAt }); // persist the rotated tokens
    },
  },
});
```

**Persisting the rotated refresh token is not optional** — Atlassian invalidates the previous one on every refresh.

jira.js also exports stateless helpers for the authorization-code flow — `generateAuthorizationUrl`, `exchangeAuthorizationCode`, `refreshOAuth2Token`, `getAccessibleResources`, `parseCallbackUrl`. See the [step-by-step OAuth 2.0 guide](https://mrrefactoring.github.io/jira.js/guide/oauth2-authentication).

> **JWT (Atlassian Connect) is not supported in 6.0** and has no replacement. If you authenticate Connect installations with a shared secret, stay on `jira.js@5` — see [MIGRATION.md](./MIGRATION.md). Atlassian Connect itself is reaching [end of support in Q4 2026](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps).

### Error Handling

Every failure arrives as one of the library's own error types, each with a predicate:

```typescript
import { isNotFoundError, isRateLimitError } from 'jira.js';

try {
  await jira.issues.getIssue({ issueIdOrKey: 'INVALID-123' });
} catch (error) {
  if (isNotFoundError(error)) return null;

  if (isRateLimitError(error) && error.retryAfterMs) {
    await new Promise(resolve => setTimeout(resolve, error.retryAfterMs));
  }

  throw error;
}
```

| Error | When | Extra |
| --- | --- | --- |
| `ApiError` | Any non-2xx; base of the ones below | `status`, `statusText`, `body` |
| `AuthError` | `401` | |
| `ScopeError` | `401`, token lacks the scope | |
| `ForbiddenError` | `403` | |
| `NotFoundError` | `404` | |
| `RateLimitError` | `429` | `retryAfterMs` |
| `ServerError` | `5xx` | |
| `NetworkError` | Request never completed | `code` |
| `OAuthError` | The token flow failed | |
| `ConfigError` | Impossible client configuration | |
| `SchemaMismatchError` | 2xx of the wrong shape | `report` |

Use the predicates rather than `instanceof`: they read a branded symbol instead of walking the prototype chain, so they keep working when a bundler splits chunks, when minification renames classes, and when two copies of the package end up in one `node_modules`.

Retries are off by default. `retry: { maxAttempts, initialDelayMs, backoffFactor }` opts in for network errors and `502`/`503`/`504` only — never `4xx`, never other `5xx`.

### Response Validation

Every response is checked against a schema. When one does not match, the library **does not throw**: the body comes back unvalidated and the problem is reported once per distinct field, on stderr.

```
[jira.js] GET /rest/api/3/project/{projectIdOrKey}/role answered with something the schema
does not describe: at `10002`, expected string, got number. The response is returned
unvalidated.
```

The shapes Jira sends depend on things a library cannot see — your site's locale, which features are on, team-managed versus company-managed projects, an enum Atlassian grew this week. A schema here being wrong about one of those is not your bug and should not stop your program.

```typescript
const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: 'warn', // 'silent' | 'throw' | (report) => void
});
```

Use `'throw'` in a test suite, where a mismatch *is* the thing under test. The report names field paths and types and **never the values at them** — it is meant to be pasted into an issue. See the [Response Validation guide](https://mrrefactoring.github.io/jira.js/guide/response-validation).

### API Structure

Access endpoints using the `client.<group>.<method>` pattern:

```typescript
// Get all projects
const projects = await jira.projects.searchProjects();

// Create a sprint (Agile surface)
const sprint = await agile.sprint.createSprint({ name: 'Q4 Sprint' });
```

**Available API groups:**
<details>
  <summary>🔽 Agile Cloud API</summary>

  - [backlog](https://developer.atlassian.com/cloud/jira/software/rest/api-group-backlog/#api-group-backlog)
  - [board](https://developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-group-board)
  - [builds](https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds)
  - [deployments](https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments)
  - [developmentInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-development-information/#api-group-development-information)
  - [devopsComponents](https://developer.atlassian.com/cloud/jira/software/rest/api-group-devops-components/#api-group-devops-components)
  - [epic](https://developer.atlassian.com/cloud/jira/software/rest/api-group-epic/#api-group-epic)
  - [featureFlags](https://developer.atlassian.com/cloud/jira/software/rest/api-group-feature-flags/#api-group-feature-flags)
  - [issue](https://developer.atlassian.com/cloud/jira/software/rest/api-group-issue/#api-group-issue)
  - [operations](https://developer.atlassian.com/cloud/jira/software/rest/api-group-operations/#api-group-operations)
  - [remoteLinks](https://developer.atlassian.com/cloud/jira/software/rest/api-group-remote-links/#api-group-remote-links)
  - [securityInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-security-information/#api-group-security-information)
  - [sprint](https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-group-sprint)
</details>

<details>
  <summary>🔽 Jira Cloud platform API</summary>

  - [api](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-other-operations/#api-group-other-operations)
  - [announcementBanner](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner/#api-group-announcement-banner)
  - [appDataPolicy](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-data-policies/#api-group-app-data-policies)
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles/#api-group-application-roles)
  - [appMigration](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-migration/#api-group-app-migration)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-group-avatars)
  - [classificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels/#api-group-classification-levels)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-group-filters)
  - [fieldSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-group-issues)
  - [issueAttachments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments/#api-group-issue-attachments)
  - [issueBulkOperations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-bulk-operations/#api-group-issue-bulk-operations)
  - [issueComments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments/#api-group-issue-comments)
  - [issueCustomFieldAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-associations/#api-group-issue-custom-field-associations)
  - [issueCustomFieldConfigurationApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration--apps-/#api-group-issue-custom-field-configuration--apps-)
  - [issueCommentProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comment-properties/#api-group-issue-comment-properties)
  - [issueFields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-group-issue-fields)
  - [issueFieldConfigurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-group-issue-field-configurations)
  - [issueCustomFieldContexts](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-contexts/#api-group-issue-custom-field-contexts)
  - [issueCustomFieldOptions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-group-issue-custom-field-options)
  - [issueCustomFieldOptionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options--apps-/#api-group-issue-custom-field-options--apps-)
  - [issueCustomFieldValuesApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-values--apps-/#api-group-issue-custom-field-values--apps-)
  - [issueLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-links/#api-group-issue-links)
  - [issueLinkTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-link-types/#api-group-issue-link-types)
  - [issueNavigatorSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-navigator-settings/#api-group-issue-navigator-settings)
  - [issueNotificationSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-notification-schemes/#api-group-issue-notification-schemes)
  - [issuePriorities](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-priorities/#api-group-issue-priorities)
  - [issueProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-properties/#api-group-issue-properties)
  - [issueRedaction](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-redaction/#api-group-issue-redaction)
  - [issueRemoteLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-remote-links/#api-group-issue-remote-links)
  - [issueResolutions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-resolutions/#api-group-issue-resolutions)
  - [issueSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-group-issue-search)
  - [issueSecurityLevel](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-level/#api-group-issue-security-level)
  - [issueSecuritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-group-issue-security-schemes)
  - [issueTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-types/#api-group-issue-types)
  - [issueTypeSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-group-issue-type-schemes)
  - [issueTypeScreenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/#api-group-issue-type-screen-schemes)
  - [issueTypeProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-properties/#api-group-issue-type-properties)
  - [issueVotes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-votes/#api-group-issue-votes)
  - [issueWatchers](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-watchers/#api-group-issue-watchers)
  - [issueWorklogs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-group-issue-worklogs)
  - [issueWorklogProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklog-properties/#api-group-issue-worklog-properties)
  - [jiraExpressions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-expressions/#api-group-jira-expressions)
  - [jiraSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-settings/#api-group-jira-settings)
  - [jql](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-group-jql)
  - [jqlFunctionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql-functions--apps-/#api-group-jql-functions--apps-)
  - [labels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-labels/#api-group-labels)
  - [licenseMetrics](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-license-metrics/#api-group-license-metrics)
  - [migrationOfConnectModulesToForge](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-migration-of-connect-modules-to-forge/#api-group-migration-of-connect-modules-to-forge)
  - [myself](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-group-myself)
  - [permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions/#api-group-permissions)
  - [permissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-group-permission-schemes)
  - [plans](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-plans/#api-group-plans)
  - [prioritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority-schemes/#api-group-priority-schemes)
  - [projects](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-group-projects)
  - [projectTemplates](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-templates/#api-group-project-templates)
  - [projectAvatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-avatars/#api-group-project-avatars)
  - [projectCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-categories/#api-group-project-categories)
  - [projectClassificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-classification-levels/#api-group-project-classification-levels)
  - [projectComponents](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-components/#api-group-project-components)
  - [projectEmail](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-email/#api-group-project-email)
  - [projectFeatures](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-features/#api-group-project-features)
  - [projectKeyAndNameValidation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-key-and-name-validation/#api-group-project-key-and-name-validation)
  - [projectPermissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-group-project-permission-schemes)
  - [projectProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-properties/#api-group-project-properties)
  - [projectRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles/#api-group-project-roles)
  - [projectRoleActors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-role-actors/#api-group-project-role-actors)
  - [projectTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-types/#api-group-project-types)
  - [projectVersions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-versions/#api-group-project-versions)
  - [screens](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-group-screens)
  - [screenTabs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tabs/#api-group-screen-tabs)
  - [screenTabFields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-group-screen-tab-fields)
  - [screenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-group-screen-schemes)
  - [serverInfo](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-server-info/#api-group-server-info)
  - [serviceRegistry](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-service-registry/#api-group-service-registry)
  - [status](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-group-status)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks)
  - [teamsInPlan](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-teams-in-plan/#api-group-teams-in-plan)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking/#api-group-time-tracking)
  - [uiModificationsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-ui-modifications--apps-/#api-group-ui-modifications--apps-)
  - [users](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-group-users)
  - [userNavProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-other-operations/#api-group-other-operations)
  - [userProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-properties/#api-group-user-properties)
  - [userSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-group-user-search)
  - [webhooks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-group-webhooks)
  - [workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-group-workflows)
  - [workflowTransitionRules](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-group-workflow-transition-rules)
  - [workflowSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-schemes/#api-group-workflow-schemes)
  - [workflowSchemeProjectAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-project-associations/#api-group-workflow-scheme-project-associations)
  - [workflowSchemeDrafts](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-drafts/#api-group-workflow-scheme-drafts)
  - [workflowStatuses](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses/#api-group-workflow-statuses)
  - [workflowStatusCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-status-categories/#api-group-workflow-status-categories)
  - [workflowTransitionProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-properties/#api-group-workflow-transition-properties)
  - [appProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-properties/#api-group-app-properties)
  - [dynamicModules](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dynamic-modules/#api-group-dynamic-modules)
</details>

<details>
  <summary>🔽 Service Desk API</summary>

  - [customer](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-customer/)
  - [info](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-info/#api-group-info)
  - [insight](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-insight/#api-group-insight)
  - [knowledgeBase](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-knowledgebase/#api-group-knowledgebase)
  - [organizations](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-organization/#api-group-organization)
  - [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/#api-group-request)
  - [requestType](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-requesttype/#api-group-requesttype)
  - [serviceDesk](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-group-servicedesk)
</details>

See the full endpoint reference in the [API documentation](https://mrrefactoring.github.io/jira.js/).

## Tree Shaking & Bundle Optimization

The package declares `"sideEffects": false` and ships one module per source file, so a bundler can drop everything you do not import.

`createCloudClient` is convenient and expensive: it wires up every endpoint on the platform surface. For a bundle that calls a handful of endpoints, compose the client yourself from the flat functions instead:

```typescript
import { createClient } from 'jira.js/core';
import { getIssue, createIssue } from 'jira.js/cloud';
import { createSprint } from 'jira.js/agile';

const client = createClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email, apiToken },
});

const issue = await getIssue(client, { issueIdOrKey: 'KEY-1' });
```

Every function takes the client as its first argument — the same client the factories build, so the two styles mix freely.

| Import | Contents |
| --- | --- |
| `jira.js` | The three factories, error types and predicates, OAuth helpers |
| `jira.js/core` | `createClient`, transport, errors, OAuth, multipart helpers |
| `jira.js/cloud` | Platform API functions, parameters and response types |
| `jira.js/agile` | Agile API functions, parameters and response types |
| `jira.js/serviceDesk` | Service Management functions, parameters and response types |
| `jira.js/browser` | Prebuilt browser bundle |

The surface subpaths carry the types alongside the functions, so a type-only import costs nothing at runtime:

```typescript
import type { Issue, GetIssue } from 'jira.js/cloud';
```

The three surfaces are not re-exported from the root — they collide on a handful of names, so import from the one you mean.

> Deep imports need an `exports`-aware resolver: `moduleResolution: "bundler"`, `"node16"` or `"nodenext"`. The legacy `"node"` resolution cannot see them, and cannot load an ESM-only package either.

Schemas are the bulk of the package — each response type carries the schema it is validated against — so the saving is roughly proportional to how much of the API you leave out.

## Use Cases

Jira.js is perfect for:

- 🔄 **CI/CD Integration**: Automate issue creation and updates in your deployment pipelines
- 🤖 **Automation Scripts**: Build custom automation for Jira workflows and processes
- 📊 **Reporting & Analytics**: Extract and analyze Jira data for custom dashboards
- 🔗 **Webhook Handlers**: Process Jira webhooks and integrate with external systems
- 🛠️ **Custom Tools**: Build admin tools, migration scripts, and custom Jira applications
- 📱 **Browser Apps**: Create browser-based Jira management interfaces
- 🔌 **Third-Party Integrations**: Connect Jira with other services and platforms

## Common Questions (FAQ)

**Q: Does this work with Jira Server/Data Center?**  
A: No, Jira.js is designed specifically for Jira Cloud. For on-premise Jira, consider using the REST API directly.

**Q: Is TypeScript required?**  
A: No, but TypeScript is fully supported with comprehensive type definitions. You can use Jira.js with plain JavaScript too.

**Q: Can I use this in the browser?**  
A: Yes. The package is browser-safe throughout and ships a prebuilt bundle at `jira.js/browser`. Calling Jira directly from a page is usually blocked by CORS and exposes credentials to anyone with devtools, so this suits extensions, Forge apps and proxied setups rather than putting an API token in a web app.

**Q: How do I handle authentication?**  
A: Email + API token, a bearer token, or OAuth 2.0 (3LO) with automatic refresh. See the [Authentication](#authentication) section above.

**Q: Can I still use CommonJS?**  
A: No. 6.0 is ESM-only — `require('jira.js')` does not work. From a CommonJS module, use a dynamic `await import('jira.js')`, or stay on `jira.js@5`.

**Q: What happened to JWT / Atlassian Connect?**  
A: It was removed in 6.0 and has no replacement. Stay on `jira.js@5`, which receives security and critical fixes until the end of 2026 — when Atlassian Connect itself reaches end of support.

**Q: A response failed validation. Is that a bug in my code?**  
A: Usually not. It means the schema shipped here is behind what your Jira actually sends. By default the body is returned anyway and the problem is reported once — please [open an issue](https://github.com/MrRefactoring/jira.js/issues/new) with the report, which contains field paths and types and no values from your data.

## Other Products

Explore our other Atlassian integration libraries:
- [Confluence.js](https://github.com/MrRefactoring/confluence.js) - Interact with Confluence API
- [Trello.js](https://github.com/MrRefactoring/trello.js) - Trello API integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License © MrRefactoring  
See [LICENSE](https://github.com/mrrefactoring/jira.js/blob/master/LICENSE) for details.
