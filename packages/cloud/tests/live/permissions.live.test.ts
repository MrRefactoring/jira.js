import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('permissions — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getMyPermissions', () => {
    it('returns permissions map containing the requested keys', async () => {
      const result = await live.client.permissions.getMyPermissions({
        permissions: 'BROWSE_PROJECTS,CREATE_ISSUES',
      });

      expect(result.permissions).toHaveProperty('BROWSE_PROJECTS');
      expect(result.permissions).toHaveProperty('CREATE_ISSUES');
    });

    it('BROWSE_PROJECTS is granted for the test account', async () => {
      const handle = getInjectedLiveProject();
      const result = await live.client.permissions.getMyPermissions({
        projectKey: handle.projectKey,
        permissions: 'BROWSE_PROJECTS',
      });

      expect(result.permissions?.['BROWSE_PROJECTS']?.havePermission).toBe(true);
    });

    it('each permission entry has non-empty id and boolean havePermission', async () => {
      const result = await live.client.permissions.getMyPermissions({
        permissions: 'BROWSE_PROJECTS,CREATE_ISSUES',
      });

      for (const perm of Object.values(result.permissions!)) {
        expect(typeof perm.id).toBe('string');
        expect((perm.id ?? '').length).toBeGreaterThan(0);
        expect(typeof perm.havePermission).toBe('boolean');
      }
    });
  });

  describe('getAllPermissions', () => {
    it('returns a Permissions object with all system permissions', async () => {
      const result = await live.client.permissions.getAllPermissions();

      expect(typeof result.permissions).toBe('object');
      expect(Object.keys(result.permissions!).length).toBeGreaterThan(0);
    });
  });

  describe('getBulkPermissions', () => {
    it('globalPermissions map includes the requested ADMINISTER key', async () => {
      const handle = getInjectedLiveProject();
      const result = await live.client.permissions.getBulkPermissions({
        accountId: handle.accountId,
        globalPermissions: ['ADMINISTER'],
      });

      expect(typeof result.globalPermissions).toBe('object');
      expect(result.globalPermissions).toHaveProperty('ADMINISTER');
    });

    it('projectPermissions array contains an entry for the test project', async () => {
      const handle = getInjectedLiveProject();
      const result = await live.client.permissions.getBulkPermissions({
        projectPermissions: [
          {
            projects: [Number(handle.projectId)],
            permissions: ['BROWSE_PROJECTS'],
          },
        ],
      });

      expect(Array.isArray(result.projectPermissions)).toBe(true);
      expect((result.projectPermissions ?? []).length).toBeGreaterThan(0);
    });
  });

  describe('getPermittedProjects', () => {
    it('returns at least one project where the user has BROWSE_PROJECTS (test project is expected)', async () => {
      const handle = getInjectedLiveProject();
      const result = await live.client.permissions.getPermittedProjects({
        permissions: ['BROWSE_PROJECTS'],
      });

      expect(Array.isArray(result.projects)).toBe(true);

      const found = (result.projects ?? []).some(p => p.key === handle.projectKey);
      expect(found).toBe(true);
    });

    it('returned projects have non-empty key and numeric id', async () => {
      const result = await live.client.permissions.getPermittedProjects({
        permissions: ['BROWSE_PROJECTS'],
      });

      for (const proj of result.projects ?? []) {
        expect(typeof proj.key).toBe('string');
        expect((proj.key ?? '').length).toBeGreaterThan(0);
      }
    });
  });
});
