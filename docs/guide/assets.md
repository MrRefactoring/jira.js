# Assets

Assets is Jira Service Management's configuration management database — the objects an organisation tracks, the
schemas and types that describe them, and the AQL that searches them. `jira.js` covers it on both deployments,
through two clients, because Atlassian ships two different APIs under one name.

| | client | endpoints | where it answers |
|---|---|---|---|
| Cloud | `createAssetsClient` | 60 | `api.atlassian.com`, per workspace |
| Data Center | `createAssetsServerClient` | 58 | your instance, under `/rest/assets/1.0` |

They are not two modes of one API. Data Center has attachments, comments, archiving and restoring, QR codes and
index control that Cloud does not; Cloud has the import sources a third-party integration feeds data through,
tenant usage and global configuration that Data Center does not. Where both describe the same endpoint, the two
surfaces name it the same way.

## Assets on Cloud

Assets is the one surface in this library that does not answer on your site's own host. Its base URL is
`https://api.atlassian.com/ex/jira/{cloudId}/jsm/assets/workspace/{workspaceId}/v1`, so the client is built from
its own configuration rather than shared with the others.

```typescript
import { createServiceDeskClient, createAssetsClient } from 'jira.js';

const auth = { type: 'basic', email: 'you@example.com', apiToken: 'YOUR_API_TOKEN' } as const;

const serviceDesk = createServiceDeskClient({ host: 'https://your-domain.atlassian.net', auth });
const [workspace] = (await serviceDesk.assets.getAssetsWorkspaces()).values ?? [];

const assets = createAssetsClient({ workspaceId: workspace.workspaceId, auth });

const object = await assets.objects.loadObject({ id: '42' });
```

`workspaceId` is required and explicit. A site has one, `serviceDesk.assets.getAssetsWorkspaces()` is what returns
it, and it does not change — so fetch it once and keep it in configuration rather than paying for the lookup on
every start.

Assets needs **Jira Service Management Premium**. On a site without it the workspace list comes back empty, and
there is nothing to point a client at.

### Authentication

Every strategy the rest of the library takes works here, with one difference in how the address is found.

- **API token or personal access token** — the client goes to `https://api.atlassian.com` directly. Nothing else
  to configure.
- **OAuth 2.0 (3LO)** — leave `host` unset. The client resolves your cloud id and routes through
  `https://api.atlassian.com/ex/jira/{cloudId}`, exactly as it does for every other surface. The scopes Assets
  uses are the `cmdb` family: `read:cmdb-object:jira`, `write:cmdb-object:jira`, `read:cmdb-schema:jira` and so
  on, granted per operation and named in each endpoint's documentation.

```typescript
const assets = createAssetsClient({
  workspaceId,
  auth: { type: 'oauth2', clientId, clientSecret, accessToken, refreshToken, expiresAt },
});
```

To send requests through the gateway address explicitly — inside a Connect or Forge app, for instance, where the
cloud id is already known — pass it as `host`:

```typescript
const assets = createAssetsClient({
  workspaceId,
  host: `https://api.atlassian.com/ex/jira/${cloudId}`,
  auth: { type: 'bearer', token },
});
```

## Assets on Data Center

Self-hosted Assets answers on your own instance, so it takes the same client every other self-hosted surface does.

```typescript
import { createClient } from 'jira.js/core';
import { createAssetsServerClient, createServiceDeskServerClient } from 'jira.js';

const client = createClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'YOUR_PERSONAL_ACCESS_TOKEN' },
});

const assets = createAssetsServerClient(client);
const serviceDesk = createServiceDeskServerClient(client);

const schemas = await assets.objectSchemas.findSchemas();
const objects = await assets.aql.findObjects({ qlQuery: 'objectType = "Laptop"' });
```

Building the client once and handing it to both factories is what the library recommends everywhere: one set of
credentials, and under OAuth 2.0 one token that refreshes in a single place.

Generated from the Jira Service Management Data Center 11.3 specification. Assets ships with the product rather
than as a separate app, so any licensed Service Management instance has it.

### What the specification gets wrong

Atlassian generates the Data Center document from Java annotations, and it describes several endpoints
incorrectly. Every one of the following is corrected in the types this library ships, and each was measured
against a running instance rather than reasoned about:

- ten endpoints that answer with an array while the document names a single item;
- `getArchivedObjects`, which answers with a page of a shape the document does not describe at all;
- `archiveObjectsByKeys`, named after ids and declared as a string, which archives by key and takes an array;
- an attribute's `value`, `displayValue` and `searchValue`, typed as objects and returned as strings;
- an attachment's `created`, which is a date when listed and `{ seconds, nanos }` when uploaded — so the upload
  has a response type of its own;
- an object schema's id, spelt as a string for reading and an integer for writing.

All fifty-eight Data Center endpoints are exercised against a real instance on every run of the live suite, which
is how the list above was built.

## Working with objects

An object belongs to an object type, which belongs to a schema. Its values are attributes, each naming the object
type attribute it fills in:

```typescript
const type = await assets.objectTypes.createObjectType({
  name: 'Laptop',
  objectSchemaId: schema.id,
  iconId: icon.id,
});

const [nameAttribute] = await assets.objectTypes.findObjectTypeAttributes({ id: String(type.id) });

const object = await assets.objects.createObject({
  objectTypeId: type.id,
  attributes: [
    { objectTypeAttributeId: nameAttribute.id, objectAttributeValues: [{ value: 'MacBook Pro' }] },
  ],
});
```

Assets rejects `=`, `;`, `:`, `?`, `.` and `"` in the name of a schema, an object type or an object, with a 400
naming them reserved characters. A schema key has to be unique on the instance, and every object key is built
from it.

## Searching with AQL

```typescript
const page = await assets.objects.findObjectsByAql({
  qlQuery: 'objectType = "Laptop" AND Owner = currentUser()',
});

const total = await assets.objects.countObjectsByAql({ qlQuery: 'objectType = "Laptop"' });
```

On Data Center the same search is `assets.aql.findObjects({ qlQuery })`, and the navigator list —
`assets.objects.findObject` — takes an object type and a schema instead of a query.
