# @jira.js/cloud

TypeScript client for the Jira Cloud REST API v3.

[![npm](https://img.shields.io/npm/v/@jira.js/cloud?style=flat-square)](https://www.npmjs.com/package/@jira.js/cloud)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green?style=flat-square)](https://nodejs.org/)

## Install

```bash
pnpm add @jira.js/cloud
```

## Quick start

```typescript
import { createCloudClient } from '@jira.js/cloud';

const client = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' },
});

const issue = await client.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
console.log(issue.fields.summary);
```

## Requirements

- Node.js >= 22
- TypeScript >= 6
- `moduleResolution: Bundler` or `NodeNext`

## Namespaces

89 namespaces covering the full Jira Cloud REST API v3: `issues`, `issueSearch`, `projects`, `users`, `workflows`, `permissions`, `jql`, and more.

See the [full namespace reference](https://jirajs.dev/cloud/).

## Authentication

```typescript
// Basic auth (email + API token)
auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' }

// Bearer token
auth: { type: 'bearer', token: 'MY_TOKEN' }

// OAuth 2.0 (dynamic token)
auth: { type: 'bearer', getToken: async () => await myStore.getToken() }
```

## Error handling

```typescript
import { ApiError } from '@jira.js/base';

try {
  await client.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
} catch (err) {
  if (err instanceof ApiError) {
    console.log(err.status, err.message);
  }
}
```

## Links

- [Documentation](https://jirajs.dev)
- [Getting started guide](https://jirajs.dev/guide/getting-started)
- [GitHub](https://github.com/MrRefactoring/jira.js)
- [Issue tracker](https://github.com/MrRefactoring/jira.js/issues)

## License

MIT
