import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueWatchers — live', () => {
  let live: LiveCloudClient;
  let issueKey: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        summary: 'issueWatchers live test',
        issuetype: { name: 'Task' },
      },
    });

    issueKey = issue.key!;
  });

  describe('getIssueWatchers', () => {
    it('returns watchers for an issue', async () => {
      const result = await live.client.issueWatchers.getIssueWatchers({ issueIdOrKey: issueKey });

      expect(typeof result.watchCount).toBe('number');
      expect(typeof result.isWatching).toBe('boolean');
      expect(Array.isArray(result.watchers)).toBe(true);
    });
  });

  describe('getIsWatchingIssueBulk', () => {
    it('returns bulk watch status', async () => {
      const issue = await live.client.issues.getIssue({ issueIdOrKey: issueKey });
      const numericId = String(issue.id!);
      const result = await live.client.issueWatchers.getIsWatchingIssueBulk({ issueIds: [numericId] });

      expect(result).toBeDefined();
    });
  });
});
