import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('filterSharing — live', () => {
  let live: LiveCloudClient;
  let filterId: number;

  beforeAll(async () => {
    live = createLiveCloudClient();

    const created = await live.client.filters.createFilter({
      name: `filterSharing live test ${Date.now()}`,
      jql: 'project is not EMPTY',
    });

    filterId = Number(created.id!);
  });

  describe('getDefaultShareScope', () => {
    it('returns DefaultShareScope', async () => {
      const result = await live.client.filterSharing.getDefaultShareScope();

      expect(result).toBeDefined();
      expect(typeof result.scope).toBe('string');
    });
  });

  describe('getSharePermissions', () => {
    it('returns array of SharePermission', async () => {
      const result = await live.client.filterSharing.getSharePermissions({ id: filterId });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
