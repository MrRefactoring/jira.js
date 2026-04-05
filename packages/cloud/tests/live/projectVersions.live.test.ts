import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectVersions — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;
  let projectId: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    projectKey = handle.projectKey;
    projectId = handle.projectId;
  });

  describe('getProjectVersions', () => {
    it('returns array of Version', async () => {
      const result = await live.client.projectVersions.getProjectVersions({ projectIdOrKey: projectKey });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getProjectVersionsPaginated', () => {
    it('returns PageVersion', async () => {
      const result = await live.client.projectVersions.getProjectVersionsPaginated({
        projectIdOrKey: projectKey,
        maxResults: 5,
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('CRUD: createVersion → getVersion → updateVersion → deleteAndReplaceVersion', () => {
    it('full lifecycle', async () => {
      const uniqueName = `v-${Date.now()}`;

      const created = await live.client.projectVersions.createVersion({
        name: uniqueName,
        projectId: Number(projectId),
      });

      expect(typeof created.id).toBe('string');
      expect(created.name).toBe(uniqueName);

      const fetched = await live.client.projectVersions.getVersion({ id: created.id! });

      expect(fetched.id).toBe(created.id);

      const updated = await live.client.projectVersions.updateVersion({
        id: created.id!,
        name: uniqueName + '-upd',
        projectId: Number(projectId),
      });

      expect(updated.name).toBe(uniqueName + '-upd');

      await live.client.projectVersions.deleteAndReplaceVersion({
        id: created.id!,
      });

      const all = await live.client.projectVersions.getProjectVersions({ projectIdOrKey: projectKey });
      const found = all.find(v => v.id === created.id);

      expect(found).toBeUndefined();
    });
  });
});
