import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueRemoteLinks — live', () => {
  let live: LiveCloudClient;
  let issueIdOrKey: string;
  let remoteLinkId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        summary: 'issueRemoteLinks live test',
        issuetype: { name: 'Task' },
      },
    });

    issueIdOrKey = issue.key!;

    const link = await live.client.issueRemoteLinks.createOrUpdateRemoteIssueLink({
      issueIdOrKey,
      object: {
        url: 'https://example.com',
        title: 'Example Link',
      },
    });

    remoteLinkId = String(link.id!);
  });

  describe('getRemoteIssueLinks', () => {
    it('returns remote links for an issue', async () => {
      const result = await live.client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey });

      expect(result).toBeDefined();
    });
  });

  describe('getRemoteIssueLinkById', () => {
    it('returns a specific remote link', async () => {
      const result = await live.client.issueRemoteLinks.getRemoteIssueLinkById({
        issueIdOrKey,
        linkId: remoteLinkId,
      });

      expect(String(result.id)).toBe(remoteLinkId);
    });
  });

  describe('deleteRemoteIssueLinkById', () => {
    it('deletes a remote link', async () => {
      await live.client.issueRemoteLinks.deleteRemoteIssueLinkById({
        issueIdOrKey,
        linkId: remoteLinkId,
      });
    });
  });
});
