import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueProperties — live', () => {
  let live: LiveCloudClient;
  let issueIdOrKey: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        summary: 'issueProperties live test',
        issuetype: { name: 'Task' },
      },
    });

    issueIdOrKey = issue.key!;
  });

  describe('getIssuePropertyKeys', () => {
    it('returns PropertyKeys', async () => {
      const result = await live.client.issueProperties.getIssuePropertyKeys({ issueIdOrKey });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });
  });

  describe('setIssueProperty / getIssueProperty / deleteIssueProperty', () => {
    it('full property lifecycle', async () => {
      const propertyKey = 'live-test-prop';

      await live.client.issueProperties.setIssueProperty({
        issueIdOrKey,
        propertyKey,
        body: { value: 'hello' },
      });

      const got = await live.client.issueProperties.getIssueProperty({ issueIdOrKey, propertyKey });

      expect(got.key).toBe(propertyKey);

      await live.client.issueProperties.deleteIssueProperty({ issueIdOrKey, propertyKey });
    });
  });
});
