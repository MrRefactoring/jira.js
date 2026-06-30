> 🌐 **English** · [Русский](README.ru.md)

# OAuth 2.0 (3LO) playground

A self-contained mini-project that runs the **full Atlassian OAuth 2.0 (3LO) flow** with `jira.js`
and prints the Jira response. You fill in a minimal config (`clientId` / `clientSecret` / `scopes`),
run it, and the script opens the browser for consent, catches the redirect, exchanges the code for
tokens, **resolves the cloudId**, and calls `GET /myself`.

It exercises the whole public OAuth API: `generateAuthorizationUrl`, `exchangeAuthorizationCode`,
`getAccessibleResources`, automatic cloudId resolution, and token auto-refresh (`onTokenRefresh`).

> 🔒 `clientSecret` and refresh are server-side concerns. `config.ts` is in `.gitignore`; don't commit secrets.

## What you'll need

- Node.js ≥ 20.
- An OAuth 2.0 (3LO) app in the [developer console](https://developer.atlassian.com/console/myapps/).
  Create it like this:
  1. **Create → OAuth 2.0 integration**. Give it a name, pick **Access type → Resource-level**
     (the token is restricted to the site you select at consent), accept the developer terms, and click **Create**.
  2. **Permissions → Jira API → Add → Configure**. On the **Classic scopes** tab click **Edit Scopes**,
     check **View user profiles** (`read:jira-user`) and save. You do **not** need to add `offline_access`
     here — it is requested via the authorization URL automatically.
  3. **Authorization → Add**. In **Callback URLs** enter `http://localhost:3000/callback` and save.
  4. **Settings** → copy the **Client ID** and **Secret** (you'll need them for `config.ts`).

  For a full walkthrough of the whole flow, see
  [`../../guides/oauth2-authentication.md`](../../guides/oauth2-authentication.md).

## Running

```bash
# 1. From the repository ROOT, build the library (the playground links against the local build):
cd ../..
pnpm install
pnpm build:src

# 2. Install the playground dependencies:
cd playground/oauth2
npm install

# 3. Fill in the config:
cp src/config.example.ts src/config.ts
#   → enter clientId and clientSecret (scopes/port can stay as defaults)

# 4. Run:
npm start
```

The browser opens with the Atlassian consent screen. Because the app is **Resource-level**, first
pick a site from the **"Choose a site"** list (e.g. `your-domain`) — **Accept** is disabled until you
do — then click **Accept**. The tab returns to `http://localhost:3000/callback`, and the terminal
shows the accessible resources (with `cloudId`) and the result of `GET /myself` (displayName,
accountId + full JSON).

## What the script shows

- **Auto cloudId resolution.** The client is created **without `host`** — `jira.js` finds the cloudId
  via `accessible-resources` and routes requests through `https://api.atlassian.com/ex/jira/{cloudId}`.
- **Auto-refresh.** With `offline_access` you get a refresh token; `onTokenRefresh` is called on every
  refresh (Atlassian rotates the refresh token — a real app must persist it).

## Configuration

Everything lives in `src/config.ts`:

| Field | Purpose |
| --- | --- |
| `clientId` / `clientSecret` | from the developer console |
| `scopes` | requested scopes; `offline_access` is needed for the refresh token |
| `port` | callback server port → `redirect_uri http://localhost:<port>/callback` (must match the one registered in the console) |

## Lifting this project out

The folder is self-contained — you can copy it anywhere. The only difference from a regular project is
that the dependency points at this repository's local build:

```jsonc
// now (inside the repository):
"jira.js": "file:../.."
// when moved out — use a published version:
"jira.js": "^5.4.0"
```
