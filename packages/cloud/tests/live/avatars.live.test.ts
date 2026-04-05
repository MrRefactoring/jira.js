import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('avatars — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllSystemAvatars', () => {
    it('returns system avatars for issuetype', async () => {
      const result = await live.client.avatars.getAllSystemAvatars({ type: 'issuetype' });

      expect(result).toBeDefined();
      expect(Array.isArray(result.system)).toBe(true);
      expect(result.system!.length).toBeGreaterThan(0);
    });
  });

  describe('getAvatars', () => {
    it('returns avatars for a project', async () => {
      const result = await live.client.avatars.getAvatars({ type: 'project', entityId: 'unknown' });

      expect(result).toBeDefined();
    });
  });
});
