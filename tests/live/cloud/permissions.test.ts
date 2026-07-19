import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `permissions` API (`getMyPermissions`, `getAllPermissions`, `getBulkPermissions`,
 * `getPermittedProjects`).
 *
 * Entirely read-only: every call here answers a question about the caller's own rights, and none of them changes
 * anything. That makes this the right place to pin what the token can actually do — several other suites gate their
 * write paths on exactly these answers, and a silent loss of a permission would otherwise surface as a confusing 403
 * three files away.
 */

type PermissionEntry = { id?: string; key?: string; name?: string; type?: string; havePermission?: boolean };

/** Every permission the API returns carries a key and a type; `havePermission` is what callers branch on. */
function expectWellFormedPermission(permission: PermissionEntry) {
  expect(typeof permission.key).toBe('string');
  expect(permission.key).toBeTruthy();
  expect(['GLOBAL', 'PROJECT']).toContain(permission.type);
}

describe('Jira Cloud — permissions.getMyPermissions (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('answers for a named permission in the scope of the test project', async () => {
    const result = await client.permissions.getMyPermissions({
      projectKey: TEST_PROJECT_KEY,
      permissions: ['BROWSE_PROJECTS', 'CREATE_ISSUES'],
    });

    const permissions = result.permissions as Record<string, PermissionEntry>;

    expect(Object.keys(permissions).sort()).toEqual(['BROWSE_PROJECTS', 'CREATE_ISSUES']);
    Object.values(permissions).forEach(expectWellFormedPermission);

    // The whole live suite rests on these two; if either goes false, every
    // write-path file downstream is failing for a reason that is not its own.
    expect(permissions.BROWSE_PROJECTS?.havePermission).toBe(true);
    expect(permissions.CREATE_ISSUES?.havePermission).toBe(true);
  });

  it('narrows to exactly the permissions asked for, not the whole catalogue', async () => {
    const one = await client.permissions.getMyPermissions({
      projectKey: TEST_PROJECT_KEY,
      permissions: ['BROWSE_PROJECTS'],
    });

    // Without the filter Jira answers with every permission it knows; the
    // parameter having an effect is the point of the assertion.
    expect(Object.keys(one.permissions ?? {})).toEqual(['BROWSE_PROJECTS']);
  });

  it('reports project permissions differently in and out of project scope', async () => {
    const scoped = await client.permissions.getMyPermissions({
      projectKey: TEST_PROJECT_KEY,
      permissions: ['CREATE_ISSUES'],
    });
    const global = await client.permissions.getMyPermissions({ permissions: ['CREATE_ISSUES'] });

    const scopedEntry = (scoped.permissions as Record<string, PermissionEntry>).CREATE_ISSUES;
    const globalEntry = (global.permissions as Record<string, PermissionEntry>).CREATE_ISSUES;

    expect(scopedEntry?.havePermission).toBe(true);
    // Unscoped, the same key means "anywhere at all" rather than "here" — the
    // distinction is invisible in the type and easy to get wrong in calling code.
    expect(typeof globalEntry?.havePermission).toBe('boolean');
  });

  it('rejects an unknown permission key rather than silently ignoring it', async () => {
    const error = await client.permissions
      .getMyPermissions({ permissions: ['NO_SUCH_PERMISSION'] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });
});

describe('Jira Cloud — permissions.getAllPermissions (live)', () => {
  it('returns the site permission catalogue, every entry well formed', async () => {
    const all = await getCloudClient().permissions.getAllPermissions();
    const permissions = Object.values(all.permissions ?? {}) as PermissionEntry[];

    expect(permissions.length).toBeGreaterThan(20);
    permissions.forEach(expectWellFormedPermission);

    // The keys the rest of the suite relies on must exist in the catalogue.
    expect(Object.keys(all.permissions ?? {})).toEqual(
      expect.arrayContaining(['BROWSE_PROJECTS', 'CREATE_ISSUES', 'DELETE_ISSUES', 'ADMINISTER']),
    );
  });
});

describe('Jira Cloud — permissions.getBulkPermissions (live)', () => {
  it('resolves global and project permissions in one round trip', async () => {
    const result = await getCloudClient().permissions.getBulkPermissions({
      globalPermissions: ['ADMINISTER'],
      projectPermissions: [{ permissions: ['BROWSE_PROJECTS'], projects: [] }],
    });

    // `globalPermissions` comes back as the subset that is actually granted —
    // an empty array is a valid answer, not a missing field.
    expect(Array.isArray(result.globalPermissions)).toBe(true);
    expect(Array.isArray(result.projectPermissions)).toBe(true);
  });

  it('answers an empty request with empty results rather than an error', async () => {
    const result = await getCloudClient().permissions.getBulkPermissions({});

    // Asking about nothing is not a bad request here — Jira answers "you have
    // none of the permissions you asked about", which is trivially true. Worth
    // pinning: calling code that treats an empty answer as failure is wrong.
    expect(result.globalPermissions).toEqual([]);
    expect(result.projectPermissions).toEqual([]);
  });
});

describe('Jira Cloud — permissions.getPermittedProjects (live)', () => {
  it('includes the test project among those the token can create issues in', async () => {
    const result = await getCloudClient().permissions.getPermittedProjects({ permissions: ['CREATE_ISSUES'] });

    const keys = (result.projects ?? []).map(project => project.key);

    expect(keys).toContain(TEST_PROJECT_KEY);
  });

  it('rejects an unknown permission key', async () => {
    const error = await getCloudClient()
      .permissions.getPermittedProjects({ permissions: ['NO_SUCH_PERMISSION'] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });
});
