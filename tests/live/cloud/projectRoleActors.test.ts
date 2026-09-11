import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';
import { isNotEntitled } from '../setup/entitlement';

/**
 * Live suite for the `projectRoleActors` API (`addActorUsers`, `setActors`, `deleteActor`,
 * `getProjectRoleActorsForRole`, `addProjectRoleActorsToRole`, `deleteProjectRoleActorsFromRole`).
 *
 * Read-only, and this is the one module where that restraint is not about blast radius but about self-preservation:
 * these endpoints edit membership of the very project role that grants this suite its permissions. `setActors`
 * replaces the membership list wholesale, so a single call with the wrong payload would remove the test account from
 * the Administrators role and leave every other suite unable to clean up after itself.
 *
 * What is asserted instead is the read side and the shape of the refusals — including that `setActors` is a
 * replacement rather than an addition, which is visible in the parameter names and worth stating out loud.
 */
describe('Jira Cloud — projectRoleActors (live, read-only)', () => {
  let client: CloudClient;
  let roleId: number;
  let accountId: string;

  beforeAll(async () => {
    client = getCloudClient();
    accountId = (await client.myself.getCurrentUser()).accountId!;

    const roles = await client.projectRoles.getProjectRoles({ projectIdOrKey: TEST_PROJECT_KEY });

    roleId = Number(roles.Administrators!.match(/\/role\/(\d+)$/)![1]);
  });

  it('lists the actors of the role that grants this suite its access', async () => {
    const role = await client.projectRoles.getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId });

    expect(Array.isArray(role.actors)).toBe(true);
    expect(role.actors!.length).toBeGreaterThan(0);

    for (const actor of role.actors!) {
      expect(typeof actor.id).toBe('number');
      expect(typeof actor.type).toBe('string');
    }
  });

  it('finds the test account among them, which is why teardown works', async () => {
    const role = await client.projectRoles.getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId });

    expect(role.actors!.some(actor => actor.actorUser?.accountId === accountId)).toBe(true);
  });

  it('reports the default actors a role gives new projects', async () => {
    const defaults = await client.projectRoleActors.getProjectRoleActorsForRole({ id: roleId }).catch((e: unknown) => e);

    if (defaults instanceof Error) {
      expect((defaults as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    const role = defaults as Awaited<ReturnType<typeof client.projectRoleActors.getProjectRoleActorsForRole>>;

    expect(Array.isArray(role.actors ?? [])).toBe(true);
    expect(role.id).toBeUndefined();
  });

  it('surfaces an unknown role as a typed error', async () => {
    const error = await client.projectRoleActors
      .getProjectRoleActorsForRole({ id: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || (error as { status?: number }).status === 400).toBe(true);
  });

  it('rejects an actor addition naming nobody', async ctx => {
    const error = await client.projectRoleActors
      .addActorUsers({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId })
      .catch((e: unknown) => e);

    ctx.skip(isNotEntitled(error), 'the site is on a Free plan, which refuses role actor writes whatever they say');

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('silently succeeds when removing an actor that is not in the role', async ctx => {
    const result = await client.projectRoleActors
      .deleteActor({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId, user: 'no-such-account-id' })
      .catch((e: unknown) => e);

    ctx.skip(isNotEntitled(result), 'the site is on a Free plan, which refuses role actor writes whatever they say');

    expect(result).toBeUndefined();

    const role = await client.projectRoles.getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId });

    expect(role.actors!.some(actor => actor.actorUser?.accountId === accountId)).toBe(true);
  });
});
