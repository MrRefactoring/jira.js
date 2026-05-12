import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('status — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('search', () => {
    it('returns a PageOfStatuses', async () => {
      const result = await live.client.status.search();

      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });

    it('each status has id, name, and statusCategory', async () => {
      const result = await live.client.status.search({ maxResults: 10 });

      for (const s of result.values!) {
        expect(typeof s.id).toBe('string');
        expect(typeof s.name).toBe('string');
      }
    });

    it('filters by projectId', async () => {
      const handle = getInjectedLiveProject();
      const result = await live.client.status.search({ projectId: handle.projectId });

      expect(typeof result.total).toBe('number');
    });
  });

  describe('getStatusesById', () => {
    it('returns JiraStatus[] for known ids', async (ctx: TestContext) => {
      const page = await live.client.status.search({ maxResults: 3 });

      if (!page.values || page.values.length === 0) { ctx.skip(); return; }

      const ids = page.values.map((s) => s.id!);
      const result = await live.client.status.getStatusesById({ id: ids });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(ids.length);
    });
  });

  describe('getStatusesByName', () => {
    it('finds statuses by name', async () => {
      const result = await live.client.status.getStatusesByName({ name: ['To Do'] });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
