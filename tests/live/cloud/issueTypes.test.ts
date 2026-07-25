import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `issueTypes` API (`getIssueAllTypes`, `getIssueType`, `getAlternativeIssueTypes`, and the
 * admin-only create/update/delete group).
 *
 * Read-only. Issue types are site-wide configuration shared by every project on the tenant: creating one adds an
 * option everywhere, and deleting one asks Jira to migrate every issue that used it. Neither belongs in a suite that
 * runs against a working site, so the write half is pinned through its error channel and aimed only at ids that
 * cannot exist.
 */
describe('Jira Cloud — issueTypes (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists the site issue types, each fully typed', async () => {
    const types = await client.issueTypes.getIssueAllTypes();

    expect(types.length).toBeGreaterThan(0);

    for (const type of types) {
      expect(type.id).toMatch(/^\d+$/);
      expect(typeof type.name).toBe('string');
      expect(typeof type.subtask).toBe('boolean');
      expect(type.self).toMatch(/^https:\/\//);
      expect(typeof type.hierarchyLevel).toBe('number');
    }
  });

  it('marks subtask types consistently across both fields', async () => {
    const types = await client.issueTypes.getIssueAllTypes();

    for (const type of types) {
      if (type.subtask) expect(type.hierarchyLevel).toBe(-1);
      if (type.hierarchyLevel === -1) expect(type.subtask).toBe(true);
    }
  });

  it('includes the types the test project actually offers', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const siteTypes = await client.issueTypes.getIssueAllTypes();
    const siteIds = new Set(siteTypes.map(type => type.id));

    expect(project.issueTypes!.length).toBeGreaterThan(0);
    expect(project.issueTypes!.every(type => siteIds.has(type.id))).toBe(true);
  });

  it('resolves a single type by id, identical to its listing entry', async () => {
    const types = await client.issueTypes.getIssueAllTypes();
    const sample = types.find(type => type.name === 'Task') ?? types[0]!;

    const fetched = await client.issueTypes.getIssueType({ id: sample.id! });

    expect(fetched.id).toBe(sample.id);
    expect(fetched.name).toBe(sample.name);
  });

  it('lists the types an issue of a given type could be changed to', async () => {
    const types = await client.issueTypes.getIssueAllTypes();
    const task = types.find(type => type.name === 'Task') ?? types[0]!;

    const alternatives = await client.issueTypes.getAlternativeIssueTypes({ id: task.id! });

    expect(Array.isArray(alternatives)).toBe(true);
    expect(alternatives.map(type => type.id)).not.toContain(task.id);
  });

  it('surfaces an unknown type as a typed NotFoundError', async () => {
    const error = await client.issueTypes.getIssueType({ id: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real type', async () => {
    const error = await client.issueTypes.deleteIssueType({ id: '99999999' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });
});
