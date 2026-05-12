import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectRoles — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    projectKey = handle.projectKey;
  });

  describe('getAllProjectRoles', () => {
    it('returns array of ProjectRole', async () => {
      const result = await live.client.projectRoles.getAllProjectRoles();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      for (const role of result) {
        expect(typeof role.id).toBe('number');
        expect(typeof role.name).toBe('string');
      }
    });
  });

  describe('getProjectRoles', () => {
    it('returns project role map', async () => {
      const result = await live.client.projectRoles.getProjectRoles({ projectIdOrKey: projectKey });

      expect(result).toBeDefined();
    });
  });

  describe('getProjectRole', () => {
    it('returns ProjectRole for known id from project', async () => {
      const projectRoleDetails = await live.client.projectRoles.getProjectRoleDetails({ projectIdOrKey: projectKey });

      if (projectRoleDetails.length === 0) return;

      const roleId = projectRoleDetails[0]!.id!;
      const result = await live.client.projectRoles.getProjectRole({
        projectIdOrKey: projectKey,
        id: roleId,
      });

      expect(result.id).toBe(roleId);
    });
  });

  describe('getProjectRoleById', () => {
    it('returns ProjectRole by global id', async () => {
      const allRoles = await live.client.projectRoles.getAllProjectRoles();

      if (allRoles.length === 0) return;

      const roleId = allRoles[0]!.id!;
      const result = await live.client.projectRoles.getProjectRoleById({ id: roleId });

      expect(result.id).toBe(roleId);
    });
  });
});
