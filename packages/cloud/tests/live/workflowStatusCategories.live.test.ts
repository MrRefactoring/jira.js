import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('workflowStatusCategories — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getStatusCategories', () => {
    it('returns a non-empty array of StatusCategory', async () => {
      const result = await live.client.workflowStatusCategories.getStatusCategories();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each category has id, key, name, and colorName', async () => {
      const result = await live.client.workflowStatusCategories.getStatusCategories();

      for (const cat of result) {
        expect(typeof cat.id).toBe('number');
        expect(typeof cat.key).toBe('string');
        expect(typeof cat.name).toBe('string');
        expect(typeof cat.colorName).toBe('string');
      }
    });

    it('contains the standard To Do, In Progress, Done categories', async () => {
      const result = await live.client.workflowStatusCategories.getStatusCategories();
      const keys = result.map((c) => c.key);

      expect(keys).toContain('new');
      expect(keys).toContain('indeterminate');
      expect(keys).toContain('done');
    });
  });

  describe('getStatusCategory', () => {
    it('returns a specific StatusCategory by id', async () => {
      const all = await live.client.workflowStatusCategories.getStatusCategories();
      const first = all[0];

      const result = await live.client.workflowStatusCategories.getStatusCategory({ idOrKey: String(first.id!) });

      expect(result.id).toBe(first.id);
      expect(result.key).toBe(first.key);
    });
  });
});
