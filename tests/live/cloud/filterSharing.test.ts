import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { TEST_PROJECT_KEY } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live suite for the `filterSharing` API (`getDefaultShareScope`, `setDefaultShareScope`, `getSharePermissions`,
 * `addSharePermission`, `getSharePermission`, `deleteSharePermission`) and the `issueResolutions` and `projectEmail`
 * reads.
 *
 * The sharing cycle runs in full against a filter this suite creates, so nothing anyone else owns is ever shared.
 * That matters more here than elsewhere: sharing is the one write in this file whose effect is that *other people*
 * can see something they could not before.
 *
 * `setDefaultShareScope` is deliberately left alone. It is per-account rather than per-filter, and it decides whether
 * every filter the account creates in future is private or global — a standing preference, not a scoped change.
 */
describe('Jira Cloud — filter sharing (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let filterId: number;
  let projectId: string;

  beforeAll(async () => {
    client = getCloudClient();
    projectId = (await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY })).id!;

    const filter = await client.filters.createFilter({
      name: testName('sharing'),
      jql: `project = ${TEST_PROJECT_KEY}`,
    });

    filterId = Number(filter.id);
    tracker.defer(async () => {
      await client.filters.deleteFilter({ id: filterId });
    });
  });

  afterAll(() => tracker.cleanup());

  it('reports a new filter as shared with nobody', async () => {
    const permissions = await client.filterSharing.getSharePermissions({ id: filterId });

    expect(permissions).toEqual([]);
  });

  it('reports the account default share scope without changing it', async () => {
    const scope = await client.filterSharing.getDefaultShareScope();

    expect(['PRIVATE', 'AUTHENTICATED', 'GLOBAL']).toContain(scope.scope);
  });

  it('shares the filter with one project and makes it observable', async () => {
    const added = await client.filterSharing.addSharePermission({ id: filterId, type: 'project', projectId });

    expect(Array.isArray(added)).toBe(true);
    expect(added.length).toBeGreaterThan(0);

    const permissions = await client.filterSharing.getSharePermissions({ id: filterId });

    expect(permissions).toHaveLength(1);
    expect(permissions[0]!.type).toBe('project');
    expect(permissions[0]!.project?.id).toBe(projectId);
  });

  it('reads a single share permission back by id', async () => {
    const permissions = await client.filterSharing.getSharePermissions({ id: filterId });
    const permissionId = permissions[0]!.id!;

    const permission = await client.filterSharing.getSharePermission({ id: filterId, permissionId });

    expect(permission.id).toBe(permissionId);
    expect(permission.type).toBe('project');
  });

  it('shows the share on the filter itself, not only through this API', async () => {
    const filter = await client.filters.getFilter({ id: filterId });

    expect(filter.sharePermissions?.length).toBe(1);
  });

  it('unshares it again, returning the filter to private', async () => {
    const permissions = await client.filterSharing.getSharePermissions({ id: filterId });

    await client.filterSharing.deleteSharePermission({ id: filterId, permissionId: permissions[0]!.id! });

    const remaining = await client.filterSharing.getSharePermissions({ id: filterId });

    expect(remaining).toEqual([]);
  });

  it('surfaces sharing of an unknown filter as a typed NotFoundError', async () => {
    const error = await client.filterSharing.getSharePermissions({ id: 99999999 }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('resolves an issue resolution by id', async () => {
    const issue = await client.issues.getIssue({ issueIdOrKey: `${TEST_PROJECT_KEY}-1` }).catch(() => undefined);

    const resolutionId = (issue?.fields as { resolution?: { id?: string } } | undefined)?.resolution?.id ?? '10000';

    const resolution = await client.issueResolutions.getResolution({ id: resolutionId }).catch((e: unknown) => e);

    if (resolution instanceof Error) {
      expect(isNotFoundError(resolution)).toBe(true);

      return;
    }

    const result = resolution as Awaited<ReturnType<typeof client.issueResolutions.getResolution>>;

    expect(result.id).toBe(resolutionId);
    expect(typeof result.name).toBe('string');
  });

  it('reports the project email address, or refuses typed', async () => {
    const email = await client.projectEmail.getProjectEmail({ projectId: Number(projectId) }).catch((e: unknown) => e);

    if (email instanceof Error) {
      expect((email as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    const result = email as Awaited<ReturnType<typeof client.projectEmail.getProjectEmail>>;

    expect(typeof result.emailAddress).toBe('string');
  });
});
