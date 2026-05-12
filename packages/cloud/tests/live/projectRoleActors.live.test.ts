import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectRoleActors — live', () => {
  let live: LiveCloudClient;
  let projectIdOrKey: string;
  let roleId: number;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectIdOrKey = handle.projectKey;

    const roleDetails = await live.client.projectRoles.getProjectRoleDetails({ projectIdOrKey });
    roleId = roleDetails[0]?.id ?? 0;
  });

  describe('getProjectRoleActorsForRole', () => {
    it('returns ProjectRole for global role id', async (ctx: TestContext) => {
      if (!roleId) { ctx.skip(); return; }

      const result = await live.client.projectRoleActors.getProjectRoleActorsForRole({ id: roleId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.actors)).toBe(true);
    });
  });
});
