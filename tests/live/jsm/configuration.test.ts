import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';
import { assetName } from './setup/naming';
import type { Fixtures } from './setup/fixtures';

/** What an instance is configured with rather than what it holds: status types, and the counts it reports. */
describe('assets configuration', () => {
  let api: AssetsServerClient;
  let fixtures: Fixtures;

  beforeAll(() => {
    api = assets();
    fixtures = inject('jsmFixtures');
  });

  it('lists the status types the instance ships with', async () => {
    const statuses = await api.statusTypes.findStatusTypes();

    expect(statuses.length).toBeGreaterThan(0);
    expect(statuses.every(status => typeof status.name === 'string')).toBe(true);
  });

  it('creates, loads, updates and deletes a status type', async () => {
    const created = await api.statusTypes.storeStatusType({
      // Assets caps a status name at thirty characters, which the run id already spends half of.
      name: assetName('status'),
      category: 1,
      description: 'Created and removed by one test.',
    });

    try {
      const loaded = await api.statusTypes.getStatusType({ id: String(created.id) });

      expect(loaded.id).toBe(created.id);

      const updated = await api.statusTypes.updateStatusType({
        id: String(created.id),
        body: { name: assetName('renamed'), category: 2 },
      });

      expect(updated.category).toBe(2);
    } finally {
      await api.statusTypes.deleteStatusType({ id: String(created.id) });
    }
  });

  it('reports what each schema holds', async () => {
    const analytics = await api.analytics.getSchemaAnalytics();

    expect(analytics.some(entry => entry.schemaId === fixtures.schemaId)).toBe(true);
  });
});
