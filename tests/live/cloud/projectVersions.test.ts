import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Live suite for the `projectVersions` API (`createVersion`, `getVersion`, `updateVersion`, `moveVersion`,
 * `mergeVersions`, `deleteAndReplaceVersion`, `getProjectVersions`, `getProjectVersionsPaginated`,
 * `getVersionRelatedIssues`, `getVersionUnresolvedIssues`, and the related-work group).
 *
 * A full write cycle in the test project. Versions are the one piece of project configuration with genuinely
 * interesting semantics — they order relative to each other, they merge, and deleting one has to say what happens to
 * the issues that referenced it. All three are exercised.
 */
describe('Jira Cloud — projectVersions (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let projectId: number;
  let versionId: string;
  let secondId: string;
  let issue: TestIssue;
  const name = testName('version').replace(/[[\]]/g, '');

  beforeAll(async () => {
    client = getCloudClient();
    projectId = Number((await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY })).id);
  });

  afterAll(() => tracker.cleanup());

  it('creates an unreleased version', async () => {
    const version = await client.projectVersions.createVersion({
      name,
      description: 'created by the live suite',
      projectId,
      released: false,
    });

    expect(version.id).toMatch(/^\d+$/);
    expect(version.name).toBe(name);
    expect(version.released).toBe(false);
    expect(version.archived).toBe(false);

    versionId = version.id!;
    tracker.defer(async () => {
      await client.projectVersions.deleteAndReplaceVersion({ id: versionId });
    });
  });

  it('reads it back by id', async () => {
    const version = await client.projectVersions.getVersion({ id: versionId });

    expect(version.id).toBe(versionId);
    expect(version.projectId).toBe(projectId);
  });

  it('reports issue counts only when `expand` asks for them', async () => {
    const plain = await client.projectVersions.getVersion({ id: versionId });
    const expanded = await client.projectVersions.getVersion({ id: versionId, expand: ['issuesstatus'] });

    expect(plain.issuesStatusForFixVersion).toBeUndefined();
    // Counting issues per status is expensive, which is why it is opt-in — and
    // why code that reads it without expanding silently gets `undefined`.
    expect(expanded.issuesStatusForFixVersion).toBeDefined();
    expect(typeof expanded.issuesStatusForFixVersion?.unmapped).toBe('number');
  });

  it('releases the version on update', async () => {
    const updated = await client.projectVersions.updateVersion({
      id: versionId,
      body: { released: true, releaseDate: '2026-01-15' },
    });

    expect(updated.released).toBe(true);
    expect(updated.releaseDate).toBeTruthy();
  });

  it('orders versions relative to one another', async () => {
    const second = await client.projectVersions.createVersion({ name: `${name}-2`, projectId, released: false });

    secondId = second.id!;
    tracker.defer(async () => {
      await client.projectVersions.deleteAndReplaceVersion({ id: secondId });
    });

    const before = await client.projectVersions.getProjectVersions({ projectIdOrKey: TEST_PROJECT_KEY });
    const order = before.map(version => version.id);

    await client.projectVersions.moveVersion({ id: secondId, position: 'First' });

    const after = await client.projectVersions.getProjectVersions({ projectIdOrKey: TEST_PROJECT_KEY });

    // Ordering is explicit state, not a sort of the response — the listing is
    // returned in project order and moving one version changes that order.
    expect(after[0]!.id).toBe(secondId);
    expect(after.map(version => version.id)).not.toEqual(order);
  });

  it('counts the issues that reference the version', async () => {
    issue = await createTestIssue(client, tracker);

    await client.issues.editIssue({ issueIdOrKey: issue.key, fields: { fixVersions: [{ id: versionId }] } });

    // Unlike component counts, which are immediate, the version counts are
    // computed off the search index and lag the write by a moment.
    const related = await waitFor(
      () => client.projectVersions.getVersionRelatedIssues({ id: versionId }),
      counts => counts.issuesFixedCount === 1,
      { maxAttempts: 8 },
    );

    expect(related.issuesFixedCount).toBe(1);

    const unresolved = await client.projectVersions.getVersionUnresolvedIssues({ id: versionId });

    expect(unresolved.issuesCount).toBe(1);
  });

  it('pages the paginated listing', async () => {
    const page = await client.projectVersions.getProjectVersionsPaginated({
      projectIdOrKey: TEST_PROJECT_KEY,
      maxResults: 1,
      orderBy: 'name',
    });

    expect(page.values?.length).toBeLessThanOrEqual(1);
    expect(page.maxResults).toBe(1);
  });

  it('moves the issue across when one version is merged into another', async () => {
    await client.projectVersions.mergeVersions({ id: versionId, moveIssuesTo: secondId });

    const error = await client.projectVersions.getVersion({ id: versionId }).catch((e: unknown) => e);

    // A merge deletes the source version outright.
    expect(isNotFoundError(error)).toBe(true);

    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['fixVersions'] });
    const fixVersions = (fetched.fields as { fixVersions?: { id?: string }[] }).fixVersions ?? [];

    // The issue keeps a fix version — the target one. This is the whole point
    // of merging rather than deleting, and it is invisible in the return value.
    expect(fixVersions.map(version => version.id)).toEqual([secondId]);
  });

  it('surfaces an unknown version as a typed NotFoundError', async () => {
    const error = await client.projectVersions.getVersion({ id: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
