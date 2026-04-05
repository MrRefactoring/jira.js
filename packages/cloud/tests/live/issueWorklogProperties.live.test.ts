import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueWorklogProperties — live', () => {
  let live: LiveCloudClient;
  let issueIdOrKey: string;
  let worklogId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        summary: 'issueWorklogProperties live test',
        issuetype: { name: 'Task' },
      },
    });

    issueIdOrKey = issue.key!;

    const worklog = await live.client.issueWorklogs.addWorklog({
      issueIdOrKey,
      timeSpentSeconds: 3600,
      started: new Date().toISOString().replace('Z', '+0000'),
    });

    worklogId = String(worklog.id!);
  });

  describe('getWorklogPropertyKeys', () => {
    it('returns PropertyKeys', async () => {
      const result = await live.client.issueWorklogProperties.getWorklogPropertyKeys({
        issueIdOrKey,
        worklogId,
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });
  });

  describe('setWorklogProperty / getWorklogProperty / deleteWorklogProperty', () => {
    it('full property lifecycle', async () => {
      const propertyKey = 'live-test-prop';

      await live.client.issueWorklogProperties.setWorklogProperty({
        issueIdOrKey,
        worklogId,
        propertyKey,
        body: { value: 'test' },
      });

      const got = await live.client.issueWorklogProperties.getWorklogProperty({
        issueIdOrKey,
        worklogId,
        propertyKey,
      });

      expect(got.key).toBe(propertyKey);

      await live.client.issueWorklogProperties.deleteWorklogProperty({
        issueIdOrKey,
        worklogId,
        propertyKey,
      });
    });
  });
});
