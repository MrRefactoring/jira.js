import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('groupAndUserPicker — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('findUsersAndGroups', () => {
    it('returns FoundUsersAndGroups with users and groups', async () => {
      const result = await live.client.groupAndUserPicker.findUsersAndGroups({ query: '' });

      expect(result).toBeDefined();
      expect(result.users).toBeDefined();
      expect(result.groups).toBeDefined();
    });

    it('filters by query string', async () => {
      const result = await live.client.groupAndUserPicker.findUsersAndGroups({
        query: 'admin',
        maxResults: 5,
      });

      expect(Array.isArray(result.users?.users)).toBe(true);
      expect(Array.isArray(result.groups?.groups)).toBe(true);
    });
  });
});
