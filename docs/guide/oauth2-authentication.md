# OAuth 2.0 (3LO) authentication

`jira.js` supports the full Atlassian **OAuth 2.0 (3LO)** authorization-code flow: it ships
stateless helpers to drive the browser consent flow, and an auto-refreshing client that keeps
the access token fresh, transparently handles the **rotating refresh token**, and resolves the
`cloudId` so requests go through the Atlassian API gateway.

> ⚠️ **`clientSecret` and refresh are server-side only.** Never ship the client secret or
> refresh token to a browser. The simple `{ accessToken }` mode (no refresh) is the only part
> safe for a browser, and even then the token is a user credential.

> 🧪 **Want to try it right now?** The repo ships a runnable playground at
> [`playground/oauth2/`](https://github.com/MrRefactoring/jira.js/tree/master/playground/oauth2): fill in `clientId`/`clientSecret`, run `npm start`,
> and it drives the whole browser flow and prints the Jira response for you.

## When to use which auth method

| Method | Acts as | Where | Use when |
| --- | --- | --- | --- |
| Basic (email + API token) | a user | server | quick scripts, personal automation |
| **OAuth 2.0 (3LO)** | **a user** | **server (refresh) / browser (static token)** | acting on behalf of end users; multi-user apps |
| JWT (Connect) | the app | server only | existing Atlassian Connect app installations |

## How it works

1. You redirect the user to Atlassian's consent screen (`generateAuthorizationUrl`). Include
   `offline_access` in the scopes to receive a **refresh token**.
2. Atlassian redirects back to your callback with a one-time `code`. You exchange it for tokens
   (`exchangeAuthorizationCode`) → `accessToken`, `refreshToken`, `expiresIn`.
3. You create a `jira.js` client with those tokens plus your client id/secret. From then on the
   client:
   - **auto-refreshes** the access token shortly before it expires and again if a request returns
     `401`;
   - **rotates** the refresh token — Atlassian returns a new refresh token on every refresh and
     invalidates the old one — and calls your `onTokenRefresh` so you can persist it;
   - **resolves the `cloudId`** from `accessible-resources` and routes requests through
     `https://api.atlassian.com/ex/jira/{cloudId}` (3LO tokens do **not** work against
     `your-domain.atlassian.net`).

## Prerequisites

- An OAuth 2.0 (3LO) app in the [developer console](https://developer.atlassian.com/console/myapps/).
- Node.js ≥ 20 and `jira.js` ≥ 5.4.0.
- A server endpoint to receive the OAuth callback (the redirect URL you register below).

---

## Step 1 — Create the OAuth 2.0 (3LO) app

In the [developer console](https://developer.atlassian.com/console/myapps/):

1. **Create** → **OAuth 2.0 integration**. Give it a name, pick an **Access type**
   (**Resource-level** restricts the token to the one site the user selects at consent;
   **Account-level** grants every site in the account), accept the developer terms, and click **Create**.
2. Under **Permissions**, add the **Jira API** → **Configure**. On the **Classic scopes** tab click
   **Edit Scopes** and select the scopes you need (e.g. `read:jira-user`, `read:jira-work`,
   `write:jira-work`), then save. To get a refresh token you must also request `offline_access` — that
   one is added via the authorization URL (see Step 2), **not** here.
3. Under **Authorization**, set the **Callback URL** to your server's redirect endpoint,
   e.g. `https://app.example.com/oauth/callback`.
4. Under **Settings**, copy the **Client ID** and **Secret**.

> With a **Resource-level** app the consent screen shows a **Choose a site** picker — the user must
> select a site before **Accept** is enabled. The granted token then reaches only that site (which is
> what `getAccessibleResources` / the auto-`cloudId` resolution returns).

## Step 2 — Redirect the user to consent

Generate the authorization URL and redirect the user. Always pass a random `state` and verify it
on the callback (CSRF protection). Include `offline_access` to receive a refresh token.

```ts
import express from 'express';
import { generateAuthorizationUrl } from 'jira.js';

const app = express();

app.get('/oauth/login', (req, res) => {
  const state = crypto.randomUUID();
  // persist `state` against the user session to verify it on callback

  const url = generateAuthorizationUrl({
    clientId: process.env.OAUTH_CLIENT_ID!,
    scopes: ['read:jira-work', 'write:jira-work', 'offline_access'],
    redirectUri: 'https://app.example.com/oauth/callback',
    state,
  });

  res.redirect(url);
});
```

## Step 3 — Handle the callback and store the tokens

```ts
import { exchangeAuthorizationCode } from 'jira.js';

app.get('/oauth/callback', async (req, res) => {
  const { code, state } = req.query as { code: string; state: string };
  // verify `state` matches the one you stored, then:

  const tokens = await exchangeAuthorizationCode({
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    code,
    redirectUri: 'https://app.example.com/oauth/callback',
  });

  await saveTokens(req.user.id, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken, // present because we requested offline_access
    expiresAt: Date.now() + tokens.expiresIn * 1000,
  });

  res.redirect('/');
});
```

## Step 4 — Create the client with auto-refresh + auto-cloudId

Pass the stored tokens plus your client id/secret. With no `host`, the client resolves the
`cloudId` automatically; pass `siteUrl` or `cloudId` to pin a specific site (recommended for
multi-site users). `onTokenRefresh` is called after every refresh — persist the rotated values.

```ts
import { Version3Client } from 'jira.js';

const stored = await loadTokens(userId);

const client = new Version3Client({
  // no `host`: cloudId is resolved via accessible-resources; or set `siteUrl`/`cloudId` below
  authentication: {
    oauth2: {
      accessToken: stored.accessToken,
      refreshToken: stored.refreshToken,
      clientId: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
      expiresAt: stored.expiresAt, // epoch ms; lets the client refresh proactively
      // siteUrl: 'https://your-domain.atlassian.net', // optional: disambiguate the site
      // cloudId: 'xxxxxxxx-....',                      // optional: skip the accessible-resources lookup
      onTokenRefresh: async ({ accessToken, refreshToken, expiresAt }) => {
        // CRITICAL: persist the rotated tokens; the previous refresh token is now invalid
        await saveTokens(userId, { accessToken, refreshToken, expiresAt });
      },
    },
  },
});
```

## Step 5 — Make requests

```ts
const me = await client.myself.getCurrentUser();
console.log(me.displayName); // a 200 means OAuth 2.0 works
```

Each request gets a valid bearer token (refreshed if needed) and is routed to
`https://api.atlassian.com/ex/jira/{cloudId}`.

## Rotating refresh tokens (must read)

Atlassian uses **rotating** refresh tokens:

- Every refresh returns a **new** refresh token and **invalidates** the one you used.
- `jira.js` surfaces the new token via `onTokenRefresh` — you **must** persist it, or the next
  process start will use a dead token and fail.
- The refresh token has a **90-day inactivity** expiry that resets on each use, and a **10-minute
  reuse leeway** that absorbs transient concurrency.

`jira.js` collapses concurrent refreshes into a single network call (single-flight), so a burst
of requests rotates the token exactly once.

## Finding the cloudId yourself (optional)

If you prefer to resolve and store the cloudId out of band:

```ts
import { getAccessibleResources } from 'jira.js';

const resources = await getAccessibleResources(accessToken);
// resources[].id is the cloudId; match resources[].url to your site
```

## Refreshing tokens manually (optional)

The client refreshes automatically, but the helper is exported if you need it (e.g. a background
job). Remember to persist the rotated `refreshToken`.

```ts
import { refreshOAuth2Token } from 'jira.js';

const next = await refreshOAuth2Token({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  refreshToken: stored.refreshToken,
});
await saveTokens(userId, {
  accessToken: next.accessToken,
  refreshToken: next.refreshToken,
  expiresAt: Date.now() + next.expiresIn * 1000,
});
```

## Troubleshooting

- **No `refreshToken` returned** — you didn't request `offline_access` in the scopes. Add it and
  re-consent.
- **401 after a refresh** — the client secret is wrong, or the grant was revoked / the refresh
  token already rotated (lost a persisted update). Re-run the consent flow.
- **`Multiple accessible Jira resources found`** — the token can reach more than one site. Pass
  `siteUrl` or `cloudId`.
- **Requests to `your-domain.atlassian.net` fail with 401** — 3LO tokens only work through the
  gateway. Let the client route automatically (omit `host`) or set `cloudId`/`siteUrl`.
- **`invalid_grant` on refresh** — the refresh token is expired (90-day inactivity) or was not
  the latest rotated value. Re-authorize.

## Security checklist

- Never expose `clientSecret` or refresh tokens to a browser or commit them to source control.
- Persist the rotated tokens **atomically** inside `onTokenRefresh` (last write wins).
- Store tokens encrypted at rest, keyed per user.
- Always validate the `state` parameter on the callback.

## Reference links

| Topic | Link |
| --- | --- |
| OAuth 2.0 (3LO) apps | [OAuth 2.0 (3LO) apps](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) |
| Developer console (create app) | [developer.atlassian.com/console/myapps](https://developer.atlassian.com/console/myapps/) |
| Scopes | [OAuth 2.0 scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3lo-and-forge-apps/) |
| Accessible resources / cloudId | [Get accessible resources](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#3-1-get-the-cloudid-for-your-jira-site) |
