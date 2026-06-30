# Getting Started

`jira.js` is a modern, production-ready [Node.js](https://nodejs.org/) and browser-compatible TypeScript
library for the Atlassian Jira Cloud REST APIs. It provides full coverage of:

- **[Jira Cloud REST API v2/v3](https://developer.atlassian.com/cloud/jira/platform/rest/)** — the platform API
- **[Jira Agile API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** — boards, sprints, backlog
- **[Jira Service Desk API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** — service desk operations

## Install

```bash
npm install jira.js
```

See [Installation](./installation) for yarn/pnpm and version notes.

## Create a client

Pick the client that matches the API version you need. Most projects use `Version3Client` (Jira Cloud
platform v3, which uses [ADF](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/)
for rich text); `Version2Client` uses wiki markup. There are also `AgileClient` and `ServiceDeskClient`.

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

> Generate an API token at [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

## Make your first request

Every endpoint is a promise-based method. For example, fetch the current user and search for issues:

```typescript
// Who am I?
const me = await client.myself.getCurrentUser();
console.log(me.displayName);

// Search with JQL
const { issues } = await client.issueSearch.searchForIssuesUsingJql({
  jql: 'project = TEST AND statusCategory != Done ORDER BY created DESC',
  maxResults: 20,
});

for (const issue of issues ?? []) {
  console.log(issue.key, issue.fields.summary);
}
```

## Next steps

- [Authentication](./authentication) — Email + API token, OAuth 2.0 (3LO), and JWT.
- [Error Handling](./error-handling) — how failures are surfaced.
- [Tree-Shaking](./tree-shaking) — keep your bundle small with subpath imports.
- [API Reference](/api/) — every client, endpoint, parameter and model.
