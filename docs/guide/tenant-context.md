# Tenant Context

A site has three names, and which one an API wants depends on the API.

| | what it addresses | who asks for it |
|---|---|---|
| `hostName` | the site URL, without its scheme | you, when configuring a client |
| `cloudId` | the site itself | `api.atlassian.com/ex/jira/{cloudId}`, Connect and Forge apps |
| `orgId` | the organization the site belongs to | the [Teams API](./teams) |

The one you are least likely to have is `orgId`, because it names something above your site rather than your site:
several sites can share one organization. Atlassian publishes no REST endpoint for any of the three. `getTenantContext`
asks the GraphQL gateway, which is the documented way to ask.

```typescript
import { createClient, getTenantContext } from 'jira.js/core';

const client = createClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'you@example.com', apiToken: 'YOUR_API_TOKEN' },
});

const { cloudId, orgId, hostName } = await getTenantContext(client);
```

It takes the client you already built, so the call inherits its proxy, its retry policy and the custom `fetch` you gave
it. A configuration object works too, if you have no client yet:

```typescript
const { orgId } = await getTenantContext({ host, auth });
```

None of the three changes over the life of a site. Resolve once at start-up and keep the answer — there is nothing to
gain from asking again on every request.

## Where it does not work

**Under OAuth 2.0 (3LO).** The gateway answers on your site's own host, and a 3LO client has no fixed host: it derives
one per request from the resources the token can reach. Rather than send somewhere arbitrary, `getTenantContext` throws
a `ConfigError`. Under 3LO you already hold the `cloudId` — it is what the client routes on — and `orgId` is not
reachable this way at all.

**On Data Center.** A self-hosted instance is not part of an Atlassian organization and serves no gateway. The call
answers 404 there.

## Handling failure

The gateway reports its problems in the body of a `200`, so this function reads them and throws rather than handing
back an empty answer:

```typescript
import { isConfigError, isNotFoundError, isApiError } from 'jira.js/core';

try {
  const { orgId } = await getTenantContext(client);
} catch (error) {
  if (isConfigError(error)) {
    // No host to ask about — an OAuth 2.0 client, or one written by hand.
  } else if (isNotFoundError(error)) {
    // Atlassian does not know this site.
  } else if (isApiError(error)) {
    // The gateway refused; `error.status` carries the status it reported, not the 200 it answered with.
  }
}
```
