import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueNotificationSchemes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getNotificationSchemes', () => {
    it('returns PageNotificationScheme', async () => {
      const result = await live.client.issueNotificationSchemes.getNotificationSchemes({ maxResults: '5' });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getNotificationScheme', () => {
    it('returns a NotificationScheme by id', async (ctx: TestContext) => {
      const page = await live.client.issueNotificationSchemes.getNotificationSchemes({ maxResults: '1' });

      if (!page.values || page.values.length === 0) { ctx.skip(); return; }

      const id = page.values[0]!.id!;
      const result = await live.client.issueNotificationSchemes.getNotificationScheme({ id });

      expect(result.id).toBe(id);
    });
  });

  describe('getNotificationSchemeToProjectMappings', () => {
    it('returns mappings', async () => {
      const result = await live.client.issueNotificationSchemes.getNotificationSchemeToProjectMappings({
        maxResults: '5',
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });
});
