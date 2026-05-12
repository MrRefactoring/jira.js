import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('projectTypes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllProjectTypes', () => {
    it('returns array of ProjectType', async () => {
      const result = await live.client.projectTypes.getAllProjectTypes();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      for (const pt of result) {
        expect(typeof pt.key).toBe('string');
      }
    });
  });

  describe('getAllAccessibleProjectTypes', () => {
    it('returns accessible project types', async () => {
      const result = await live.client.projectTypes.getAllAccessibleProjectTypes();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getProjectTypeByKey', () => {
    it('returns project type for software key', async () => {
      const result = await live.client.projectTypes.getProjectTypeByKey({ projectTypeKey: 'software' });

      expect(result.key).toBe('software');
    });
  });

  describe('getAccessibleProjectTypeByKey', () => {
    it('returns accessible project type for software key', async () => {
      const all = await live.client.projectTypes.getAllAccessibleProjectTypes();

      if (all.length === 0) return;

      const key = (all[0]!.key ?? 'software') as 'software' | 'service_desk' | 'business' | 'product_discovery';
      const result = await live.client.projectTypes.getAccessibleProjectTypeByKey({ projectTypeKey: key });

      expect(result.key).toBe(key);
    });
  });
});
