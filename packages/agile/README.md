# @jira.js/agile

TypeScript client for the Jira Agile REST API — boards, sprints, epics, backlogs.

[![npm](https://img.shields.io/npm/v/@jira.js/agile?style=flat-square)](https://www.npmjs.com/package/@jira.js/agile)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green?style=flat-square)](https://nodejs.org/)

## Install

```bash
pnpm add @jira.js/agile
```

## Quick start

```typescript
import { createAgileClient } from '@jira.js/agile';

const agile = createAgileClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' },
});

const boards = await agile.board.getAllBoards({ type: 'scrum' });
const activeSprints = await agile.sprint.getAllSprints({ boardId: boards.values![0].id!, state: 'active' });
```

## Requirements

- Node.js >= 22
- TypeScript >= 6
- `moduleResolution: Bundler` or `NodeNext`

## Namespaces

13 namespaces: `board`, `sprint`, `backlog`, `epic`, `issue`, `builds`, `deployments`, `developmentInformation`, `devopsComponents`, `featureFlags`, `operations`, `remoteLinks`, `securityInformation`.

See the [full namespace reference](https://jirajs.dev/agile/).

## Authentication

Same as `@jira.js/cloud` — see [authentication guide](https://jirajs.dev/guide/authentication).

## TypeScript type exports

```typescript
import type { AgileClient } from '@jira.js/agile';

function processBoard(client: AgileClient, boardId: number) {
  return client.board.getBoard({ boardId });
}
```

## Links

- [Documentation](https://jirajs.dev)
- [Agile API reference](https://jirajs.dev/agile/)
- [GitHub](https://github.com/MrRefactoring/jira.js)

## License

MIT
