import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueCommentProperties — live', () => {
  let live: LiveCloudClient;
  let commentId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        summary: 'issueCommentProperties live test',
        issuetype: { name: 'Task' },
      },
    });

    const comment = await live.client.issueComments.addComment({
      issueIdOrKey: issue.key!,
      body: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'test' }] }] },
    });

    commentId = String(comment.id!);
  });

  describe('getCommentPropertyKeys', () => {
    it('returns PropertyKeys', async () => {
      const result = await live.client.issueCommentProperties.getCommentPropertyKeys({ commentId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });
  });

  describe('setCommentProperty / getCommentProperty / deleteCommentProperty', () => {
    it('full property lifecycle', async () => {
      const propertyKey = 'live-test-prop';

      await live.client.issueCommentProperties.setCommentProperty({
        commentId,
        propertyKey,
        body: { value: 'test' },
      });

      const got = await live.client.issueCommentProperties.getCommentProperty({ commentId, propertyKey });

      expect(got.key).toBe(propertyKey);

      await live.client.issueCommentProperties.deleteCommentProperty({ commentId, propertyKey });
    });
  });
});
