import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `groups` API (`findGroups`, `getUsersFromGroup`, `createGroup`, `removeGroup`,
 * `addUserToGroup`, `removeUserFromGroup`).
 *
 * Read-only. Groups are site-wide identity, and permission schemes grant rights *to groups* — so creating one is
 * cheap but removing one is not symmetric: `removeGroup` takes a `swapGroup` parameter precisely because deleting a
 * group can strip permissions from everyone who was in it. A test suite has no business generating that risk on a
 * working tenant, so membership is only read, never written.
 *
 * What is asserted instead is the pair of addressing modes. Every endpoint here accepts either `groupname` or
 * `groupId`, and Atlassian is migrating away from the former — code written against names keeps working until a group
 * is renamed, then fails in a way that looks like the group vanished.
 */
describe('Jira Cloud — groups (live, read-only)', () => {
  let client: CloudClient;
  let sample: { name?: string; groupId?: string } | undefined;

  beforeAll(async () => {
    client = getCloudClient();

    const found = await client.groups.findGroups({ maxResults: 10 });

    sample = found.groups?.find(group => group.groupId && group.name);
  });

  it('finds groups on the site, each carrying both identifiers', async () => {
    const found = await client.groups.findGroups({ maxResults: 10 });

    expect(Array.isArray(found.groups)).toBe(true);
    expect(found.groups!.length).toBeGreaterThan(0);

    for (const group of found.groups!) {
      expect(typeof group.name).toBe('string');
      expect(group.groupId).toBeTruthy();
    }
  });

  it('narrows the search by query', async () => {
    if (!sample) return;

    const found = await client.groups.findGroups({ query: sample.name!.slice(0, 4), maxResults: 20 });

    expect(found.groups?.map(group => group.groupId)).toContain(sample.groupId);
  });

  it('matches case-insensitively when asked', async () => {
    if (!sample) return;

    const upper = await client.groups.findGroups({
      query: sample.name!.toUpperCase(),
      caseInsensitive: true,
      maxResults: 20,
    });

    expect(upper.groups?.map(group => group.groupId)).toContain(sample.groupId);
  });

  it('excludes named groups from the results', async () => {
    if (!sample) return;

    const excluded = await client.groups.findGroups({ excludeId: [sample.groupId!], maxResults: 50 });

    expect(excluded.groups?.map(group => group.groupId)).not.toContain(sample.groupId);
  });

  it('lists the members of a group by id and by name alike', async () => {
    if (!sample) return;

    const byId = await client.groups.getUsersFromGroup({ groupId: sample.groupId!, maxResults: 5 });
    const byName = await client.groups.getUsersFromGroup({ groupname: sample.name!, maxResults: 5 });

    expect(typeof byId.total).toBe('number');
    expect(byName.total).toBe(byId.total);

    for (const user of byId.values ?? []) {
      expect(user.accountId).toBeTruthy();
      expect(typeof user.active).toBe('boolean');
    }
  });

  it('excludes inactive members unless asked for them', async () => {
    if (!sample) return;

    const active = await client.groups.getUsersFromGroup({ groupId: sample.groupId!, maxResults: 50 });
    const withInactive = await client.groups.getUsersFromGroup({
      groupId: sample.groupId!,
      includeInactiveUsers: true,
      maxResults: 50,
    });

    expect(withInactive.total).toBeGreaterThanOrEqual(active.total!);
  });

  it('surfaces an unknown group as a typed NotFoundError', async () => {
    const error = await client.groups.getUsersFromGroup({ groupname: 'no-such-group-jjs' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real group', async () => {
    const error = await client.groups.removeGroup({ groupname: 'no-such-group-jjs' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
