# Tree-Shaking & Bundle Optimization

The package declares `"sideEffects": false` and ships one module per source file, so a bundler can drop
everything you do not import. This matters most for browser and Forge bundles.

## The cost of a factory

`createCloudClient` is convenient and expensive: it wires up every endpoint on the platform surface, so
importing it pulls all of them in. For a bundle that calls three endpoints, compose the client yourself
from the flat functions instead:

```typescript
import { createClient } from 'jira.js/core';
import { getIssue, createIssue } from 'jira.js/cloud';

const client = createClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email, apiToken },
});

const issue = await getIssue(client, { issueIdOrKey: 'TEST-1' });
```

Every function takes the client as its first argument. That is the same client the factories build, so the
two styles mix freely — use the factory in a server where size does not matter, and the flat functions
where it does.

## Subpaths

| Import | Contents |
| --- | --- |
| `jira.js` | The eight factories, the error types and their predicates, the OAuth helpers |
| `jira.js/core` | `createClient`, the transport, errors, OAuth, multipart helpers |
| `jira.js/cloud` | Platform API functions and response types |
| `jira.js/cloud/models` | Platform API response types on their own |
| `jira.js/cloud/parameters` | Platform API request parameter types |
| `jira.js/agile` | Agile API functions and response types |
| `jira.js/agile/models` | Agile API response types on their own |
| `jira.js/agile/parameters` | Agile API request parameter types |
| `jira.js/serviceDesk` | Service Management functions and response types |
| `jira.js/serviceDesk/models` | Service Management response types on their own |
| `jira.js/serviceDesk/parameters` | Service Management request parameter types |
| `jira.js/server` | Data Center functions and response types |
| `jira.js/server/models` | Data Center response types on their own |
| `jira.js/server/parameters` | Data Center request parameter types |
| `jira.js/assets` | Assets Cloud functions and response types |
| `jira.js/assets/models` | Assets Cloud response types on their own |
| `jira.js/assets/parameters` | Assets Cloud request parameter types |
| `jira.js/teams` | Teams functions and response types |
| `jira.js/teams/models` | Teams response types on their own |
| `jira.js/teams/parameters` | Teams request parameter types |
| `jira.js/admin` | Organization API functions and response types |
| `jira.js/admin/models` | Organization API response types on their own |
| `jira.js/admin/parameters` | Organization API request parameter types |
| `jira.js/userManagement` | User management functions and response types |
| `jira.js/userManagement/models` | User management response types on their own |
| `jira.js/userManagement/parameters` | User management request parameter types |
| `jira.js/userProvisioning` | SCIM provisioning functions and response types |
| `jira.js/userProvisioning/models` | SCIM provisioning response types on their own |
| `jira.js/userProvisioning/parameters` | SCIM provisioning request parameter types |
| `jira.js/webhooks` | The events, payloads and headers Jira posts to you, and the signature check |
| `jira.js/browser` | Prebuilt browser bundle |

The surface subpaths carry the response types alongside the functions, so a type-only import costs nothing
at runtime. Request parameter types sit one level down, because a parameter and a model occasionally share
a name:

```typescript
import type { Issue } from 'jira.js/cloud';
import type { GetIssue } from 'jira.js/cloud/parameters';
```

The nine surfaces are not re-exported from the root, because they collide on a handful of names — import
from the surface you mean.

> Deep imports need an `exports`-aware resolver: `moduleResolution: "bundler"`, `"node16"` or
> `"nodenext"`. The legacy `"node"` resolution cannot see them, and cannot load an ESM-only package
> either.

## What actually shrinks

Schemas are the bulk of the package: each response type carries the Zod schema it is validated against.
Importing one endpoint pulls in its schema and the models that schema references, and nothing else — so
the saving from the flat style is roughly proportional to how much of the API you leave out.
