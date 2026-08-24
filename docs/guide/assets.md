# Assets

Assets is Jira Service Management's configuration management database — the objects an organisation tracks, the
schemas and types that describe them, and the AQL that searches them. `createAssetsClient` covers its sixty Cloud
endpoints.

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

## Authentication

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
