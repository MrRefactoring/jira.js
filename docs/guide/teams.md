# Teams

Atlassian Teams are groups of people that exist across products, at the level of your organization rather than any one
site. `createTeamsClient` covers the [Teams REST API](https://developer.atlassian.com/platform/teams/rest/v1/) —
fifteen operations across teams, their members, and links to an external directory.

```typescript
import { createClient, getTenantContext } from 'jira.js/core';
import { createTeamsClient } from 'jira.js';

const host = 'https://your-domain.atlassian.net';
const auth = { type: 'basic', email: 'you@example.com', apiToken: 'YOUR_API_TOKEN' } as const;

const { orgId } = await getTenantContext(createClient({ host, auth }));
const teams = createTeamsClient({ host, auth });

const page = await teams.teams.queryTeams({ orgId });
```

## Authentication

An API token or a bearer token. **OAuth 2.0 is not supported by the API itself** — Atlassian's documentation states
that Forge and OAuth 2.0 apps cannot reach these resources — so the config type does not accept it, and the mistake is
a compile error rather than a puzzling 401.

## The organization id

Every operation but one is addressed to an organization, so `orgId` is a parameter on the call rather than a field on
the client. That is deliberate: an account can administer several organizations, and one client reaches all of them.

`orgId` does not change. Resolve it once with [`getTenantContext`](./tenant-context) and keep it in configuration, or
read it out of the URL when you open your organization at `admin.atlassian.com/o/{orgId}`.

## Teams

```typescript
const team = await teams.teams.createTeam({
  orgId,
  displayName: 'Platform',
  description: 'Owns the shared services.',
  teamType: 'MEMBER_INVITE',
});

await teams.teams.updateTeam({ orgId, teamId: team.teamId, description: 'Owns the shared services and the gateway.' });
await teams.teams.getTeam({ orgId, teamId: team.teamId });
```

`teamType` decides who may join: `OPEN` for anyone in the organization, `MEMBER_INVITE` for invitation only,
`EXTERNAL` for a team mirrored from another directory, `ORG_ADMIN_MANAGED` for one only an administrator changes.

Archiving is a bulk operation, and so is its reverse:

```typescript
await teams.teams.archiveTeams({ orgId, teamIds: [team.teamId] });
await teams.teams.unarchiveTeams({ orgId, teamIds: [team.teamId] });
```

A deleted team is not the same as a missing one. `deleteTeam` succeeds with no body, and reading the team afterwards
answers **410**, not 404 — the id stays known and reports itself as gone. `restoreTeam` brings one back.

`queryTeams` pages with a cursor rather than a start index:

```typescript
let cursor: string | null | undefined;

do {
  const page = await teams.teams.queryTeams({ orgId, size: 100, cursor: cursor ?? undefined });

  for (const team of page.entities) console.log(team.displayName);

  cursor = page.cursor;
} while (cursor);
```

## Members

Membership is read through a `POST`, because the request carries a page payload rather than query parameters:

```typescript
const members = await teams.teamMembers.fetchMembers({ orgId, teamId, first: 50 });

for (const member of members.results) console.log(member.accountId);

const more = members.pageInfo.hasNextPage;
```

Adding and removing are bulk operations that report per-member failures rather than refusing the whole call, so check
the `errors` in the response as well as catching one:

```typescript
const result = await teams.teamMembers.addMembers({
  orgId,
  teamId,
  members: [{ accountId: '5b6d7f20e6dba529eefdbad9' }],
});
```

## External teams

Where a team is mirrored from a directory outside Atlassian, `externalTeams` links the two and unlinks them again.

```typescript
await teams.externalTeams.createExternalLinkedTeam({
  orgId,
  description: 'Mirrored from the corporate directory.',
  externalReference: { id: 'group-42', source: 'ATLASSIAN_GROUP' },
});
```

The team's name comes from the source rather than from the call, which is why there is no `displayName` here.
`linkTeamToExternalSource` attaches a source to a team that already exists, and `unlinkTeamsFromExternalSource`
detaches several at once.

On a team that was never linked, `externalReference` comes back `null`. The specification declares it as an object on
two of the three schemas that carry it; the types here say `null` on all three, which is what the API actually sends.
