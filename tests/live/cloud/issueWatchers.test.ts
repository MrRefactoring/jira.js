import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueWatchers` API (`getIssueWatchers`, `addWatcher`, `removeWatcher`,
 * `getIsWatchingIssueBulk`).
 *
 * Scoped entirely to fixture issues and to the authenticating account — no other user is ever added as a watcher, so
 * the suite cannot generate mail for a real person.
 *
 * Note the asymmetry the API forces on callers: the watcher is *added* as a JSON body and *removed* as a query
 * parameter.
 *
 * The body is a bare JSON string — the account id, quoted, on its own. That used to be unreachable: `core` treated
 * any string body as an already-encoded payload and shipped it raw as `text/plain`, which Jira answers with 415.
 * Strings are JSON-encoded now, so the endpoint works through the client and this suite exercises it directly.
 */

describe('Jira Cloud — issueWatchers (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  let accountId: string;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);
    accountId = (await client.myself.getCurrentUser()).accountId!;
  });

  afterAll(() => tracker.cleanup());

  it('reports the watcher list of a fresh issue', async () => {
    const watchers = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    expect(watchers.self).toMatch(/^https:\/\//);
    expect(typeof watchers.isWatching).toBe('boolean');
    expect(typeof watchers.watchCount).toBe('number');
    expect(Array.isArray(watchers.watchers)).toBe(true);
    expect(watchers.watchCount).toBe(watchers.watchers?.length);
  });

  it('adds the calling account as a watcher, observable on the next read', async () => {
    await client.issueWatchers.addWatcher({ issueIdOrKey: issue.key, body: accountId });

    const watchers = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    expect(watchers.isWatching).toBe(true);
    expect(watchers.watchers?.map(watcher => watcher.accountId)).toContain(accountId);
  });

  it('treats a repeated add as idempotent rather than cumulative', async () => {
    const before = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    await client.issueWatchers.addWatcher({ issueIdOrKey: issue.key, body: accountId });

    const after = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    expect(after.watchCount).toBe(before.watchCount);
  });

  it('answers the bulk watching query for the issues asked about', async () => {
    const result = await client.issueWatchers.getIsWatchingIssueBulk({ issueIds: [issue.id] });

    expect(result.issuesIsWatching?.[issue.id]).toBe(true);
  });

  it('removes the watcher through the query parameter, not a body', async () => {
    await client.issueWatchers.removeWatcher({ issueIdOrKey: issue.key, accountId });

    const watchers = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    expect(watchers.isWatching).toBe(false);
    expect(watchers.watchers?.map(watcher => watcher.accountId)).not.toContain(accountId);
  });

  it('rejects an unknown account id rather than silently ignoring it', async () => {
    const error = await client.issueWatchers
      .addWatcher({ issueIdOrKey: issue.key, body: 'no-such-account-id' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
    expect((error as { status?: number }).status).toBeLessThan(500);
  });

  it('surfaces watchers of a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueWatchers
      .getIssueWatchers({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
