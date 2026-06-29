# Installation

`jira.js` ships a dual **ESM + CommonJS** build with bundled TypeScript type definitions. It targets
modern Node.js (**≥ 20**) and modern browsers.

## Package managers

```bash
# npm
npm install jira.js

# yarn
yarn add jira.js

# pnpm
pnpm add jira.js
```

## Importing

ESM / TypeScript:

```typescript
import { Version3Client } from 'jira.js';
```

CommonJS:

```javascript
const { Version3Client } = require('jira.js');
```

The package exposes per-namespace subpaths (`jira.js/version3`, `jira.js/agile`, …) and typed
`models`/`parameters` barrels (`jira.js/version3/models`, `jira.js/version3/parameters`, …) for
tree-shakable imports — see [Tree-Shaking](./tree-shaking).

## Browser usage

`jira.js` works in the browser, but calling Jira directly from a browser is usually blocked by CORS and
would expose credentials. Use it from a backend, or proxy requests through your own server.
