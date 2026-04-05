import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

// user.notifications.mimetype is a string preference ('html' | 'text'); safe to set and remove
const PREF_KEY = 'user.notifications.mimetype';

describe('myself — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getCurrentUser', () => {
    it('returns current user with accountId', async () => {
      const result = await live.client.myself.getCurrentUser();

      expect(typeof result.accountId).toBe('string');
      expect(result.accountId!.length).toBeGreaterThan(0);
    });

    it('returns current user with displayName', async () => {
      const result = await live.client.myself.getCurrentUser();

      expect(typeof result.displayName).toBe('string');
    });

    it('active is true', async () => {
      const result = await live.client.myself.getCurrentUser();

      expect(result.active).toBe(true);
    });
  });

  describe('getLocale', () => {
    it('returns a locale string', async () => {
      const result = await live.client.myself.getLocale();

      expect(typeof result.locale).toBe('string');
      expect(result.locale!.length).toBeGreaterThan(0);
    });
  });

  describe('preference round-trip', () => {
    it('set → get → remove works correctly', async () => {
      await live.client.myself.setPreference({ key: PREF_KEY, body: 'text' as unknown as Record<string, unknown> });

      const value = await live.client.myself.getPreference({ key: PREF_KEY });
      expect(value).toBe('text');

      await live.client.myself.removePreference({ key: PREF_KEY });

      // After removal the key reverts to default (html); a fresh set should also succeed
      await live.client.myself.setPreference({ key: PREF_KEY, body: 'html' as unknown as Record<string, unknown> });
      const reset = await live.client.myself.getPreference({ key: PREF_KEY });
      expect(reset).toBe('html');

      // Restore original state
      await live.client.myself.removePreference({ key: PREF_KEY });
    });
  });
});
