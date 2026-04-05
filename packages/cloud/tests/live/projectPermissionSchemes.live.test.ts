import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectPermissionSchemes — live', () => {
  let live: LiveCloudClient;
  let projectKeyOrId: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectKeyOrId = handle.projectKey;
  });

  describe('getAssignedPermissionScheme', () => {
    it('returns PermissionScheme', async () => {
      const result = await live.client.projectPermissionSchemes.getAssignedPermissionScheme({
        projectKeyOrId,
      });

      expect(result).toBeDefined();
      expect(typeof result.id).toBe('number');
    });
  });

  describe('getSecurityLevelsForProject', () => {
    it('returns ProjectIssueSecurityLevels', async () => {
      const result = await live.client.projectPermissionSchemes.getSecurityLevelsForProject({
        projectKeyOrId,
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.levels)).toBe(true);
    });
  });
});
