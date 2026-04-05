import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('screenSchemes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getScreenSchemes', () => {
    it('returns PageScreenScheme', async () => {
      const result = await live.client.screenSchemes.getScreenSchemes({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
      expect(result.values!.length).toBeGreaterThan(0);

      const scheme = result.values![0]!;
      expect(typeof scheme.id).toBe('number');
      expect(typeof scheme.name).toBe('string');
    });
  });
});
