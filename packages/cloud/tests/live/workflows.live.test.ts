import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('workflows — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('searchWorkflows', () => {
    it('returns WorkflowSearchResponse', async () => {
      const result = await live.client.workflows.searchWorkflows({ maxResults: 5 });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('readWorkflows', () => {
    it('returns WorkflowReadResponse for existing workflow', async (ctx: TestContext) => {
      const search = await live.client.workflows.searchWorkflows({ maxResults: 1 });

      if (!search.values || search.values.length === 0) { ctx.skip(); return; }

      const workflowId = search.values[0]!.id;
      if (!workflowId) { ctx.skip(); return; }

      const result = await live.client.workflows.readWorkflows({
        workflowIds: [workflowId],
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.workflows)).toBe(true);
    });
  });

  describe('workflowCapabilities', () => {
    it('returns WorkflowCapabilities for a workflow', async (ctx: TestContext) => {
      const search = await live.client.workflows.searchWorkflows({ maxResults: 1 });

      if (!search.values || search.values.length === 0) { ctx.skip(); return; }

      const workflowId = search.values[0]!.id;
      if (!workflowId) { ctx.skip(); return; }

      const result = await live.client.workflows.workflowCapabilities({ workflowId });

      expect(result).toBeDefined();
    });
  });

  describe('getDefaultEditor', () => {
    it('returns DefaultWorkflowEditorResponse', async () => {
      const result = await live.client.workflows.getDefaultEditor();

      expect(result).toBeDefined();
    });
  });
});
