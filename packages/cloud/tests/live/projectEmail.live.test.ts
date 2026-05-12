import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectEmail — live', () => {
  let live: LiveCloudClient;
  let projectId: number;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const projects = await live.client.projects.searchProjects({ keys: [handle.projectKey] });
    projectId = Number(projects.values?.[0]?.id ?? 0);
  });

  describe('getProjectEmail', () => {
    it('returns ProjectEmailAddress', async (ctx: TestContext) => {
      if (!projectId) { ctx.skip(); return; }

      const result = await live.client.projectEmail.getProjectEmail({ projectId });

      expect(result).toBeDefined();
    });
  });
});
