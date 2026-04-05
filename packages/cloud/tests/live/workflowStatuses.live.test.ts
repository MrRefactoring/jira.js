import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('workflowStatuses — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getStatuses', () => {
    it('returns a non-empty array of StatusDetails', async () => {
      const result = await live.client.workflowStatuses.getStatuses();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each status has id, name, self, and statusCategory', async () => {
      const result = await live.client.workflowStatuses.getStatuses();

      for (const status of result) {
        expect(typeof status.id).toBe('string');
        expect(typeof status.name).toBe('string');
        expect(typeof status.self).toBe('string');
        expect(typeof status.statusCategory).toBe('object');
      }
    });
  });

  describe('getStatus', () => {
    it('returns a specific status by id', async () => {
      const all = await live.client.workflowStatuses.getStatuses();
      const first = all[0];

      const result = await live.client.workflowStatuses.getStatus({ idOrName: first.id! });

      expect(result.id).toBe(first.id);
      expect(result.name).toBe(first.name);
    });

    it('returns a status by name', async () => {
      const all = await live.client.workflowStatuses.getStatuses();
      const first = all[0];

      const result = await live.client.workflowStatuses.getStatus({ idOrName: first.name! });

      expect(typeof result.id).toBe('string');
    });
  });
});
