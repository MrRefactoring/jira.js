import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueBulkOperations — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;
  let issueKey: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectKey = handle.projectKey;

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: projectKey },
        summary: 'issueBulkOperations live test',
        issuetype: { name: 'Task' },
      },
    });

    issueKey = issue.key!;
  });

  describe('getBulkEditableFields', () => {
    it('returns BulkEditGetFields', async () => {
      const result = await live.client.issueBulkOperations.getBulkEditableFields({
        issueIdsOrKeys: issueKey,
      });

      expect(result).toBeDefined();
    });
  });

  describe('getAvailableTransitions', () => {
    it('returns BulkTransitionGetAvailableTransitions', async () => {
      const result = await live.client.issueBulkOperations.getAvailableTransitions({
        issueIdsOrKeys: issueKey,
      });

      expect(result).toBeDefined();
    });
  });

  describe('getBulkOperationProgress', () => {
    it.todo('returns BulkOperationProgress — requires a running bulk operation task id');
  });
});
