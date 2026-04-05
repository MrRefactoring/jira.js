import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('dashboards — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllDashboards', () => {
    it('returns PageOfDashboards', async () => {
      const result = await live.client.dashboards.getAllDashboards();

      expect(typeof result.startAt).toBe('number');
      expect(typeof result.maxResults).toBe('number');
      expect(Array.isArray(result.dashboards)).toBe(true);
    });
  });

  describe('getDashboardsPaginated', () => {
    it('returns paginated dashboards', async () => {
      const result = await live.client.dashboards.getDashboardsPaginated({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getDashboard', () => {
    it('returns Dashboard by id', async (ctx: TestContext) => {
      const page = await live.client.dashboards.getAllDashboards({ maxResults: 1 });

      if (!page.dashboards || page.dashboards.length === 0) { ctx.skip(); return; }

      const id = page.dashboards[0]!.id!;
      const result = await live.client.dashboards.getDashboard({ id });

      expect(result.id).toBe(id);
      expect(typeof result.name).toBe('string');
    });
  });
});
