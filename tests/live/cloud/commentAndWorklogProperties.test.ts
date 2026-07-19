import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, documentOf, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueCommentProperties` and `issueWorklogProperties` APIs.
 *
 * The last two homes of the entity-property mechanism, after issues, projects, users and issue types. Both are
 * exercised in full: their parents are fixture objects this suite created, so the whole cycle is contained.
 *
 * Grouped in one file because the point is the comparison. Six modules share this mechanism, and the interesting
 * question is no longer "does it store JSON" — it is whether the six namespaces are genuinely separate, which is
 * asserted here across the two that hang off the shortest-lived parents.
 */

const PROPERTY_KEY = 'jira.js.livetest.child';

describe('Jira Cloud — comment and worklog properties (live, round trip)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  let commentId: string;
  let worklogId: string;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);

    const comment = await client.issueComments.addComment({
      issueIdOrKey: issue.key,
      body: documentOf('property carrier'),
    });

    commentId = comment.id!;

    const worklog = await client.issueWorklogs.addWorklog({ issueIdOrKey: issue.key, timeSpent: '10m' });

    worklogId = worklog.id!;
  });

  afterAll(() => tracker.cleanup());

  it('stores a property on a comment and reads it back', async () => {
    await client.issueCommentProperties.setCommentProperty({
      commentId,
      propertyKey: PROPERTY_KEY,
      body: { on: 'comment' },
    });

    const property = await client.issueCommentProperties.getCommentProperty({ commentId, propertyKey: PROPERTY_KEY });

    expect(property.key).toBe(PROPERTY_KEY);
    expect(property.value).toEqual({ on: 'comment' });
  });

  it('stores a property on a worklog and reads it back', async () => {
    await client.issueWorklogProperties.setWorklogProperty({
      issueIdOrKey: issue.key,
      worklogId,
      propertyKey: PROPERTY_KEY,
      body: { on: 'worklog' },
    });

    const property = await client.issueWorklogProperties.getWorklogProperty({
      issueIdOrKey: issue.key,
      worklogId,
      propertyKey: PROPERTY_KEY,
    });

    expect(property.value).toEqual({ on: 'worklog' });
  });

  it('keeps the namespaces genuinely separate', async () => {
    const onComment = await client.issueCommentProperties.getCommentProperty({ commentId, propertyKey: PROPERTY_KEY });
    const onWorklog = await client.issueWorklogProperties.getWorklogProperty({
      issueIdOrKey: issue.key,
      worklogId,
      propertyKey: PROPERTY_KEY,
    });

    // Same key, same issue, different values — six APIs share one shape and one
    // key format, and nothing but the URL keeps them apart.
    expect(onComment.value).toEqual({ on: 'comment' });
    expect(onWorklog.value).toEqual({ on: 'worklog' });

    // And the key does not leak onto the issue itself.
    const onIssue = await client.issueProperties
      .getIssueProperty({ issueIdOrKey: issue.key, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(onIssue)).toBe(true);
  });

  it('lists the keys on each parent', async () => {
    const commentKeys = await client.issueCommentProperties.getCommentPropertyKeys({ commentId });
    const worklogKeys = await client.issueWorklogProperties.getWorklogPropertyKeys({
      issueIdOrKey: issue.key,
      worklogId,
    });

    expect(commentKeys.keys?.map(entry => entry.key)).toContain(PROPERTY_KEY);
    expect(worklogKeys.keys?.map(entry => entry.key)).toContain(PROPERTY_KEY);
  });

  it('deletes each independently', async () => {
    await client.issueCommentProperties.deleteCommentProperty({ commentId, propertyKey: PROPERTY_KEY });

    const goneFromComment = await client.issueCommentProperties
      .getCommentProperty({ commentId, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(goneFromComment)).toBe(true);

    // The worklog's copy survives — deletion is per-namespace, not per-key.
    const stillOnWorklog = await client.issueWorklogProperties.getWorklogProperty({
      issueIdOrKey: issue.key,
      worklogId,
      propertyKey: PROPERTY_KEY,
    });

    expect(stillOnWorklog.value).toEqual({ on: 'worklog' });

    await client.issueWorklogProperties.deleteWorklogProperty({
      issueIdOrKey: issue.key,
      worklogId,
      propertyKey: PROPERTY_KEY,
    });
  });

  it('surfaces a property on a missing comment as a typed error', async () => {
    const error = await client.issueCommentProperties
      .getCommentProperty({ commentId: '99999999', propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
