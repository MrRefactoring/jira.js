import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { TEST_PROJECT_KEY } from '../setup/fixtures';
import { pngBlob } from '../helpers/image';

/**
 * Live suite for the `issueTypes` API (`getIssueAllTypes`, `getIssueType`, `getAlternativeIssueTypes`, and the
 * admin-only create/update/delete group).
 *
 * Read-only but for one write. Issue types are site-wide configuration shared by every project on the tenant:
 * creating one adds an option everywhere, and deleting one asks Jira to migrate every issue that used it. Neither
 * belongs in a suite that runs against a working site, so that half is pinned through its error channel and aimed
 * only at ids that cannot exist.
 *
 * `createIssueTypeAvatar` is the exception, and it is exercised because it takes image bytes — the shape the
 * specification describes as an object of arbitrary keys, which is what made it unusable. It adds an avatar to the
 * type's list of available avatars and deletes it again; nothing selects it, so what the type displays never changes.
 */
describe('Jira Cloud — issueTypes (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  afterAll(() => tracker.cleanup());

  it('stores an avatar for an issue type from image bytes', async () => {
    const types = await client.issueTypes.getIssueAllTypes();
    const type = types.find(candidate => candidate.subtask === false) ?? types[0]!;

    const avatar = await client.issueTypes.createIssueTypeAvatar({
      id: type.id!,
      size: 48,
      x: 0,
      y: 0,
      body: pngBlob(48),
    });

    expect(avatar.id).toBeTruthy();
    expect(avatar.isSystemAvatar).toBe(false);

    tracker.defer(async () => {
      await client.avatars.deleteAvatar({ type: 'issuetype', owningObjectId: type.id!, id: Number(avatar.id) });
    });

    const avatars = await client.avatars.getAvatars({ type: 'issuetype', entityId: type.id! });

    expect(avatars.custom?.some(candidate => candidate.id === avatar.id)).toBe(true);
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
