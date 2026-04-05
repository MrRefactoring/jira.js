import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('screens — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getScreens', () => {
    it('returns PageScreen', async () => {
      const result = await live.client.screens.getScreens({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getAvailableScreenFields', () => {
    it('returns array of ScreenableField for first screen', async (ctx: TestContext) => {
      const page = await live.client.screens.getScreens({ maxResults: 1 });

      if (!page.values || page.values.length === 0) { ctx.skip(); return; }

      const screenId = page.values[0]!.id!;
      const result = await live.client.screens.getAvailableScreenFields({ screenId });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
