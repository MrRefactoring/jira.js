# Jira Data Center

`jira.js` speaks to self-hosted Jira through its own surface, `createServerClient`. It is not the Cloud client
pointed at a different host: Data Center answers on `/rest/api/2` rather than `/rest/api/3`, takes wiki markup
where Cloud takes Atlassian Document Format, and identifies users by `name` and `key` rather than `accountId`.
Only the transport underneath is shared.

```typescript
import { createServerClient } from 'jira.js';

const jira = createServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'YOUR_PERSONAL_ACCESS_TOKEN' },
});

const issue = await jira.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
```

The surface covers the platform API, the Agile API and the session endpoints in one client — Data Center
publishes them as a single document, so unlike Cloud there is no separate Agile factory.

## Supported versions

Generated from the Jira Data Center 11.3 LTS specification, and usable against **Jira Data Center 10.0 and
later**. The two releases differ by nine operations out of four hundred and thirty-five; each of those carries
an `@since` note in its documentation, and calling one on an older instance answers 404.

Jira 9.x is not supported. Atlassian never published an OpenAPI document for it, and the whole line reached end
of life on 26 June 2026.

## Authentication

::: warning Basic authentication is disabled by default on Jira 11
Jira 11.0 turned basic authentication off as a step towards removing it, and rejects `/rest/auth/1/session` as
well. On a default Jira 11 instance a **personal access token is the only way in**. An administrator can turn
basic authentication back on under **Administration → System → Authentication methods**.
:::

### Personal access token

The mechanism Atlassian recommends, available since Jira 8.14, and the only one that works unchanged across
10.x and 11.x. Create one under **Profile → Personal Access Tokens**.

```typescript
const jira = createServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'YOUR_PERSONAL_ACCESS_TOKEN' },
});
```

### Username and password

Note `username`, not `email` — a self-hosted account has no Atlassian address, and passing `email` selects the
Cloud form of the same strategy.

```typescript
const jira = createServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'basic', username: 'jdoe', password: 'hunter2' },
});
```

### OAuth 2.0

Data Center is its own authorization server: the flow runs entirely on your instance, with no `cloudId` and no
Atlassian gateway. An administrator registers your application as an **incoming application link** and hands you
a client id and secret.

```typescript
import { createServerClient } from 'jira.js';
import { generateServerAuthorizationUrl, exchangeServerAuthorizationCode } from 'jira.js';

const host = 'https://jira.your-company.com';

// 1. Send the user here.
const url = generateServerAuthorizationUrl({
  host,
  clientId: 'YOUR_CLIENT_ID',
  scopes: ['READ', 'WRITE'],
  redirectUri: 'https://your-app.example.com/callback',
  state: 'a-nonce-you-verify-on-return',
});

// 2. Exchange the code the callback carries.
const tokens = await exchangeServerAuthorizationCode({
  host,
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  code: 'CODE_FROM_THE_CALLBACK',
  redirectUri: 'https://your-app.example.com/callback',
});

// 3. Let the client refresh on its own from here.
const jira = createServerClient({
  host,
  auth: {
    type: 'oauth2Server',
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectUri: 'https://your-app.example.com/callback',
    expiresAt: Date.now() + tokens.expiresIn * 1000,
    onTokenRefresh: ({ refreshToken }) => save(refreshToken),
  },
});
```

The scopes are `READ`, `WRITE`, `ADMIN` and `SYSTEM_ADMIN`, each implying the ones before it.

`redirectUri` belongs with the refresh credentials, not only with the initial exchange: the Data Center provider
validates it on the refresh grant too, and omitting it earns an `invalid_grant` that explains nothing.

## Coming from Cloud

| | Cloud | Data Center |
| --- | --- | --- |
| Factory | `createCloudClient` | `createServerClient` |
| Import | `jira.js/cloud` | `jira.js/server` |
| API version | `/rest/api/3` | `/rest/api/2` |
| Agile | separate `createAgileClient` | in the same client |
| Rich text | Atlassian Document Format | wiki markup, as a plain string |
| User identity | `accountId` | `name` and `key` |
| Basic auth | email + API token | username + password |

Because the two surfaces describe different shapes, their models are not interchangeable. Import types from
`jira.js/server`, not from `jira.js/cloud`, and note that a handful of names — `Issue`, `Project`, `User` — exist
in both with different fields.

## A local instance

The repository carries a throwaway Data Center for its own live tests, and it is the quickest way to try
something against a real instance:

```bash
pnpm jira-dc:up       # start it, run the setup wizard, seed a project
pnpm test:live:server # run the Data Center suites against it
pnpm jira-dc:down     # stop it and delete its data
```

It runs Jira 10.3 LTS with a three-hour timebomb licence published by Atlassian for testing, and a cold start
takes a few minutes. Set `JIRA_DC_VERSION=11.3` to test against the newest release instead — remember that basic
authentication is off there, so the suites need `JIRA_SERVER_PAT`.
