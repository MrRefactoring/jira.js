import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `projectRoles` API (`getProjectRoles`, `getProjectRole`, `getProjectRoleDetails`,
 * `getAllProjectRoles`, `getProjectRoleById`, and the admin-only create/update/delete group).
 *
 * Read-only. Roles are the layer between a permission scheme and a person: the scheme grants a permission to a role,
 * and role membership is per-project. That indirection is exactly what makes this suite worth having — the live
 * credentials reach this project's issues *because* the account sits in a role here, and this file is what makes that
 * chain visible instead of folklore.
 *
 * Creating or deleting a role is site-wide configuration, so neither is exercised.
 */
describe('Jira Cloud — projectRoles (live, read-only)', () => {
  let client: CloudClient;
  let accountId: string;

  beforeAll(async () => {
    client = getCloudClient();
    accountId = (await client.myself.getCurrentUser()).accountId!;
  });

  it('lists the roles available in the test project as name-to-URL pairs', async () => {
    const roles = await client.projectRoles.getProjectRoles({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(typeof roles).toBe('object');
    expect(Object.keys(roles).length).toBeGreaterThan(0);
    expect(Object.keys(roles)).toContain('Administrators');

    for (const url of Object.values(roles)) expect(url).toMatch(/^https:\/\/.*\/role\/\d+$/);
  });

  it('resolves a role by the id embedded in that URL', async () => {
    const roles = await client.projectRoles.getProjectRoles({ projectIdOrKey: TEST_PROJECT_KEY });
    const id = Number(roles.Administrators!.match(/\/role\/(\d+)$/)![1]);

    const role = await client.projectRoles.getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id });

    expect(role.name).toBe('Administrators');
    expect(role.id).toBe(id);
    expect(Array.isArray(role.actors)).toBe(true);
  });

  it('shows the account holding the role that grants it access here', async () => {
    const roles = await client.projectRoles.getProjectRoles({ projectIdOrKey: TEST_PROJECT_KEY });
    const id = Number(roles.Administrators!.match(/\/role\/(\d+)$/)![1]);

    const role = await client.projectRoles.getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id });
    const actors = role.actors ?? [];

    expect(actors.length).toBeGreaterThan(0);
    expect(actors.some(actor => actor.actorUser?.accountId === accountId)).toBe(true);
  });

  it('describes every role with its actors in one call', async () => {
    const details = await client.projectRoles.getProjectRoleDetails({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(details.length).toBeGreaterThan(0);

    for (const role of details) {
      expect(typeof role.name).toBe('string');
      expect(typeof role.id).toBe('number');
      if (role.admin !== undefined) expect(typeof role.admin).toBe('boolean');
    }
  });

  it('narrows the details to roles the caller is actually in', async () => {
    const all = await client.projectRoles.getProjectRoleDetails({ projectIdOrKey: TEST_PROJECT_KEY });
    const mine = await client.projectRoles.getProjectRoleDetails({
      projectIdOrKey: TEST_PROJECT_KEY,
      currentMember: true,
    });

    expect(mine.length).toBeGreaterThan(0);
    expect(mine.length).toBeLessThanOrEqual(all.length);
    expect(mine.map(role => role.name)).toContain('Administrators');
  });

  it('lists the site role catalogue for an admin, or fails typed', async () => {
    const result = await client.projectRoles.getAllProjectRoles().catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result)).toBe(true);

      return;
    }

    const roles = result as Awaited<ReturnType<typeof client.projectRoles.getAllProjectRoles>>;

    expect(roles.map(role => role.name)).toContain('Administrators');
  });

  it('surfaces an unknown role id as a typed error', async () => {
    const error = await client.projectRoles
      .getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || (error as { status?: number }).status === 400).toBe(true);
  });

  it('surfaces an unknown project as a typed NotFoundError', async () => {
    const error = await client.projectRoles
      .getProjectRoles({ projectIdOrKey: 'NOSUCHPROJECT' })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
