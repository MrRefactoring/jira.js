import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectComponents — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    projectKey = handle.projectKey;
  });

  describe('CRUD: createComponent → getComponent → updateComponent → getProjectComponents → deleteComponent', () => {
    it('full lifecycle', async () => {
      const uniqueName = `test-comp-${Date.now()}`;

      const created = await live.client.projectComponents.createComponent({
        name: uniqueName,
        project: projectKey,
      });

      expect(typeof created.id).toBe('string');
      expect(created.name).toBe(uniqueName);

      const fetched = await live.client.projectComponents.getComponent({ id: created.id! });

      expect(fetched.id).toBe(created.id);

      const updated = await live.client.projectComponents.updateComponent({
        id: created.id!,
        name: uniqueName + '-upd',
      });

      expect(updated.name).toBe(uniqueName + '-upd');

      const all = await live.client.projectComponents.getProjectComponents({ projectIdOrKey: projectKey });

      expect(Array.isArray(all)).toBe(true);
      expect(all.some(c => c.id === created.id)).toBe(true);

      await live.client.projectComponents.deleteComponent({ id: created.id! });

      const afterDelete = await live.client.projectComponents.getProjectComponents({ projectIdOrKey: projectKey });
      const found = afterDelete.find(c => c.id === created.id);

      expect(found).toBeUndefined();
    });
  });

  describe('getProjectComponentsPaginated', () => {
    it('returns Page2ComponentJson', async () => {
      const result = await live.client.projectComponents.getProjectComponentsPaginated({
        projectIdOrKey: projectKey,
        maxResults: 10,
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });
});
