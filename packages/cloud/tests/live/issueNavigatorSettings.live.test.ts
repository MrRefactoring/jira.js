import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueNavigatorSettings — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getIssueNavigatorDefaultColumns', () => {
    it('returns array of ColumnItem', async () => {
      const result = await live.client.issueNavigatorSettings.getIssueNavigatorDefaultColumns();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('setIssueNavigatorDefaultColumns', () => {
    it('sets and restores default columns', async () => {
      const original = await live.client.issueNavigatorSettings.getIssueNavigatorDefaultColumns();

      await live.client.issueNavigatorSettings.setIssueNavigatorDefaultColumns({ body: {} });

      const afterReset = await live.client.issueNavigatorSettings.getIssueNavigatorDefaultColumns();

      expect(Array.isArray(afterReset)).toBe(true);

      if (original.length > 0) {
        const ids = original.map(c => c.value).filter(Boolean) as string[];

        await live.client.issueNavigatorSettings.setIssueNavigatorDefaultColumns({ body: { columns: ids } });
      }
    });
  });
});
