import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, type ApiError } from '#/core';
import type { AdminClient } from '#/admin/createAdminClient';
import type { UserManagementClient } from '#/userManagement/createUserManagementClient';
import { getAdminClient, getOrgId, getUserManagementClient } from '../setup/client';
import { hasAdminEnv } from '../setup/env';

/**
 * Live suite for the user management API.
 *
 * What this suite can prove is narrower than the surface, and the reason is measured rather than assumed. Two things
 * stand in the way, and both belong to the organization rather than to the library:
 *
 * 1. **A scoped API key is refused outright.** Every operation answers `403 forbidden.insufficientScope` and names
 *    `manage:org` among the scopes it would accept — a scope the key creation flow does not offer. The thirteen
 *    `read:*:admin` scopes that reach the organization API reach nothing here.
 * 2. **Nothing on this organization is manageable.** Its one account reports `claimStatus: unmanaged`, and
 *    `getUsers` on the organization — which lists managed accounts — returns none. These operations act on accounts
 *    whose email domain the organization has claimed and verified; with no claimed domain there is no subject.
 *
 * So the suite pins the refusal and its shape, which is worth pinning: a caller who reaches for this API with the key
 * that works everywhere else gets a typed `ForbiddenError` naming the scope, not a silent empty answer. The rest
 * stands down visibly. It becomes a real suite the day the organization claims a domain and an unscoped key exists.
 */
describe.skipIf(!hasAdminEnv())('User management (live)', () => {
  let users: UserManagementClient;
  let admin: AdminClient;
  let accountId: string;

  beforeAll(async () => {
    users = getUserManagementClient();
    admin = getAdminClient();

    const orgId = await getOrgId();
    const { data } = await admin.directory.getDirectoriesForOrg({ orgId });
    const directoryId = data![0]!.directoryId!;
    const found = await admin.users.searchDirectoryUsers({ orgId, directoryId, limit: 1 });

    accountId = found.data![0]!.accountId!;
  });

  it('refuses a scoped organization key, and says which scope it wanted', async () => {
    const error = await users.manage.getManagementPermissions({ accountId }).then(
      () => undefined,
      (failure: unknown) => failure,
    );

    expect(error, 'the scoped key was accepted — the organization or the key changed').toBeDefined();
    expect(isForbiddenError(error)).toBe(true);

    const body = JSON.stringify((error as ApiError).body ?? '');

    expect(body).toContain('insufficient');
    expect(body).toContain('manage:org');
  });

  it('refuses a read of the profile on the same grounds', async () => {
    await expect(users.profile.getProfile({ accountId })).rejects.toSatisfy(isForbiddenError);
  });

  it('refuses a read of the API tokens on the same grounds', async () => {
    await expect(users.apiTokens.getApiTokens({ accountId })).rejects.toSatisfy(isForbiddenError);
  });

  it('has no managed account to act on', async () => {
    // The other half of why this suite reads rather than writes: the organization manages nobody. Pinned so that the
    // day a domain is claimed, this test fails and says the suite can be widened.
    const orgId = await getOrgId();
    const { data } = await admin.users.getUsers({ orgId });

    expect(data).toEqual([]);
  });
});
