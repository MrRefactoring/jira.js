import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('announcementBanner — live', () => {
  let live: LiveCloudClient;
  let original: { isDismissible?: boolean; isEnabled?: boolean; message?: string; visibility?: string };

  beforeAll(async () => {
    live = createLiveCloudClient();
    const banner = await live.client.announcementBanner.getBanner();
    original = {
      isDismissible: banner.isDismissible,
      isEnabled: banner.isEnabled,
      message: banner.message,
      visibility: banner.visibility,
    };
  }, 30_000);

  afterAll(async () => {
    await live.client.announcementBanner.setBanner({
      isDismissible: original.isDismissible,
      isEnabled: original.isEnabled,
      message: original.message ?? '',
      visibility: original.visibility as 'public' | 'private' | undefined,
    });
  }, 30_000);

  describe('getBanner', () => {
    it('returns announcement banner configuration', async () => {
      const result = await live.client.announcementBanner.getBanner();

      expect(typeof result.hashId === 'string' || result.hashId === undefined).toBe(true);
      expect(typeof result.isDismissible === 'boolean' || result.isDismissible === undefined).toBe(true);
      expect(typeof result.isEnabled === 'boolean' || result.isEnabled === undefined).toBe(true);
    });
  });

  describe('setBanner', () => {
    it('updates the banner and change is reflected in getBanner', async () => {
      await live.client.announcementBanner.setBanner({
        isDismissible: true,
        isEnabled: false,
        message: 'sdk-live-test',
        visibility: 'private',
      });

      const result = await live.client.announcementBanner.getBanner();

      expect(result.isDismissible).toBe(true);
      expect(result.isEnabled).toBe(false);
      expect(result.message).toBe('sdk-live-test');
      expect(result.visibility).toBe('private');
    });

    it('returns void', async () => {
      const result = await live.client.announcementBanner.setBanner({
        isDismissible: false,
        isEnabled: false,
        message: '',
        visibility: 'private',
      });

      expect(result).toBeUndefined();
    });
  });
});
