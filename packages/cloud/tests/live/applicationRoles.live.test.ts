import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('applicationRoles — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllApplicationRoles', () => {
    it('returns a non-empty array of ApplicationRole', async () => {
      const result = await live.client.applicationRoles.getAllApplicationRoles();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each role has a key and name', async () => {
      const result = await live.client.applicationRoles.getAllApplicationRoles();

      for (const role of result) {
        expect(typeof role.key).toBe('string');
        expect(typeof role.name).toBe('string');
      }
    });
  });

  describe('getApplicationRole', () => {
    it('returns a specific role by key', async () => {
      const all = await live.client.applicationRoles.getAllApplicationRoles();

      if (all.length === 0) return;

      const key = all[0].key!;
      const result = await live.client.applicationRoles.getApplicationRole({ key });

      expect(result.key).toBe(key);
      expect(typeof result.name).toBe('string');
    });
  });
});
