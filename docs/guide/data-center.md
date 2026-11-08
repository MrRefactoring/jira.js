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
later**. The two releases differ by nine operations out of four hundred and forty-four; the documentation of
each says which release it arrived in, and calling one on an older instance answers 404.

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
import { createServerClient, generateServerAuthorizationUrl, exchangeServerAuthorizationCode } from 'jira.js';

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

## Development information

`jira.developmentStatus.getIssueDevelopmentStatusDetail` reads the issue's Development panel through
`GET /rest/dev-status/1.0/issue/detail`. This is an internal Jira Software API, exposed as a public SDK method.
Its availability and payload depend on the Jira version and the connected integration. Atlassian provides
[Data Center examples](https://support.atlassian.com/jira/kb/access-git-repo-commit-data-via-jira-rest-api-in-development-panel-data/)
rather than an OpenAPI specification.

```typescript
const issue = await jira.issues.getIssue({ issueIdOrKey: 'PROJ-1' });

if (!issue.id) throw new Error('The issue has no numeric ID.');

const development = await jira.developmentStatus.getIssueDevelopmentStatusDetail({
  issueId: issue.id,
  applicationType: 'stash',
  dataType: 'pullrequest',
});
```

All three parameters are required. `issueId` is the numeric ID as a string; an issue key cannot be sent in its place.
`applicationType` and `dataType` accept open strings. Values such as `stash`, `bitbucket`, `github`, `githube`,
`pullrequest`, `repository` and `branch` are passed through unchanged. Use the identifier your integration expects;
the SDK does not treat provider names as aliases.

The response models preserve integration-specific fields. An `errors` array inside HTTP 200 remains part of the
response; HTTP failures, cancellation and schema mismatches use the shared SDK behavior.

Nonempty pull request, branch and repository payloads were verified with Jira Software Data Center 10.3.27 and
Bitbucket Data Center 9.6.5 using `applicationType=stash`. In that integration, `dataType=pullrequest` returned both
pull requests and branches; the separate `branch` query returned an empty envelope. Captured responses and their
provenance are in `tests/fixtures/development-status`. GitHub, GitHub Enterprise and Bitbucket Cloud fixtures were
unavailable and remain unverified.

After `pnpm build`, verify an existing development-linked issue with:

```bash
JIRA_SERVER_DEV_ISSUE_KEY=PROJ-1 JIRA_SERVER_DEV_APPLICATION_TYPE=stash pnpm check:development-status
```

The check uses `JIRA_SERVER_BASE_URL`, `JIRA_SERVER_USERNAME` and `JIRA_SERVER_PASSWORD`. It requires nonempty pull
request and branch payloads from successful responses, which may be separate responses. Set
`JIRA_SERVER_DEV_CAPTURE_DIR` to save the responses and a verification report, including unavailable queries.
The standard live suite also checks the response envelope without requiring an integration; an empty response
does not establish pull request or branch payload coverage.

## Webhooks

Atlassian describes webhook endpoints in prose rather than a specification. `createWebhook` and the eight
operations beside it were written from the Jersey WADL a running instance serves at
`/rest/jira-webhook/1.0/application.wadl`, which describes the requests and — its `grammars` element being
empty — nothing about the bodies, and from calling each one against a live Data Center instance.

```typescript
const webhook = await jira.webhooks.createWebhook({
  name: 'issue created',
  url: 'https://example.com/hooks/jira',
  events: ['jira:issue_created'],
});

const statistics = await jira.webhooks.getWebhookStatistics({ webhookId: webhook.id });
```

They live under `/rest/jira-webhook/1.0/`, which is where Jira 10 moved them. The older
`/rest/webhooks/1.0/webhook` served Jira 9 and earlier and answers 404 on every release this client supports.

`getWebhookTransitions` and `getLatestWebhookInvocation` return `unknown`: an instance that has never
delivered a webhook answers with an empty list and a 204, so there was nothing to describe, and guessing
would have been worse than leaving the narrowing to the caller.

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
pnpm jira-dc:up       # start it and run the setup wizard
pnpm test:live:server # run the Data Center suites against it
pnpm jira-dc:down     # stop it and delete its data
```

It runs Jira 10.3 LTS and a cold start takes tens of minutes. The licence is not in the repository: take a
three-hour timebomb key from
[Atlassian's timebomb licences page](https://developer.atlassian.com/platform/marketplace/timebomb-licenses-for-testing-server-apps/)
and save it as `docker/jira-dc/timebomb-license.txt` before the first run. Set `JIRA_DC_VERSION=11.3` to test against
the newest release instead — but basic authentication is off there, and the suites have no way in, so they do not run
against it.

The default is 10.3 rather than the newest release for a reason of authentication rather than age: Jira 11.0 turns
basic authentication off and rejects `/rest/auth/1/session` as well, leaving a personal access token as the only way
in — and a token cannot be minted without first signing in through a browser, which a headless run cannot do. On 10.3
the suites bootstrap themselves.

Two environment variables in `docker/jira-dc/compose.yaml` are load-bearing if you adapt it. `ATL_DB_DRIVER` has to
be set, or the generated `dbconfig.xml` carries an empty `<driver-class>`, Jira cannot open the connection, and the
wizard asks for the database after all — with every field blank, which reads as the variables having been ignored
rather than incomplete. `ATL_DB_TYPE` has to be `postgres72`, which is Atlassian's name for any PostgreSQL, whatever
version the server actually runs. Only the database step is driven by environment at all: licence, administrator and
mail have no variables and are driven over HTTP by `scripts/lib/dcRig.ts`.
