import { beforeAll, describe, expect, it } from 'vitest';
import { isApiError, isForbiddenError, type ApiError } from '#/core';
import type { AdminClient } from '#/admin/createAdminClient';
import { getAdminClient, getOrgId } from '../setup/client';
import { hasAdminEnv } from '../setup/env';

const PAGE = 100;

const sortGroupsBy = (direction: 'asc' | 'desc') => [{ field: 'name' as const, direction }];

function decodeCursor(cursor: string): { sortBy: unknown } {
  return JSON.parse(Buffer.from(cursor, 'base64').toString('utf8')) as { sortBy: unknown };
}

/**
 * Live suite for the organization administration API.
 *
 * Read-only throughout, and not for want of coverage: every write here acts on a real organization's users, groups and
 * policies, and there is no fixture to create and throw away as the project suites do. The key the suite runs on holds
 * only the thirteen `read:` scopes, so a write would be refused rather than silently succeed.
 *
 * The whole suite stands down when `JIRA_ADMIN_API_KEY` is absent — CI has no such key, and a site token does not
 * substitute: these APIs answer 401 to one.
 */
describe.skipIf(!hasAdminEnv())('Organization administration (live)', () => {
  let admin: AdminClient;
  let orgId: string;
  let directoryId: string;

  beforeAll(async () => {
    admin = getAdminClient();
    orgId = await getOrgId();

    const { data } = await admin.directory.getDirectoriesForOrg({ orgId });

    expect(data?.length, 'the organization has no directory to address').toBeGreaterThan(0);

    directoryId = data![0]!.directoryId!;
  });

  it('reads the organization it is pointed at', async () => {
    const { data } = await admin.orgs.getOrgById({ orgId });

    expect(data?.id).toBe(orgId);
    expect(data?.type).toBe('orgs');
    expect(data?.attributes?.name).toBeTruthy();
  });

  it('lists no organizations at all, because the key is scoped to one', async () => {
    // Not a defect and not an empty tenant: a key created with scopes belongs to a single organization, and the
    // listing endpoint answers 200 with nothing while the direct read above works. Pinned so that a future empty
    // result is read as this rather than as a broken credential.
    const { data } = await admin.orgs.getOrgs();

    expect(data).toEqual([]);
  });

  it('finds a user in the directory and reads it back by id', async () => {
    const { data } = await admin.users.searchDirectoryUsers({ orgId, directoryId, limit: 5 });

    expect(data?.length).toBeGreaterThan(0);

    const [first] = data!;
    const details = await admin.users.getDirectoryUserDetails({ orgId, directoryId, accountId: first!.accountId! });

    expect(details.data?.accountId).toBe(first!.accountId);
  });

  it('reads a user’s role assignments', async () => {
    const { data } = await admin.users.searchDirectoryUsers({ orgId, directoryId, limit: 1 });
    const accountId = data![0]!.accountId!;

    await expect(admin.users.getUserRoleAssignments({ orgId, directoryId, accountId })).resolves.toBeDefined();
  });

  it('finds groups and counts them', async () => {
    const { data } = await admin.groups.searchDirectoryGroups({ orgId, directoryId, limit: 10 });

    expect(data?.length).toBeGreaterThan(0);
    expect(data![0]!.directoryId).toBe(directoryId);

    const count = await admin.groups.getGroupsCount({ orgId, directoryId });

    expect(count).toBeDefined();
  });

  it('lists policies and reads one back', async () => {
    const { data } = await admin.policies.getPolicies({ orgId });

    expect(data?.length).toBeGreaterThan(0);

    const [first] = data!;
    const one = await admin.policies.getPolicyById({ orgId, policyId: first!.id! });

    expect(one.data?.id).toBe(first!.id);
  });

  it('answers for the audit trail, empty or not', async () => {
    // A quiet organization has no events, so the assertion is on the envelope rather than on its contents.
    const events = await admin.events.getEvents({ orgId });

    expect(Array.isArray(events.data)).toBe(true);

    const actions = await admin.events.getEventActions({ orgId });

    expect(actions).toBeDefined();
  });

  it('lists the products the organization owns', async () => {
    const { data } = await admin.workspaces.queryWorkspaces({ orgId });

    expect(data?.length).toBeGreaterThan(0);
    expect(data!.every(workspace => typeof workspace.id === 'string')).toBe(true);
  });

  it('refuses what the key is not entitled to, as a typed error', async () => {
    // Last active dates are a paid feature, and the read-scoped key is refused. What matters here is that the refusal
    // arrives as `ForbiddenError` rather than as a resolved empty answer — the same failure #418 was about.
    const { data } = await admin.users.searchDirectoryUsers({ orgId, directoryId, limit: 1 });
    const accountId = data![0]!.accountId!;

    await admin.users.getUserLastActiveDates({ orgId, accountId }).then(
      () => {
        // Entitled after all — the endpoint works and there is nothing to pin.
      },
      (error: unknown) => {
        expect(isForbiddenError(error)).toBe(true);
      },
    );
  });

  it('sorts groups by name, and desc is asc reversed', async () => {
    const [asc, desc] = await Promise.all([
      admin.groups.getGroups({ orgId, directoryId, limit: PAGE, sortBy: sortGroupsBy('asc') }),
      admin.groups.getGroups({ orgId, directoryId, limit: PAGE, sortBy: sortGroupsBy('desc') }),
    ]);

    expect(asc.links?.next, 'the directory outgrew a single page; the comparison is no longer over one set').toBeFalsy();

    const ascNames = asc.data!.map(group => group.name);
    const descNames = desc.data!.map(group => group.name);

    expect(ascNames.length).toBeGreaterThan(1);
    expect([...descNames].sort()).toEqual([...ascNames].sort());
    expect(descNames).toEqual([...ascNames].reverse());
  });

  it('leaves the order alone for asc, which is what no sortBy already gives', async () => {
    const [baseline, asc] = await Promise.all([
      admin.groups.getGroups({ orgId, directoryId, limit: PAGE }),
      admin.groups.getGroups({ orgId, directoryId, limit: PAGE, sortBy: sortGroupsBy('asc') }),
    ]);

    expect(asc.data!.map(group => group.name)).toEqual(baseline.data!.map(group => group.name));
  });

  it('echoes the sortBy it parsed back in the page cursor', async () => {
    const sortBy = sortGroupsBy('desc');
    const [sorted, unsorted] = await Promise.all([
      admin.groups.getGroups({ orgId, directoryId, limit: PAGE, sortBy }),
      admin.groups.getGroups({ orgId, directoryId, limit: PAGE }),
    ]);

    expect(decodeCursor(sorted.links!.self!).sortBy).toEqual(sortBy);
    expect(decodeCursor(unsorted.links!.self!).sortBy).toBeNull();
  });

  it('refuses a second sort element rather than quietly taking the first', async () => {
    const error = await admin.groups
      .getGroups({
        orgId,
        directoryId,
        sortBy: [
          { field: 'name', direction: 'asc' },
          { field: 'name', direction: 'desc' },
        ],
      })
      .catch((e: unknown) => e);

    expect(isApiError(error)).toBe(true);
    expect((error as ApiError).status).toBe(400);
  });

  it('takes sortBy on the user listing too', async () => {
    const sortBy = [{ field: 'nick_name' as const, direction: 'desc' as const }];
    const { links } = await admin.users.getDirectoryUsers({ orgId, directoryId, limit: PAGE, sortBy });

    expect(decodeCursor(links!.self!).sortBy).toEqual(sortBy);
  });
});
