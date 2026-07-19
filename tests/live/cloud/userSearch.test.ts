import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `userSearch` API (`findUsers`, `findUsersForPicker`, `findAssignableUsers`,
 * `findBulkAssignableUsers`, `findUsersWithAllPermissions`, `findUsersWithBrowsePermission`, `findUsersByQuery`,
 * `findUserKeysByQuery`).
 *
 * Read-only. Eight endpoints that all look like "search for a user" and are not interchangeable: each answers a
 * different question — who exists, who can be assigned this issue, who can see this project. Picking the wrong one
 * produces a picker that offers people who will be rejected on save, and nothing in the types distinguishes them.
 *
 * These are also the endpoints most affected by Cloud's privacy settings: matching happens server-side against fields
 * the response may not contain, so a caller cannot verify a match locally.
 */
describe('Jira Cloud — userSearch (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let accountId: string;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    accountId = (await client.myself.getCurrentUser()).accountId!;
    issue = await createTestIssue(client, tracker);
  });

  afterAll(() => tracker.cleanup());

  it('finds a user by exact accountId', async () => {
    const found = await client.userSearch.findUsers({ accountId });

    expect(found).toHaveLength(1);
    expect(found[0]!.accountId).toBe(accountId);
  });

  it('answers an unmatched query with an empty list, not an error', async () => {
    const found = await client.userSearch.findUsers({ query: 'nobodymatchesthisquerystring' });

    expect(found).toEqual([]);
  });

  it('reports a total alongside the page through the picker', async () => {
    const picker = await client.userSearch.findUsersForPicker({ query: '', maxResults: 5 });

    expect(typeof picker.total).toBe('number');
    expect(picker.users?.length).toBeLessThanOrEqual(5);

    for (const user of picker.users ?? []) {
      expect(user.accountId).toBeTruthy();
      // The picker returns pre-rendered `html` with the match highlighted —
      // the reason to use this endpoint over `findUsers` for a type-ahead.
      expect(typeof user.displayName).toBe('string');
    }
  });

  it('lists who can be assigned a specific issue', async () => {
    const assignable = await client.userSearch.findAssignableUsers({ issueKey: issue.key });

    expect(Array.isArray(assignable)).toBe(true);
    // The account running these tests holds Assignable User in the project, so
    // it must be offered — otherwise the fixture issue could not be assigned.
    expect(assignable.map(user => user.accountId)).toContain(accountId);
  });

  it('scopes assignability to a project as well as to an issue', async () => {
    const byProject = await client.userSearch.findAssignableUsers({ project: TEST_PROJECT_KEY });

    expect(byProject.map(user => user.accountId)).toContain(accountId);
  });

  it('requires enough context to answer at all', async () => {
    // Neither issue nor project: the question "who can be assigned" has no
    // meaning without a scope, and Jira refuses rather than guessing.
    const error = await client.userSearch.findAssignableUsers({ query: '' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('lists who can browse the project, but only when given a query too', async () => {
    // The scope alone is not enough here, unlike `findAssignableUsers`: without
    // `query` or `accountId` Jira refuses with a message naming `username`, a
    // parameter this endpoint no longer even accepts. The inconsistency between
    // the two search endpoints is the thing worth recording.
    const error = await client.userSearch
      .findUsersWithBrowsePermission({ projectKey: TEST_PROJECT_KEY })
      .catch((e: unknown) => e);

    expect((error as { status?: number }).status).toBe(400);

    const browsers = await client.userSearch.findUsersWithBrowsePermission({
      projectKey: TEST_PROJECT_KEY,
      accountId,
    });

    expect(browsers.map(user => user.accountId)).toContain(accountId);
  });

  it('answers permission-scoped searches with the permissions named', async () => {
    const found = await client.userSearch.findUsersWithAllPermissions({
      permissions: ['BROWSE_PROJECTS'],
      projectKey: TEST_PROJECT_KEY,
    });

    expect(found.map(user => user.accountId)).toContain(accountId);
  });

  it('honours maxResults across the search endpoints', async () => {
    const limited = await client.userSearch.findUsers({ query: '', maxResults: 1 });

    expect(limited.length).toBeLessThanOrEqual(1);
  });
});
