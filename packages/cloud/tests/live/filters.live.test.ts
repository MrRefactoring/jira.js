import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('filters — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getMyFilters', () => {
    it('returns array of Filter', async () => {
      const result = await live.client.filters.getMyFilters();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getFavouriteFilters', () => {
    it('returns array of Filter', async () => {
      const result = await live.client.filters.getFavouriteFilters();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getFiltersPaginated', () => {
    it('returns paginated filters', async () => {
      const result = await live.client.filters.getFiltersPaginated({ maxResults: 5 });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('CRUD: createFilter → getFilter → updateFilter → deleteFilter', () => {
    it('full lifecycle', async () => {
      const uniqueName = `test-filter-${Date.now()}`;

      const created = await live.client.filters.createFilter({
        name: uniqueName,
        jql: 'project is not EMPTY',
      });

      expect(typeof created.id).toBe('string');
      expect(created.name).toBe(uniqueName);

      const numericId = Number(created.id);
      const fetched = await live.client.filters.getFilter({ id: numericId });

      expect(fetched.id).toBe(created.id);

      const updated = await live.client.filters.updateFilter({
        id: created.id,
        name: uniqueName + '-updated',
        jql: 'project is not EMPTY',
      });

      expect(updated.name).toBe(uniqueName + '-updated');

      await live.client.filters.deleteFilter({ id: numericId });

      const mine = await live.client.filters.getMyFilters();
      const found = mine.find(f => f.id === created.id);

      expect(found).toBeUndefined();
    });
  });
});
