# Organization Administration

Three APIs that sit above your sites rather than inside one. They manage the organization: its directories, the people
in them, the groups they belong to, what those people may reach, and the audit trail of it all.

| | factory | operations | what it does |
|---|---|---|---|
| `jira.js/admin` | `createAdminClient` | 47 | organizations, directories, users, groups, domains, policies, events, workspaces |
| `jira.js/userManagement` | `createUserManagementClient` | 10 | one managed account: its profile, email, API tokens, and whether it is active |
| `jira.js/userProvisioning` | `createUserProvisioningClient` | 24 | SCIM — provisioning users and groups from an identity provider |

## The credential

All three take a bearer token and no other shape of credential, and the config type says so: a site API token answers
`401` here, and so does OAuth 2.0 (3LO), whose scopes a user grants for a site rather than an organization granting
them for itself. Getting it wrong is a compile error rather than a 401 at run time.

Which token, though, differs. `admin` and `userManagement` take an **organization API key**, created under Settings in
[admin.atlassian.com](https://admin.atlassian.com). `userProvisioning` takes the **directory's own API key**, issued
when the SCIM directory was connected.

```typescript
import { createAdminClient } from 'jira.js';

const admin = createAdminClient({ auth: { type: 'bearer', token: process.env.ATLASSIAN_ORG_API_KEY! } });

const orgs = await admin.orgs.getOrgs();
```

There is no `host` to give. These APIs answer on `https://api.atlassian.com` and nowhere else, so the field is optional
and defaults there; it exists for a proxy.

## The organization API

Everything is addressed to an `orgId`, which names the organization rather than a site — several sites can share one.
`getOrgs` returns the ones your key can reach, and `getTenantContext` resolves it from a site you already have a client
for:

```typescript
import { createClient, getTenantContext } from 'jira.js/core';

const { orgId } = await getTenantContext(createClient({ host, auth }));
```

The users and groups operations work on a **directory** rather than on the organization directly, and `directoryId`
accepts `-` to mean every directory the key may manage.

```typescript
const users = await admin.users.searchDirectoryUsers({ orgId, directoryId: '-', limit: 50 });

await admin.groups.addUserToGroup({ orgId, directoryId, groupId, accountId });
```

Two pairs of operations look alike and are not. `grantUserAccess` and `revokeUserAccess` control access to a *product*.
`assignOrganizationRole` and `revokeOrganizationRole` control an organization-wide role such as organization admin. The
document calls both "roles"; these names do not.

## Managing one account

`createUserManagementClient` acts on a single managed account — one whose email domain the organization has claimed.
Everything is addressed by `accountId`.

```typescript
const users = createUserManagementClient({ auth });

await users.profile.updateProfile({ accountId, nickname: 'Sam' });
await users.lifecycle.deactivateUser({ accountId });
```

`getManagementPermissions` is worth calling first: it answers what this key may actually change on that account, and
the answer depends on whether the domain is claimed and the account is managed.

Deletion is staged. `deleteAccount` starts a grace period, `cancelAccountDeletion` stops it, and only after the period
does anything become irreversible.

## Provisioning from an identity provider

`createUserProvisioningClient` speaks SCIM 2.0 against a directory that your identity provider is wired into. This is
the API Okta, Entra ID or OneLogin call for you; you would use it directly to reconcile, audit or repair what they did.

```typescript
const scim = createUserProvisioningClient({ auth: { type: 'bearer', token: directoryApiKey } });

const page = await scim.users.getUsers({ directoryId, filter: 'userName eq "sam@example.com"' });
```

Its credential is the **directory's** API key, taken from the SCIM configuration in your identity provider settings —
not the organization key the other two use.

SCIM distinguishes `PUT` from `PATCH` and so do the names: `replaceUser` sends a whole resource and drops what you
leave out, `patchUser` sends a list of operations. Reach for `patchUser` unless you mean to replace.

Four operations sit outside SCIM proper, under `scimLinks`: they read and break the link between an Atlassian account
and its provisioning record, which is what you need when a user has been provisioned twice or into the wrong
directory.

## What this does not cover

A SCIM directory requires Atlassian Guard. Without it the `userProvisioning` surface has nothing to talk to, and its
operations answer `403` or `404` rather than failing in a way that explains itself.
