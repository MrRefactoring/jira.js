import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('workflowSchemeProjectAssociations — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectKey = handle.projectKey;
  });

  describe('getWorkflowSchemeProjectAssociations', () => {
    it('returns ContainerOfWorkflowSchemeAssociations', async (ctx: TestContext) => {
      const projects = await live.client.projects.searchProjects({ keys: [projectKey] });
      const numericId = Number(projects.values?.[0]?.id);

      if (!numericId) { ctx.skip(); return; }

      const result = await live.client.workflowSchemeProjectAssociations.getWorkflowSchemeProjectAssociations({
        projectId: [numericId],
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
    });
  });
});
