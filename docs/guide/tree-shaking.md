# Tree-Shaking & Bundle Optimization

`jira.js` is built with `preserveModules`, exposes `"sideEffects": false`, and ships granular subpath
exports so bundlers can drop everything you don't import. This matters most for browser apps.

## Subpath exports

Import a single resource client instead of the whole namespace:

```typescript
// Pull in only what you use
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';
```

Available subpaths include `jira.js/version2`, `jira.js/version3`, `jira.js/agile`, `jira.js/serviceDesk`.

## Typed model & parameter barrels

Deep subpath imports give you the request/response types without pulling in runtime code:

```typescript
import type { SearchForIssuesUsingJqlEnhancedSearchPost } from 'jira.js/version3/parameters';
import type { Issue } from 'jira.js/version3/models';
```

The `version2`, `agile`, and `serviceDesk` equivalents work the same way.

> These deep imports require an `exports`-aware resolver (`moduleResolution: "bundler"`, `"node16"`, or
> `"nodenext"`). With TypeScript's legacy `moduleResolution: "node"`, use the root namespace instead:
> `Version3.Version3Parameters.SearchForIssuesUsingJqlEnhancedSearchPost`.

## Custom client

For the smallest possible bundle, compose a `BaseClient` with only the resources you need rather than the
full `Version3Client`:

```typescript
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';

const client = new BaseClient({ host, authentication });
const issues = new Issues(client);

await issues.getIssue({ issueIdOrKey: 'TEST-1' });
```
