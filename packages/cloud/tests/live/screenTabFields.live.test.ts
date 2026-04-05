import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('screenTabFields — live', () => {
  let live: LiveCloudClient;
  let screenId: number;
  let tabId: number;

  beforeAll(async () => {
    live = createLiveCloudClient();

    const page = await live.client.screens.getScreens({ maxResults: 1 });
    screenId = page.values?.[0]?.id ?? 0;

    if (screenId) {
      const tabs = await live.client.screenTabs.getAllScreenTabs({ screenId });
      tabId = tabs[0]?.id ?? 0;
    }
  });

  describe('getAllScreenTabFields', () => {
    it('returns array of ScreenableField', async (ctx: TestContext) => {
      if (!screenId || !tabId) { ctx.skip(); return; }

      const result = await live.client.screenTabFields.getAllScreenTabFields({ screenId, tabId });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
