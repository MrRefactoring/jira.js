import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, documentOf, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueComments` API (`getComments`, `addComment`, `getComment`, `updateComment`,
 * `deleteComment`, `getCommentsByIds`).
 *
 * A full create-read-update-delete cycle on comments attached to a fixture issue — safe, self-cleaning, and the
 * densest write surface the library has.
 *
 * The rich-text routing these endpoints perform is covered separately in `adfRouting.test.ts`, against a real site.
 * Here the concern is everything else: paging, ordering, `expand`, and that an update is a replacement.
 */
describe('Jira Cloud — issueComments (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  let commentId: string;

  /** Kept from creation so later assertions can compare against it without refetching. */
  let created: Awaited<ReturnType<typeof client.issueComments.addComment>>;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);

    const empty = await client.issueComments.getComments({ issueIdOrKey: issue.key });

    expect(empty.comments).toEqual([]);
    expect(empty.total).toBe(0);

    created = await client.issueComments.addComment({
      issueIdOrKey: issue.key,
      body: documentOf('first comment'),
    });
    commentId = created.id!;
  });

  afterAll(() => tracker.cleanup());

  it('creates a comment carrying an author, timestamps and a document body', () => {
    expect(created.id).toMatch(/^\d+$/);
    expect(created.self).toMatch(/^https:\/\//);
    expect(created.author?.accountId).toBeTruthy();
    expect(created.body).toMatchObject({ type: 'doc', version: 1 });
  });

  it('hands back timestamps as Date objects, not the strings on the wire', () => {
    expect(created.created).toBeInstanceOf(Date);
    expect(created.updated).toBeInstanceOf(Date);
    expect(created.updated!.getTime()).toBe(created.created!.getTime());
  });

  it('reads the comment back by id, identical to what creation returned', async () => {
    const fetched = await client.issueComments.getComment({ issueIdOrKey: issue.key, id: commentId });

    expect(fetched.id).toBe(commentId);
    expect(JSON.stringify(fetched.body)).toContain('first comment');
  });

  it('renders the body as HTML only when `expand` asks for it', async () => {
    const plain = await client.issueComments.getComment({ issueIdOrKey: issue.key, id: commentId });
    const rendered = await client.issueComments.getComment({
      issueIdOrKey: issue.key,
      id: commentId,
      expand: 'renderedBody',
    });

    expect(plain.renderedBody).toBeUndefined();
    expect(rendered.renderedBody).toContain('first comment');
    expect(rendered.renderedBody).toContain('<p>');
  });

  it('replaces the body on update and moves `updated` past `created`', async () => {
    const updated = await client.issueComments.updateComment({
      issueIdOrKey: issue.key,
      id: commentId,
      body: { body: documentOf('edited comment') },
    });

    expect(JSON.stringify(updated.body)).toContain('edited comment');
    expect(JSON.stringify(updated.body)).not.toContain('first comment');
    expect(updated.updated!.getTime()).toBeGreaterThan(created.created!.getTime());
  });

  it('pages and orders the comment list', async () => {
    await client.issueComments.addComment({ issueIdOrKey: issue.key, body: documentOf('second') });
    await client.issueComments.addComment({ issueIdOrKey: issue.key, body: documentOf('third') });

    const all = await client.issueComments.getComments({ issueIdOrKey: issue.key });

    expect(all.total).toBe(3);

    const firstPage = await client.issueComments.getComments({ issueIdOrKey: issue.key, maxResults: 2 });

    expect(firstPage.comments).toHaveLength(2);
    expect(firstPage.maxResults).toBe(2);

    const secondPage = await client.issueComments.getComments({ issueIdOrKey: issue.key, startAt: 2 });

    expect(secondPage.startAt).toBe(2);
    expect(secondPage.comments).toHaveLength(1);

    const descending = await client.issueComments.getComments({ issueIdOrKey: issue.key, orderBy: '-created' });

    expect(descending.comments?.map(comment => comment.id)).toEqual(all.comments?.map(comment => comment.id).reverse());
  });

  it('fetches comments across issues by id in one call', async () => {
    const all = await client.issueComments.getComments({ issueIdOrKey: issue.key });
    const ids = all.comments!.map(comment => comment.id!);

    const byIds = await client.issueComments.getCommentsByIds({ ids: ids.map(Number) });

    expect(byIds.values?.map(comment => comment.id).sort()).toEqual([...ids].sort());
  });

  it('removes the comment and drops it from the listing', async () => {
    await client.issueComments.deleteComment({ issueIdOrKey: issue.key, id: commentId });

    const error = await client.issueComments
      .getComment({ issueIdOrKey: issue.key, id: commentId })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);

    const remaining = await client.issueComments.getComments({ issueIdOrKey: issue.key });

    expect(remaining.total).toBe(2);
    expect(remaining.comments?.map(comment => comment.id)).not.toContain(commentId);
  });

  it('surfaces comments on a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueComments
      .getComments({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
