import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('workflowSchemes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllWorkflowSchemes', () => {
    it('returns PageWorkflowScheme', async () => {
      const result = await live.client.workflowSchemes.getAllWorkflowSchemes({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getWorkflowScheme', () => {
    it('returns WorkflowScheme by id', async (ctx: TestContext) => {
      const page = await live.client.workflowSchemes.getAllWorkflowSchemes({ maxResults: 1 });

      if (!page.values || page.values.length === 0) { ctx.skip(); return; }

      const schemeId = page.values[0]!.id!;
      const result = await live.client.workflowSchemes.getWorkflowScheme({ id: schemeId });

      expect(result.id).toBe(schemeId);
    });
  });

  describe('readWorkflowSchemes', () => {
    it('returns WorkflowSchemeReadResponse array', async (ctx: TestContext) => {
      const page = await live.client.workflowSchemes.getAllWorkflowSchemes({ maxResults: 1 });

      if (!page.values || page.values.length === 0) { ctx.skip(); return; }

      const schemeId = String(page.values[0]!.id!);
      const result = await live.client.workflowSchemes.readWorkflowSchemes({
        workflowSchemeIds: [schemeId],
      });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
