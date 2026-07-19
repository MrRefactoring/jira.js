import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient, rawRequest } from '../setup/client';
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
 * parameter. That asymmetry is where the defect below comes from.
 */

/**
 * `addWatcher` declares its body as an object, but the endpoint wants a bare JSON string — the account id, quoted, on
 * its own. That combination is currently unreachable through the client, and this suite pins exactly why: `core`
 * treats any string body as an already-encoded payload and ships it raw with `text/plain`, which Jira answers with
 * 415. Encoding it by hand does not help either — the value has to arrive as JSON *and* be typed as an object.
 *
 * So the suite adds the watcher over raw HTTP to get real coverage of everything downstream, and keeps one test
 * aimed at the broken path so the defect stays visible and flips to green the moment it is fixed upstream.
 */
function accountIdBody(accountId: string): Record<string, unknown> {
  return accountId as unknown as Record<string, unknown>;
}

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
    // Jira auto-watches issues you create unless the account opted out, so the
    // starting count is whatever the account's preference says — not necessarily
    // zero. Asserting agreement between the two fields is the honest check.
    expect(watchers.watchCount).toBe(watchers.watchers?.length);
  });

  it('cannot add a watcher through the client — a known defect, not a Jira limitation', async () => {
    const error = await client.issueWatchers
      .addWatcher({ issueIdOrKey: issue.key, body: accountIdBody(accountId) })
      .catch((e: unknown) => e);

    // 415, because the string went out as `text/plain`. The same account id sent
    // as JSON over raw HTTP is accepted (the next test does exactly that), which
    // is what proves the fault is on this side of the wire.
    expect((error as { status?: number }).status).toBe(415);
  });

  it('adds the calling account as a watcher, observable on the next read', async () => {
    const response = await rawRequest(`/rest/api/3/issue/${issue.key}/watchers`, {
      method: 'POST',
      body: JSON.stringify(accountId),
    });

    expect(response.status).toBe(204);

    const watchers = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    expect(watchers.isWatching).toBe(true);
    expect(watchers.watchers?.map(watcher => watcher.accountId)).toContain(accountId);
  });

  it('treats a repeated add as idempotent rather than cumulative', async () => {
    const before = await client.issueWatchers.getIssueWatchers({ issueIdOrKey: issue.key });

    await rawRequest(`/rest/api/3/issue/${issue.key}/watchers`, {
      method: 'POST',
      body: JSON.stringify(accountId),
    });

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
    // Over raw HTTP again: routed through the client this would fail at 415
    // before Jira ever looked at the id, and prove nothing about validation.
    const response = await rawRequest(`/rest/api/3/issue/${issue.key}/watchers`, {
      method: 'POST',
      body: JSON.stringify('no-such-account-id'),
    });

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.status).toBeLessThan(500);
  });

  it('surfaces watchers of a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueWatchers
      .getIssueWatchers({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
