import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('projectCategories — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllProjectCategories', () => {
    it('returns array of ProjectCategory', async () => {
      const result = await live.client.projectCategories.getAllProjectCategories();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('CRUD: createProjectCategory → getProjectCategoryById → updateProjectCategory → removeProjectCategory', () => {
    it('full lifecycle', async () => {
      const uniqueName = `test-category-${Date.now()}`;

      const created = await live.client.projectCategories.createProjectCategory({
        name: uniqueName,
        description: 'live test category',
      });

      expect(typeof created.id).toBe('string');
      expect(created.name).toBe(uniqueName);

      const fetched = await live.client.projectCategories.getProjectCategoryById({
        id: Number(created.id),
      });

      expect(fetched.id).toBe(created.id);

      const updated = await live.client.projectCategories.updateProjectCategory({
        id: created.id,
        name: uniqueName + '-updated',
        description: 'updated',
      });

      expect(updated.name).toBe(uniqueName + '-updated');

      await live.client.projectCategories.removeProjectCategory({ id: Number(created.id) });

      const all = await live.client.projectCategories.getAllProjectCategories();
      const found = all.find(c => c.id === created.id);

      expect(found).toBeUndefined();
    });
  });
});
