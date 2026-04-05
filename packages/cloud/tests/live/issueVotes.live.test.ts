import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueVotes — live', () => {
  let live: LiveCloudClient;
  let issueKey: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        summary: 'issueVotes live test',
        issuetype: { name: 'Task' },
      },
    });

    issueKey = issue.key!;
  });

  describe('getVotes', () => {
    it('returns votes for an issue', async () => {
      const result = await live.client.issueVotes.getVotes({ issueIdOrKey: issueKey });

      expect(typeof result.votes).toBe('number');
      expect(typeof result.hasVoted).toBe('boolean');
    });
  });
});
