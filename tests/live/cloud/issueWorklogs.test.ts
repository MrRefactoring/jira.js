import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, documentOf, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueWorklogs` API (`addWorklog`, `getIssueWorklog`, `getWorklog`, `updateWorklog`,
 * `deleteWorklog`, `getWorklogsForIds`, and the deleted/modified-since feeds).
 *
 * A full write cycle inside a fixture issue. Two things here are worth a live site rather than a unit test: time is
 * expressed as a human string that Jira parses server-side into seconds, and every worklog write mutates the issue's
 * time-tracking totals — a side effect nothing in the return value mentions.
 */
describe('Jira Cloud — issueWorklogs (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  let worklogId: string;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);
  });

  afterAll(() => tracker.cleanup());

  it('reports a fresh issue as having no worklogs', async () => {
    const page = await client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issue.key });

    expect(page.worklogs).toEqual([]);
    expect(page.total).toBe(0);
  });

  it('parses a human time string into seconds server-side', async () => {
    const worklog = await client.issueWorklogs.addWorklog({
      issueIdOrKey: issue.key,
      timeSpent: '1h 30m',
      comment: documentOf('worked on it'),
    });

    expect(worklog.id).toMatch(/^\d+$/);
    // The request never mentioned seconds; Jira derived them from the string.
    expect(worklog.timeSpentSeconds).toBe(5400);
    expect(worklog.timeSpent).toBe('1h 30m');
    expect(worklog.author?.accountId).toBeTruthy();
    expect(worklog.started).toBeInstanceOf(Date);

    worklogId = worklog.id!;
  });

  it('adds the logged time to the issue total, a side effect nothing returns', async () => {
    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['timetracking'] });
    const tracking = (fetched.fields as { timetracking?: { timeSpentSeconds?: number } }).timetracking;

    expect(tracking?.timeSpentSeconds).toBe(5400);
  });

  it('reads a single worklog back by id', async () => {
    const worklog = await client.issueWorklogs.getWorklog({ issueIdOrKey: issue.key, id: worklogId });

    expect(worklog.id).toBe(worklogId);
    expect(worklog.issueId).toBe(issue.id);
    expect(JSON.stringify(worklog.comment)).toContain('worked on it');
  });

  it('changes the duration on update and moves the issue total with it', async () => {
    const updated = await client.issueWorklogs.updateWorklog({
      issueIdOrKey: issue.key,
      id: worklogId,
      body: { timeSpent: '2h' },
    });

    expect(updated.timeSpentSeconds).toBe(7200);

    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['timetracking'] });

    // The total follows the edit rather than accumulating both values.
    expect((fetched.fields as { timetracking?: { timeSpentSeconds?: number } }).timetracking?.timeSpentSeconds).toBe(
      7200,
    );
  });

  it('pages the worklog listing', async () => {
    await client.issueWorklogs.addWorklog({ issueIdOrKey: issue.key, timeSpent: '15m' });

    const all = await client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issue.key });

    expect(all.total).toBe(2);

    const limited = await client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issue.key, maxResults: 1 });

    expect(limited.worklogs).toHaveLength(1);
    expect(limited.maxResults).toBe(1);
  });

  it('fetches worklogs across issues by id', async () => {
    const byIds = await client.issueWorklogs.getWorklogsForIds({ ids: [Number(worklogId)] });

    expect(byIds).toHaveLength(1);
    expect(byIds[0]!.id).toBe(worklogId);
  });

  it('reports worklogs modified since a point in the past', async () => {
    const since = Date.now() - 60 * 60 * 1000;

    const page = await client.issueWorklogs.getIdsOfWorklogsModifiedSince({ since });

    // The feed is site-wide and paged by a moving cursor rather than an offset:
    // a page starts at the oldest change after `since`, so the worklog created
    // moments ago is not necessarily on the first page. Asserting it is there
    // would be a flaky test dressed up as a strict one — what is actually
    // guaranteed is the window and the cursor a caller pages with.
    expect(Array.isArray(page.values)).toBe(true);
    expect(typeof page.lastPage).toBe('boolean');
    expect(page.until).toBeGreaterThanOrEqual(since);

    for (const entry of page.values ?? []) {
      expect(entry.updatedTime).toBeGreaterThanOrEqual(since);
      expect(String(entry.worklogId)).toMatch(/^\d+$/);
    }
  });

  it('removes the worklog and returns the issue total to zero', async () => {
    const all = await client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issue.key });

    for (const worklog of all.worklogs ?? []) {
      await client.issueWorklogs.deleteWorklog({ issueIdOrKey: issue.key, id: worklog.id! });
    }

    const remaining = await client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issue.key });

    expect(remaining.total).toBe(0);

    const error = await client.issueWorklogs
      .getWorklog({ issueIdOrKey: issue.key, id: worklogId })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('rejects a duration Jira cannot parse', async () => {
    const error = await client.issueWorklogs
      .addWorklog({ issueIdOrKey: issue.key, timeSpent: 'not a duration' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('surfaces worklogs of a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueWorklogs
      .getIssueWorklog({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
