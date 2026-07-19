import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `projects` API (`searchProjects`, `getProject`, `getAllStatuses`, `getHierarchy`,
 * `getNotificationSchemeForProject`, and the create/update/delete/archive group).
 *
 * Read-only against the existing test project, deliberately. Creating a project on Cloud is slow, consumes a licence
 * slot, and frequently cannot be deleted by the same token that made it — which is precisely why the fixtures work
 * inside a standing project rather than making one per run. Exercising `createProject` here would leave debris on a
 * real tenant that the suite has no reliable way to clear.
 *
 * The destructive endpoints are still pinned, but only through their error channel and never aimed at a real project.
 */
describe('Jira Cloud — projects (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('describes the test project the whole live suite runs in', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(project.key).toBe(TEST_PROJECT_KEY);
    expect(project.id).toMatch(/^\d+$/);
    expect(typeof project.name).toBe('string');
    expect(project.self).toMatch(/^https:\/\//);
    // The fixtures create `Task` issues; if this project stopped offering that
    // type, every write suite would fail for a reason that is not its own.
    expect(project.issueTypes?.map(type => type.name)).toContain('Task');
  });

  it('resolves the project by id as well as by key', async () => {
    const byKey = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const byId = await client.projects.getProject({ projectIdOrKey: byKey.id! });

    expect(byId.key).toBe(TEST_PROJECT_KEY);
  });

  it('already returns lead and description without being asked', async () => {
    const plain = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const expanded = await client.projects.getProject({
      projectIdOrKey: TEST_PROJECT_KEY,
      expand: ['description', 'lead'],
    });

    // Unlike most `expand` parameters in this API, these two are on by default —
    // asking for them changes nothing. Worth pinning so nobody adds `expand`
    // here believing it is required, and worth knowing that the expanded
    // response is a superset rather than a different shape.
    expect(plain.lead?.accountId).toBeTruthy();
    expect(expanded.lead?.accountId).toBe(plain.lead?.accountId);
    expect(Object.keys(expanded)).toEqual(expect.arrayContaining(Object.keys(plain)));
  });

  it('finds the project through the paginated search', async () => {
    const page = await client.projects.searchProjects({ query: TEST_PROJECT_KEY });

    expect(page.values?.map(project => project.key)).toContain(TEST_PROJECT_KEY);
    expect(typeof page.total).toBe('number');
    expect(typeof page.isLast).toBe('boolean');
  });

  it('pages and orders the project search', async () => {
    const limited = await client.projects.searchProjects({ maxResults: 1 });

    expect(limited.values?.length).toBeLessThanOrEqual(1);
    expect(limited.maxResults).toBe(1);

    const ascending = await client.projects.searchProjects({ orderBy: 'key', maxResults: 50 });
    const descending = await client.projects.searchProjects({ orderBy: '-key', maxResults: 50 });

    if ((ascending.values?.length ?? 0) > 1) {
      // Reversing the sort must actually reverse it, not merely be accepted.
      expect(descending.values?.map(project => project.key)).toEqual(
        ascending.values?.map(project => project.key).reverse(),
      );
    }
  });

  it('lists the statuses available per issue type', async () => {
    const statuses = await client.projects.getAllStatuses({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(statuses.length).toBeGreaterThan(0);

    for (const issueType of statuses) {
      expect(typeof issueType.name).toBe('string');
      expect(issueType.statuses?.length).toBeGreaterThan(0);
      // This is the join a transition UI is built from — issue type to the
      // statuses its workflow allows, not the site-wide status list.
      for (const status of issueType.statuses ?? []) expect(status.statusCategory?.key).toBeTruthy();
    }
  });

  it('describes the issue type hierarchy, or refuses for a company-managed project', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const result = await client.projects.getHierarchy({ projectId: Number(project.id) }).catch((e: unknown) => e);

    if (isNotFoundError(result)) {
      // The endpoint is team-managed ("simplified") only, and says so in the
      // message — but answers 404, which reads as "no such project" to anyone
      // not looking at the body. The test project is company-managed.
      expect(JSON.stringify((result as { body?: unknown }).body)).toContain('not simplified');

      return;
    }

    const hierarchy = result as Awaited<ReturnType<typeof client.projects.getHierarchy>>;

    expect(hierarchy.projectId).toBe(Number(project.id));

    for (const level of hierarchy.hierarchy ?? []) {
      expect(typeof level.level).toBe('number');
      expect(Array.isArray(level.issueTypes ?? [])).toBe(true);
    }
  });

  it('reports the notification scheme, or a typed 404 when none is attached', async () => {
    const result = await client.projects
      .getNotificationSchemeForProject({ projectKeyOrId: TEST_PROJECT_KEY })
      .catch((e: unknown) => e);

    if (isNotFoundError(result)) {
      // A project with no notification scheme is a normal state, not an error
      // condition — but the API expresses it as 404 rather than an empty body.
      expect(JSON.stringify((result as { body?: unknown }).body)).toContain('notification scheme');

      return;
    }

    const scheme = result as Awaited<ReturnType<typeof client.projects.getNotificationSchemeForProject>>;

    expect(scheme.id).toBeTruthy();
    expect(typeof scheme.name).toBe('string');
  });

  it('surfaces an unknown project as a typed NotFoundError', async () => {
    const error = await client.projects.getProject({ projectIdOrKey: 'NOSUCHPROJECT' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('is case sensitive about project keys, as the parameter documents', async () => {
    const error = await client.projects
      .getProject({ projectIdOrKey: TEST_PROJECT_KEY.toLowerCase() })
      .catch((e: unknown) => e);

    // Easy to miss, and the failure mode is a 404 that looks like a missing
    // project rather than a casing mistake.
    expect(isNotFoundError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real project', async () => {
    // A key that cannot exist, on purpose: deleting a project takes every issue
    // in it, and no assertion is worth that risk on a live tenant.
    const error = await client.projects.deleteProject({ projectIdOrKey: 'NOSUCHPROJECT' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
