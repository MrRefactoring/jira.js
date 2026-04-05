import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('labels — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllLabels', () => {
    it('returns a PageString with values array', async () => {
      const result = await live.client.labels.getAllLabels();

      expect(typeof result.startAt).toBe('number');
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });

    it('respects maxResults parameter', async () => {
      const result = await live.client.labels.getAllLabels({ maxResults: 5 });

      expect(result.values!.length).toBeLessThanOrEqual(5);
    });

    it('values are strings', async () => {
      const result = await live.client.labels.getAllLabels({ maxResults: 10 });

      expect(result.values!.every((v) => typeof v === 'string')).toBe(true);
    });
  });
});
