import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('groups — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('findGroups', () => {
    it('returns FoundGroups', async () => {
      const result = await live.client.groups.findGroups();

      expect(result).toBeDefined();
      expect(Array.isArray(result.groups)).toBe(true);
    });

    it('filters by query', async () => {
      const result = await live.client.groups.findGroups({ query: 'admin' });

      expect(Array.isArray(result.groups)).toBe(true);
    });
  });

  describe('group CRUD: createGroup → getUsersFromGroup → removeGroup', () => {
    it('full lifecycle', async () => {
      const groupName = `test-group-${Date.now()}`;

      const created = await live.client.groups.createGroup({ name: groupName });

      expect(typeof created.groupId).toBe('string');
      expect(created.name).toBe(groupName);

      const groupId = created.groupId ?? undefined;
      const members = await live.client.groups.getUsersFromGroup({ groupId });

      expect(typeof members.startAt).toBe('number');
      expect(Array.isArray(members.values)).toBe(true);

      await live.client.groups.removeGroup({ groupId });

      const groups = await live.client.groups.findGroups({ query: groupName });
      const found = groups.groups?.find(g => g.groupId === created.groupId);

      expect(found).toBeUndefined();
    });
  });
});
