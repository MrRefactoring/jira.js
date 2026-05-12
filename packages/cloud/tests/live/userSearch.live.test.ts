import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('userSearch — live', () => {
  let live: LiveCloudClient;
  let myAccountId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const me = await live.client.myself.getCurrentUser();

    myAccountId = me.accountId!;
  });

  describe('findUsers', () => {
    it('returns users by accountId', async () => {
      const result = await live.client.userSearch.findUsers({ accountId: myAccountId });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]!.accountId).toBe(myAccountId);
    });

    it('returns users by query', async () => {
      const result = await live.client.userSearch.findUsers({ query: '', maxResults: 5 });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findUsersForPicker', () => {
    it('returns FoundUsers', async () => {
      const result = await live.client.userSearch.findUsersForPicker({ query: '', maxResults: 5 });

      expect(result).toBeDefined();
      expect(Array.isArray(result.users)).toBe(true);
    });
  });

  describe('findAssignableUsers', () => {
    it('returns users assignable to project', async (ctx: TestContext) => {
      const projects = await live.client.projects.searchProjects({ maxResults: 1 });

      if (!projects.values || projects.values.length === 0) { ctx.skip(); return; }

      const projectKey = projects.values[0]!.key!;
      const result = await live.client.userSearch.findAssignableUsers({ project: projectKey, maxResults: 5 });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
