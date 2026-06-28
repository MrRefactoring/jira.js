> 🌐 **English** · [Русский](jwt-authentication.ru.md)

# JWT authentication for Atlassian Connect apps

`jira.js` can authenticate as an **Atlassian Connect app** using a per-request JWT
signed with your app's shared secret. This is the right choice when you build an
integration that acts **as the app itself** (app-level access to a whole Jira site),
rather than on behalf of a single user.

> ⚠️ **Server-side only.** JWT auth uses your app's `sharedSecret`, a tenant credential.
> It must **never** be shipped to or used in a browser. Use Basic or OAuth 2.0 for
> browser/user contexts.

> 🛑 **Atlassian Connect is being retired — end of support Q4 2026.** As of 2026, **new**
> private Connect apps can **no longer** be installed via an app-descriptor URL; private apps
> are installed only through **Forge installation links**. **Existing** Connect app
> installations keep working for now, and JWT auth in `jira.js` remains the way to call Jira
> from them. **This guide is primarily for maintainers of existing Connect apps.** For brand-new
> integrations, prefer [Forge](https://developer.atlassian.com/platform/forge/) or OAuth 2.0.
> See Atlassian's
> [Connect end-of-support timeline](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps)
> and the [Connect→Forge migration guide](https://developer.atlassian.com/platform/adopting-forge-from-connect/connect-to-forge-migration-module/).

## When to use which auth method

| Method | Acts as | Where | Use when |
| --- | --- | --- | --- |
| Basic (email + API token) | a user | server | quick scripts, personal automation |
| OAuth 2.0 (3LO) | a user | server/browser | acting on behalf of end users |
| **JWT (Connect)** | **the app** | **server only** | site-wide app integration, no per-user binding |

## How it works

1. You publish a small **Connect app descriptor** (`atlassian-connect.json`) that declares
   `"authentication": { "type": "jwt" }`.
2. When an admin installs your app on a Jira site, Jira performs an **installation handshake**:
   it POSTs an `installed` lifecycle event to your app containing a `sharedSecret` and the
   site's `clientKey` and `baseUrl`. You store these per tenant.
3. For every outgoing REST call, `jira.js` generates a short-lived **HS256 JWT** signed with
   that `sharedSecret`. The token includes a query-string hash (`qsh`) bound to the request's
   method and URL, so the token cannot be replayed against a different endpoint.

> **Direction matters (`iss` claim).** For **outgoing** calls (app → Jira, what `jira.js`
> does), the JWT issuer `iss` is your **app key** — the `key` from your descriptor. (For the
> opposite direction, incoming requests from Jira to your app, Jira sets `iss` to the
> `clientKey`. Don't confuse the two.)

## Prerequisites

- A Jira Cloud site where you are an **administrator**
  ([create a free site](https://www.atlassian.com/software/jira/free); manage your sites at
  [admin.atlassian.com](https://admin.atlassian.com/)).
- Node.js ≥ 20 and `jira.js` ≥ 5.4.0.
- A publicly reachable **HTTPS** endpoint to host the descriptor and lifecycle callbacks.
  For local development use a tunnel such as [ngrok](https://ngrok.com/). The descriptor must
  be served on port **80, 443, or 8080**.

---

## Step 1 — Create the app descriptor

Create `atlassian-connect.json`. For a backend integration that only calls the REST API you
need very little — the `key`, an HTTPS `baseUrl`, `jwt` authentication, scopes, and the
lifecycle callbacks. Full field reference:
[Connect app descriptor](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/).

```json
{
  "key": "my-backend-integration",
  "name": "My Backend Integration",
  "description": "Server-side integration using jira.js",
  "baseUrl": "https://YOUR-PUBLIC-HTTPS-HOST",
  "vendor": { "name": "My Company", "url": "https://example.com" },
  "authentication": { "type": "jwt" },
  "scopes": ["READ", "WRITE"],
  "lifecycle": {
    "installed": "/installed",
    "uninstalled": "/uninstalled"
  },
  "apiVersion": 1
}
```

- `key` must be unique and ≤ 64 characters. **This value is your `issuer` in `jira.js`.**
- `scopes` must cover what your integration does. Available values: `NONE`, `READ`, `WRITE`,
  `DELETE`, `PROJECT_ADMIN`, `ADMIN`, `ACT_AS_USER`, `ACCESS_EMAIL_ADDRESSES` — see the
  [scopes reference](https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/).
- `baseUrl` must be HTTPS and is where Jira sends lifecycle callbacks.

## Step 2 — Implement the lifecycle endpoints

Jira POSTs JSON to your `installed` URL during the handshake. The payload includes:

```json
{
  "key": "my-backend-integration",
  "clientKey": "unique-tenant-id",
  "sharedSecret": "DO-NOT-LOG-OR-EXPOSE-THIS",
  "baseUrl": "https://your-domain.atlassian.net",
  "displayUrl": "https://your-domain.atlassian.net",
  "productType": "jira",
  "eventType": "installed"
}
```

Store `clientKey`, `sharedSecret`, and `baseUrl` **per tenant** (e.g. in a database).
`sharedSecret` is the credential `jira.js` will sign tokens with; treat it like a password.

Minimal Express example:

```ts
import express from 'express';

const app = express();
app.use(express.json());

// Persist these securely (encrypted at rest). In-memory map shown for brevity only.
const tenants = new Map<string, { sharedSecret: string; baseUrl: string }>();

app.post('/installed', (req, res) => {
  const { clientKey, sharedSecret, baseUrl } = req.body;
  tenants.set(clientKey, { sharedSecret, baseUrl });
  res.sendStatus(204);
});

app.post('/uninstalled', (req, res) => {
  tenants.delete(req.body.clientKey);
  res.sendStatus(204);
});

app.listen(8080);
```

> 🔐 **Recommended:** verify the JWT on the `installed` callback before trusting it. First
> installs are signed asymmetrically — validate against Atlassian's public keys
> (`https://connect-install-keys.atlassian.com`). See the Atlassian docs on
> [security for Connect apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/).

## Step 3 — Host the descriptor and endpoints over HTTPS

Serve `atlassian-connect.json` so it is reachable at `https://YOUR-HOST/atlassian-connect.json`,
and make sure `/installed` and `/uninstalled` are reachable on the same `baseUrl`.

For local development:

```bash
ngrok http 8080
```

Copy the generated `https://….ngrok-free.app` URL into the descriptor's `baseUrl` and restart.

## Step 4 — Install the app into your Jira site

> 🛑 **The classic descriptor-URL install has been removed.** Atlassian's app management has
> moved from the old `…/plugins/servlet/upm` page to **Administration → Connected apps**, and
> the **Developer mode** there now states: *"Development Mode no longer supports installing
> private apps using an app descriptor URL."* New private apps must be distributed via **Forge
> installation links** instead. The steps below remain accurate **only for Connect apps that
> were already installed** (they keep running and still issue a `sharedSecret`).

**If your Connect app is already installed** (the common case for this guide), you already have
its `clientKey`/`sharedSecret` from the original `installed` handshake — skip to Step 5. To find
the current admin location of your installed apps:

1. Go to [admin.atlassian.com](https://admin.atlassian.com/) → select your organization → your
   **site** → **Connected apps** (or in Jira: **Settings (⚙) → Apps → Manage your apps**, which
   now redirects to Administration → Connected apps).
2. The **Installed apps** tab lists installed apps; the **Settings** tab holds **Developer mode**.

**For a brand-new private app**, the descriptor-URL flow is gone — build on Forge and share a
[Forge installation link](https://developer.atlassian.com/platform/forge/), or migrate an
existing Connect app via the
[Connect→Forge migration](https://developer.atlassian.com/platform/adopting-forge-from-connect/connect-to-forge-migration-module/).
Forge apps don't use this Connect JWT scheme.

## Step 5 — Configure jira.js

Use the stored values for the tenant you want to call:

```ts
import { Version3Client } from 'jira.js';

// Look up the tenant you installed on:
const { sharedSecret, baseUrl } = tenants.get(clientKey)!;

const client = new Version3Client({
  host: baseUrl, // the tenant's site URL from the installed payload
  authentication: {
    jwt: {
      issuer: 'my-backend-integration', // the `key` from atlassian-connect.json
      secret: sharedSecret,             // sharedSecret from the installed handshake
      expiryTimeSeconds: 180,           // optional, defaults to 180 (3 minutes)
    },
  },
});
```

For a **multi-tenant** app, create a client per request using the `host`/`secret` looked up
by `clientKey` — the `issuer` (your app key) stays the same across tenants.

## Step 6 — Make a request and verify

```ts
const me = await client.myself.getCurrentUser();
console.log(me.displayName); // a successful 200 means JWT auth works
```

A fresh JWT is generated for every request, with a `qsh` bound to that request's method and URL.

## Troubleshooting

- **401 Unauthorized**
  - Wrong `secret` — must be the exact `sharedSecret` from `installed`, not a user API token.
  - Wrong `issuer` — must be the descriptor `key`, not the `clientKey`.
  - Clock skew — the server time must be accurate (token `iat`/`exp` are time-based). If you
    see intermittent failures, increase `expiryTimeSeconds`.
  - `qsh` mismatch — make sure `host` matches the tenant `baseUrl` and you didn't alter the
    request URL/query after the token was generated.
- **403 Forbidden** — your descriptor `scopes` don't grant the operation. Add the scope and
  reinstall the app.
- **App reinstalled** — Jira issues a **new** `sharedSecret` on reinstall. Always read the
  latest stored secret.

## Security checklist

- Never expose `sharedSecret` to a browser or commit it to source control.
- Store secrets encrypted at rest, keyed by `clientKey`.
- Verify lifecycle callbacks (asymmetric JWT) before trusting an `installed` payload.
- Rotate/replace the stored secret whenever a reinstall delivers a new one.

## Reference links

Where to configure each piece:

| Topic | Link |
| --- | --- |
| Connect overview & install flow | [Getting started with Connect](https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/) |
| App descriptor fields | [Connect app descriptor](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/) |
| Scopes | [Scopes for Connect apps](https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/) |
| Lifecycle & JWT validation | [Security for Connect apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/) |
| How JWT / `qsh` is built | [Understanding JWT for Connect apps](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/) |
| Enable development mode | [Things to know while enabling development mode](https://support.atlassian.com/jira/kb/things-to-know-while-enabling-development-mode-in-the-jira-cloud/) |
| Manage installed apps | Administration → **Connected apps** (the old `…/plugins/servlet/upm` now redirects here) |
| Manage your Atlassian sites | [admin.atlassian.com](https://admin.atlassian.com/) |
| ⚠️ Connect end of support (Q4 2026) | [Announcing Connect end of support](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps) |
| Migrate Connect → Forge | [Connect→Forge migration](https://developer.atlassian.com/platform/adopting-forge-from-connect/connect-to-forge-migration-module/) |
