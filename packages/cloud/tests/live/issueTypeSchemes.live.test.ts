import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueTypeSchemes — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectKey = handle.projectKey;
  });

  describe('getAllIssueTypeSchemes', () => {
    it('returns PageIssueTypeScheme', async () => {
      const result = await live.client.issueTypeSchemes.getAllIssueTypeSchemes({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getIssueTypeSchemesMapping', () => {
    it('returns PageIssueTypeSchemeMapping', async () => {
      const result = await live.client.issueTypeSchemes.getIssueTypeSchemesMapping({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getIssueTypeSchemeForProjects', () => {
    it('returns PageIssueTypeSchemeProjects', async (ctx: TestContext) => {
      const projects = await live.client.projects.searchProjects({ keys: [projectKey] });
      const numericId = Number(projects.values?.[0]?.id);

      if (!numericId) { ctx.skip(); return; }

      const result = await live.client.issueTypeSchemes.getIssueTypeSchemeForProjects({
        projectId: [numericId],
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });
});
