import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('users — live', () => {
  let live: LiveCloudClient;
  let myAccountId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const me = await live.client.myself.getCurrentUser();

    myAccountId = me.accountId!;
  });

  describe('getUser', () => {
    it('returns user by accountId', async () => {
      const result = await live.client.users.getUser({ accountId: myAccountId });

      expect(result.accountId).toBe(myAccountId);
      expect(typeof result.displayName).toBe('string');
    });
  });

  describe('getUserGroups', () => {
    it('returns groups for the current user', async () => {
      const result = await live.client.users.getUserGroups({ accountId: myAccountId });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getUserDefaultColumns', () => {
    it('returns array of ColumnItem', async () => {
      const result = await live.client.users.getUserDefaultColumns({ accountId: myAccountId });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getAllUsers', () => {
    it('returns array of users', async () => {
      const result = await live.client.users.getAllUsers({ maxResults: 10 });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
