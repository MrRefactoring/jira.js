# Getting Started

`jira.js` is a TypeScript client for the Atlassian Jira REST APIs, for [Node.js](https://nodejs.org/)
and browsers. It covers four surfaces:

- **[Jira Cloud platform](https://developer.atlassian.com/cloud/jira/platform/rest/)** — issues, projects, fields, workflows
- **[Jira Agile](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** — boards, sprints, backlog
- **[Jira Service Management](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** — requests, queues, organizations
- **[Jira Data Center](https://developer.atlassian.com/server/jira/platform/rest/)** — the self-hosted API, platform and agile in one client

The first three are Cloud. Data Center is a surface of its own rather than the Cloud one pointed at another
host — see [Jira Data Center](./data-center).

## Install

```bash
npm install jira.js
```

See [Installation](./installation) for requirements and the 6.0 status.

## Create a client

Each surface has a factory. Most projects need the platform one:

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

`host` is the bare site URL — the API path belongs to the request, not here.

> Generate an API token at [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

If you need more than one surface, build the client **once** and hand it to each factory. That matters
under OAuth 2.0: two clients mean two token states, and since Atlassian rotates the refresh token on every
refresh, whichever refreshes first invalidates the other's copy.

```typescript
import { createClient } from 'jira.js/core';
import { createAgileClient, createCloudClient } from 'jira.js';

const client = createClient({ host, auth });

const jira = createCloudClient(client);
const agile = createAgileClient(client);
```

## Make your first request

Every endpoint is a promise-returning method:

```typescript
// Who am I?
const me = await jira.myself.getCurrentUser();
console.log(me.displayName);

// Search with JQL
const { issues } = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({
  jql: 'project = TEST AND statusCategory != Done ORDER BY created DESC',
  maxResults: 20,
});

for (const issue of issues ?? []) {
  console.log(issue.key, issue.fields?.summary);
}
```

## Rich text

Fields like a comment body or an issue description take
[Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
You can still write them as a wiki-markup **string** — the library routes that write through Jira's v2
endpoint, which parses the markup server-side, then reads the result back so what you get is a real
document:

```typescript
// Wiki markup — still works, still formats
await jira.issueComments.addComment({
  issueIdOrKey: 'TEST-1',
  body: 'h2. Heading\n\n*bold* and {code}inline{code}',
});
```

Reads always come back as a document, never as a string.

## Next steps

- [Authentication](./authentication) — API token, OAuth 2.0 (3LO)
- [Error Handling](./error-handling) — typed errors and their predicates
- [Response Validation](./response-validation) — what happens when Jira sends something unexpected
- [Tree-Shaking](./tree-shaking) — keeping the bundle small
- [API Reference](/api/) — every endpoint, parameter and model
