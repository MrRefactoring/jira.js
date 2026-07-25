import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `permissionSchemes` API (`getAllPermissionSchemes`, `getPermissionScheme`,
 * `getPermissionSchemeGrants`, `getPermissionSchemeGrant`, and the create/update/delete group).
 *
 * Read-only, emphatically. A permission scheme is shared by every project attached to it, so editing one silently
 * changes who can do what across projects this suite knows nothing about. Adding a grant is how you accidentally give
 * a group rights it should not have; removing one is how you lock people out.
 *
 * The read half earns its place by explaining the rest of the suite. Every write the live tests perform is possible
 * because a scheme grants a permission to a project role the account happens to sit in — this file is what makes that
 * chain inspectable rather than folklore, and it is the first place to look when a write suite starts failing with
 * 403s that were not there yesterday.
 */
describe('Jira Cloud — permissionSchemes (live, read-only)', () => {
  let client: CloudClient;
  let schemeId: number;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();

    const attached = await client.projectPermissionSchemes
      .getAssignedPermissionScheme({ projectKeyOrId: TEST_PROJECT_KEY })
      .catch(() => undefined);

    if (!attached) {
      permitted = false;

      return;
    }

    schemeId = Number(attached.id);
  });

  it('reports which scheme the test project is attached to', async () => {
    if (!permitted) return;

    expect(schemeId).toBeGreaterThan(0);

    const scheme = await client.permissionSchemes.getPermissionScheme({ schemeId });

    expect(scheme.id).toBe(schemeId);
    expect(typeof scheme.name).toBe('string');
    expect(scheme.self).toMatch(/^https:\/\//);
  });

  it('lists the schemes on the site, including that one', async () => {
    if (!permitted) return;

    const all = await client.permissionSchemes.getAllPermissionSchemes().catch((e: unknown) => e);

    if (all instanceof Error) {
      expect(isForbiddenError(all)).toBe(true);

      return;
    }

    const schemes = all as Awaited<ReturnType<typeof client.permissionSchemes.getAllPermissionSchemes>>;

    expect(schemes.permissionSchemes?.map(scheme => scheme.id)).toContain(schemeId);
  });

  it('returns every grant whether or not `expand` asks for it', async () => {
    if (!permitted) return;

    const plain = await client.permissionSchemes.getPermissionScheme({ schemeId });
    const expanded = await client.permissionSchemes.getPermissionScheme({ schemeId, expand: ['permissions'] });

    expect(plain.permissions!.length).toBeGreaterThan(0);
    expect(expanded.permissions!.length).toBe(plain.permissions!.length);
  });

  it('describes each grant as a permission paired with a holder', async () => {
    if (!permitted) return;

    const grants = await client.permissionSchemes.getPermissionSchemeGrants({ schemeId });

    expect(grants.permissions!.length).toBeGreaterThan(0);

    for (const grant of grants.permissions!) {
      expect(typeof grant.id).toBe('number');
      expect(typeof grant.permission).toBe('string');
      expect(typeof grant.holder?.type).toBe('string');
    }
  });

  it('explains why this suite can delete issues at all', async () => {
    if (!permitted) return;

    const grants = await client.permissionSchemes.getPermissionSchemeGrants({ schemeId });
    const deleteGrants = grants.permissions!.filter(grant => grant.permission === 'DELETE_ISSUES');

    expect(deleteGrants.length).toBeGreaterThan(0);
    expect(deleteGrants.some(grant => grant.holder?.type === 'projectRole')).toBe(true);
  });

  it('resolves a single grant by id', async () => {
    if (!permitted) return;

    const grants = await client.permissionSchemes.getPermissionSchemeGrants({ schemeId });
    const sample = grants.permissions![0]!;

    const grant = await client.permissionSchemes.getPermissionSchemeGrant({
      schemeId,
      permissionId: sample.id!,
    });

    expect(grant.id).toBe(sample.id);
    expect(grant.permission).toBe(sample.permission);
  });

  it('surfaces an unknown scheme as a typed error', async () => {
    const error = await client.permissionSchemes.getPermissionScheme({ schemeId: 99999999 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real scheme', async () => {
    const error = await client.permissionSchemes.deletePermissionScheme({ schemeId: 99999999 }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
