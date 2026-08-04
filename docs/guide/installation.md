# Installation

`jira.js` is **ESM-only** and ships TypeScript declarations. It requires **Node.js 22 or newer** and runs in modern browsers.

::: warning 6.0 is a rewrite
`npm install jira.js` still installs 5.x. 6.0 is in release candidate: `npm install jira.js@next`. It is not a drop-in upgrade — read [Migrating to 6.0](https://github.com/MrRefactoring/jira.js/blob/master/MIGRATION.md) first.
:::

## Package managers

```bash
# npm
npm install jira.js@next

# yarn
yarn add jira.js@next

# pnpm
pnpm add jira.js@next
```

## Importing

```typescript
import { createCloudClient } from 'jira.js';
```

There is no CommonJS build. `require('jira.js')` does not work; from a CommonJS module, use a dynamic
`await import('jira.js')`.

The package also exposes surface-level subpaths — `jira.js/cloud`, `jira.js/agile`, `jira.js/serviceDesk`
and `jira.js/core` — carrying the flat functions along with every parameter and response type. See
[Tree-Shaking](./tree-shaking).

## Requirements

| | |
| --- | --- |
| Node.js | ≥ 22 |
| Modules | ESM only |
| Runtime dependencies | `zod` |

## Browser usage

The package is browser-safe throughout, and `jira.js/browser` is a prebuilt bundle. Calling Jira directly
from a page is usually blocked by CORS and would expose credentials to anyone with devtools open, so this
is for extensions, Forge apps and proxied setups rather than for putting an API token in a web app.

## Going to the source

The published package includes `src/`, so "go to definition" on any symbol lands on the real TypeScript —
its JSDoc, and the schema the response is validated against — rather than on a `.d.ts` stub.
