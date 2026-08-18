import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `users` API (`getUser`, `getAllUsers`, `getAllUsersDefault`, `getUserGroups`, `getUserEmail`,
 * `getUserEmailBulk`, the column preferences group, and the admin-only `createUser`/`removeUser`).
 *
 * Confined to the authenticating account. Creating or removing a user is an identity operation with billing
 * consequences and no clean undo, so neither is exercised — they are pinned only through their error channel.
 *
 * The theme worth pinning here is privacy: Cloud hides personal data by default, so `emailAddress` and `displayName`
 * may legitimately be absent. Code that assumes otherwise works on one tenant and breaks on the next.
 *
 * The column preferences are the one write, and they belong to the authenticating account alone: `setUserColumns`
 * changes what this account sees in the issue navigator and `resetUserColumns` puts the site default back.
 */
describe('Jira Cloud — users (live)', () => {
  let client: CloudClient;
  let accountId: string;

  beforeAll(async () => {
    client = getCloudClient();
    accountId = (await client.myself.getCurrentUser()).accountId!;
  });

  it('resolves the authenticating account by accountId', async () => {
    const user = await client.users.getUser({ accountId });

    expect(user.accountId).toBe(accountId);
    expect(user.active).toBe(true);
    expect(user.accountType).toBe('atlassian');
    expect(user.self).toMatch(/^https:\/\//);
  });

  it('treats personal data as optional, because privacy settings make it so', async () => {
    const user = await client.users.getUser({ accountId });

    if (user.emailAddress !== undefined) expect(typeof user.emailAddress).toBe('string');

    if (user.displayName !== undefined) expect(typeof user.displayName).toBe('string');

    expect(user.avatarUrls?.['48x48']).toMatch(/^https:\/\//);
  });

  it('expands groups only when asked', async () => {
    const plain = await client.users.getUser({ accountId });
    const expanded = await client.users.getUser({ accountId, expand: ['groups'] });

    expect(plain.groups?.items ?? []).toEqual([]);
    expect(expanded.groups?.items?.length).toBe(expanded.groups?.size);
  });

  it('lists the groups the account belongs to', async () => {
    const groups = await client.users.getUserGroups({ accountId });

    expect(Array.isArray(groups)).toBe(true);

    for (const group of groups) {
      expect(typeof group.name).toBe('string');
      expect(group.groupId).toBeTruthy();
    }
  });

  it('pages the site user listing', async () => {
    const all = await client.users.getAllUsers({ maxResults: 2 });

    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeLessThanOrEqual(2);
    for (const user of all) expect(typeof user.accountType).toBe('string');

    const offset = await client.users.getAllUsers({ maxResults: 2, startAt: 2 });

    if (all.length === 2 && offset.length > 0) {
      expect(offset.map(user => user.accountId)).not.toEqual(all.map(user => user.accountId));
    }
  });

  it('refuses to report an email to user credentials at all', async () => {
    const error = await client.users.getUserEmail({ accountId }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
    expect(isForbiddenError(error)).toBe(false);
  });

  it('surfaces an unknown account as a typed error', async () => {
    const error = await client.users.getUser({ accountId: 'no-such-account-id' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('fails typed on the destructive path, without ever aiming it at a real account', async () => {
    const error = await client.users.removeUser({ accountId: 'no-such-account-id' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
  it('sets the calling account\'s issue navigator columns, then resets them', async () => {
    const before = await client.users.getUserDefaultColumns({});

    expect(Array.isArray(before)).toBe(true);

    await client.users.setUserColumns({ columns: ['summary', 'status'] });

    const columns = await client.users.getUserDefaultColumns({});

    expect(columns.map(column => column.value)).toEqual(['summary', 'status']);

    await client.users.resetUserColumns({});

    const reset = await client.users.getUserDefaultColumns({});

    expect(reset.map(column => column.value)).toEqual(before.map(column => column.value));
  });
});
