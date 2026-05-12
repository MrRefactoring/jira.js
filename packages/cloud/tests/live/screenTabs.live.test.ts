import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('screenTabs — live', () => {
  let live: LiveCloudClient;
  let screenId: number;

  beforeAll(async () => {
    live = createLiveCloudClient();

    const page = await live.client.screens.getScreens({ maxResults: 1 });
    screenId = page.values?.[0]?.id ?? 0;
  });

  describe('getAllScreenTabs', () => {
    it('returns array of ScreenableTab', async (ctx: TestContext) => {
      if (!screenId) { ctx.skip(); return; }

      const result = await live.client.screenTabs.getAllScreenTabs({ screenId });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
