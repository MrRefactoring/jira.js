import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';
import { uid } from './helpers/namespace';
import { ResourceRegistry } from './helpers/resourceRegistry';
import { LIVE_SETUP_TIMEOUT } from './helpers/liveTestConstants';

const adf = (text: string) => ({
  type: 'doc',
  version: 1,
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
});

describe('issueComments — live', () => {
  let live: LiveCloudClient;
  let issueId: string;
  let issueKey: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        issuetype: { name: 'Task' },
        summary: uid('sdk-comment-issue'),
      },
    });

    issueId = issue.id;
    issueKey = issue.key!;
  }, LIVE_SETUP_TIMEOUT);

  afterAll(async () => {
    await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
  }, LIVE_SETUP_TIMEOUT);

  describe('addComment', () => {
    const registry = new ResourceRegistry();

    afterAll(() => registry.cleanup(), LIVE_SETUP_TIMEOUT);

    it('returns a Comment with id, created, and body', async () => {
      const result = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf('hello'),
      });

      registry.register({
        kind: 'comment',
        id: result.id!,
        delete: () => live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: result.id! }),
      });

      expect(typeof result.id).toBe('string');
      expect(result.body).toBeDefined();
      expect(result.created).toBeInstanceOf(Date);
    });

    it('added comment body contains the submitted text', async () => {
      const text = uid('sdk-comment-body');

      const result = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf(text),
      });

      registry.register({
        kind: 'comment',
        id: result.id!,
        delete: () => live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: result.id! }),
      });

      expect(JSON.stringify(result.body)).toContain(text);
    });
  });

  describe('getComments', () => {
    let commentId: string;

    beforeAll(async () => {
      const added = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf('getComments-test'),
      });

      commentId = added.id!;
    }, LIVE_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: commentId }).catch(() => {});
    }, LIVE_SETUP_TIMEOUT);

    it('returns a page with the added comment in the comments array', async () => {
      const page = await live.client.issueComments.getComments({ issueIdOrKey: issueKey });

      expect(Array.isArray(page.comments)).toBe(true);
      expect((page.comments ?? []).some(c => c.id === commentId)).toBe(true);
    });

    it('page includes total, startAt, and maxResults pagination fields', async () => {
      const page = await live.client.issueComments.getComments({ issueIdOrKey: issueKey });

      expect(typeof page.total).toBe('number');
      expect(typeof page.startAt).toBe('number');
      expect(typeof page.maxResults).toBe('number');
    });

    it('maxResults:1 returns at most one comment', async () => {
      const page = await live.client.issueComments.getComments({
        issueIdOrKey: issueKey,
        maxResults: 1,
      });

      expect((page.comments ?? []).length).toBeLessThanOrEqual(1);
    });
  });

  describe('getComment', () => {
    let commentId: string;
    let commentText: string;

    beforeAll(async () => {
      commentText = uid('sdk-get-comment');

      const added = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf(commentText),
      });

      commentId = added.id!;
    }, LIVE_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: commentId }).catch(() => {});
    }, LIVE_SETUP_TIMEOUT);

    it('returns the comment with matching id', async () => {
      const single = await live.client.issueComments.getComment({ issueIdOrKey: issueKey, id: commentId });

      expect(single.id).toBe(commentId);
    });

    it('returned body contains the original text', async () => {
      const single = await live.client.issueComments.getComment({ issueIdOrKey: issueKey, id: commentId });

      expect(JSON.stringify(single.body)).toContain(commentText);
    });
  });

  describe('updateComment', () => {
    let commentId: string;

    beforeAll(async () => {
      const added = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf('original'),
      });

      commentId = added.id!;
    }, LIVE_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: commentId }).catch(() => {});
    }, LIVE_SETUP_TIMEOUT);

    it('returns the updated comment with the same id', async () => {
      const updated = await live.client.issueComments.updateComment({
        issueIdOrKey: issueKey,
        id: commentId,
        body: adf('updated-content'),
      });

      expect(updated.id).toBe(commentId);
    });

    it('updated body content is persisted when the comment is fetched again', async () => {
      const newText = uid('sdk-update-verify');

      await live.client.issueComments.updateComment({
        issueIdOrKey: issueKey,
        id: commentId,
        body: adf(newText),
      });

      const fetched = await live.client.issueComments.getComment({ issueIdOrKey: issueKey, id: commentId });

      expect(JSON.stringify(fetched.body)).toContain(newText);
    });
  });

  describe('deleteComment', () => {
    it('deleteComment returns void', async () => {
      const added = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf('to-be-deleted'),
      });

      const result = await live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: added.id! });

      expect(result).toBeUndefined();
    });

    it('deleted comment is absent from getComments', async () => {
      const added = await live.client.issueComments.addComment({
        issueIdOrKey: issueKey,
        body: adf('delete-verify'),
      });

      await live.client.issueComments.deleteComment({ issueIdOrKey: issueKey, id: added.id! });

      const page = await live.client.issueComments.getComments({ issueIdOrKey: issueKey });
      const found = (page.comments ?? []).find(c => c.id === added.id);

      expect(found).toBeUndefined();
    });
  });
});
