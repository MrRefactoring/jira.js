<div align="center">
  <img alt="Jira.js logo" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/jira.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/@jira.js/cloud" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/@jira.js%2Fcloud?style=flat-square&label=%40jira.js%2Fcloud" /></a>
  <a href="https://github.com/MrRefactoring/jira.js" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6%2B-blue?style=flat-square&logo=typescript" /></a>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-22%2B-green?style=flat-square&logo=node.js" /></a>

  <strong>Type-safe, tree-shakable TypeScript SDK for the Jira Cloud REST API</strong>
</div>

## Packages

| Package | Description |
|---------|-------------|
| [`@jira.js/cloud`](./packages/cloud) | Jira Cloud REST API v3 — 89 namespaces |
| [`@jira.js/agile`](./packages/agile) | Jira Agile API — boards, sprints, epics |
| [`@jira.js/base`](./packages/base) | Transport, auth, error types, retry |

## Quick start

```bash
pnpm add @jira.js/cloud
```

```typescript
import { createCloudClient } from '@jira.js/cloud';

const client = createCloudClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'you@example.com', apiToken: 'YOUR_API_TOKEN' },
});

const issue = await client.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
console.log(issue.fields.summary);
```

## Features

- **Type-safe** — every request and response fully typed; catch mistakes at compile time
- **Tree-shakable** — import only the namespaces you use
- **ESM + CJS** — dual build, works in Node.js 22+ and modern bundlers
- **0 ATTW warnings** — clean declarations in all TypeScript resolution modes
- **Provenance-signed** — cryptographic npm publish attestations via GitHub Actions
- **OAuth 2.0** — built-in 3LO helpers for Atlassian OAuth
- **Automatic retry** — `withRetry` handles 429/502/503/504 with exponential backoff

## Requirements

- Node.js >= 22
- TypeScript >= 6
- `moduleResolution: Bundler` or `NodeNext`

## Authentication

```typescript
// Email + API token
auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' }

// Bearer token
auth: { type: 'bearer', token: 'MY_TOKEN' }

// OAuth 2.0 (dynamic token with auto-refresh)
auth: { type: 'bearer', getToken: async () => myStore.getAccessToken() }
```

Create an API token at [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)

## Error handling

```typescript
import { ApiError, withRetry } from '@jira.js/base';

// Basic error handling
try {
  const issue = await client.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
} catch (err) {
  if (err instanceof ApiError) {
    console.log(err.status, err.message);
  }
}

// Automatic retry on 429/502/503/504
const issue = await withRetry(
  () => client.issues.getIssue({ issueIdOrKey: 'PROJ-1' }),
  { maxAttempts: 4 },
);
```

## Agile API

```typescript
import { createAgileClient } from '@jira.js/agile';

const agile = createAgileClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' },
});

const boards = await agile.board.getAllBoards({ type: 'scrum' });
const sprints = await agile.sprint.getAllSprints({ boardId: boards.values![0].id!, state: 'active' });
```

## Documentation

- [Getting started guide](https://jirajs.dev/guide/getting-started)
- [Authentication](https://jirajs.dev/guide/authentication)
- [Cloud API reference](https://jirajs.dev/cloud/)
- [Agile API reference](https://jirajs.dev/agile/)
- [Migration guide v0 → v1](https://jirajs.dev/migration/v0-to-v1)
- [Examples](./examples/)

## Versioning

This project follows [semantic versioning](./SEMVER_POLICY.md). TypeScript-only breaking changes count as MAJOR.

## Security

See [SECURITY.md](./SECURITY.md) for vulnerability reporting.

## License

MIT
