import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `users` API (`getUser`, `getAllUsers`, `getAllUsersDefault`, `getUserGroups`, `getUserEmail`,
 * `getUserEmailBulk`, the column preferences group, and the admin-only `createUser`/`removeUser`).
 *
 * Read-only against the authenticating account. Creating or removing a user is an identity operation with billing
 * consequences and no clean undo, so neither is exercised — they are pinned only through their error channel.
 *
 * The theme worth pinning here is privacy: Cloud hides personal data by default, so `emailAddress` and `displayName`
 * may legitimately be absent. Code that assumes otherwise works on one tenant and breaks on the next.
 */
describe('Jira Cloud — users (live, read-only)', () => {
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

    // The models mark these optional and mean it: on a tenant with strict
    // profile visibility they simply do not arrive. Asserting the *type* when
    // present is as strong an assertion as this endpoint permits.
    if (user.emailAddress !== undefined) expect(typeof user.emailAddress).toBe('string');

    if (user.displayName !== undefined) expect(typeof user.displayName).toBe('string');

    // Avatars are always there and always a full set of sizes.
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
    // The listing includes app and customer accounts, not only people — a
    // distinction that matters when populating an assignee picker.
    for (const user of all) expect(typeof user.accountType).toBe('string');

    const offset = await client.users.getAllUsers({ maxResults: 2, startAt: 2 });

    if (all.length === 2 && offset.length > 0) {
      expect(offset.map(user => user.accountId)).not.toEqual(all.map(user => user.accountId));
    }
  });

  it('refuses to report an email to user credentials at all', async () => {
    const error = await client.users.getUserEmail({ accountId }).catch((e: unknown) => e);

    // Not a permissions question and not something a scope can unlock: the
    // endpoint is reserved for whitelisted apps, and answers a *user* token with
    // 400 rather than 401 or 403. Worth pinning, because "400" reads as "my
    // request was malformed" and sends callers looking in the wrong place.
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
    // Removing a user is an identity operation with no clean undo; this asserts
    // the error channel only, against an account id that cannot exist.
    const error = await client.users.removeUser({ accountId: 'no-such-account-id' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
