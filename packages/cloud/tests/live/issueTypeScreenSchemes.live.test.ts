import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('issueTypeScreenSchemes — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectKey = handle.projectKey;
  });

  describe('getIssueTypeScreenSchemes', () => {
    it('returns PageIssueTypeScreenScheme', async () => {
      const result = await live.client.issueTypeScreenSchemes.getIssueTypeScreenSchemes({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getIssueTypeScreenSchemeMappings', () => {
    it('returns PageIssueTypeScreenSchemeItem', async () => {
      const result = await live.client.issueTypeScreenSchemes.getIssueTypeScreenSchemeMappings({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getIssueTypeScreenSchemeProjectAssociations', () => {
    it('returns PageIssueTypeScreenSchemesProjects', async (ctx: TestContext) => {
      const projects = await live.client.projects.searchProjects({ keys: [projectKey] });
      const numericId = Number(projects.values?.[0]?.id);

      if (!numericId) { ctx.skip(); return; }

      const result = await live.client.issueTypeScreenSchemes.getIssueTypeScreenSchemeProjectAssociations({
        projectId: [numericId],
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getProjectsForIssueTypeScreenScheme', () => {
    it('returns PageProjectDetails for first scheme', async (ctx: TestContext) => {
      const schemes = await live.client.issueTypeScreenSchemes.getIssueTypeScreenSchemes({ maxResults: 1 });

      if (!schemes.values || schemes.values.length === 0) { ctx.skip(); return; }

      const schemeId = Number(schemes.values[0]!.id!);
      const result = await live.client.issueTypeScreenSchemes.getProjectsForIssueTypeScreenScheme({
        issueTypeScreenSchemeId: schemeId,
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });
});
