import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueLinks — live', () => {
  let live: LiveCloudClient;
  let issueKeyA: string;
  let issueKeyB: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    const [issueA, issueB] = await Promise.all([
      live.client.issues.createIssue({
        fields: { project: { key: handle.projectKey }, summary: 'issueLinks test A', issuetype: { name: 'Task' } },
      }),
      live.client.issues.createIssue({
        fields: { project: { key: handle.projectKey }, summary: 'issueLinks test B', issuetype: { name: 'Task' } },
      }),
    ]);

    issueKeyA = issueA.key!;
    issueKeyB = issueB.key!;
  });

  describe('linkIssues / getIssueLink / deleteIssueLink', () => {
    it('full lifecycle', async () => {
      const linkTypes = await live.client.issueLinkTypes.getIssueLinkTypes();
      const linkType = linkTypes.issueLinkTypes![0]!;

      await live.client.issueLinks.linkIssues({
        type: { name: linkType.name },
        inwardIssue: { key: issueKeyA },
        outwardIssue: { key: issueKeyB },
      });

      const issueWithLink = await live.client.issues.getIssue({ issueIdOrKey: issueKeyA });
      const links = (issueWithLink.fields as Record<string, unknown>)?.issuelinks as { id?: string }[] | undefined;

      expect(Array.isArray(links)).toBe(true);
      expect(links!.length).toBeGreaterThan(0);

      const linkId = links![0]!.id!;
      const fetchedLink = await live.client.issueLinks.getIssueLink({ linkId });

      expect(fetchedLink.id).toBe(linkId);

      await live.client.issueLinks.deleteIssueLink({ linkId });
    });
  });
});
