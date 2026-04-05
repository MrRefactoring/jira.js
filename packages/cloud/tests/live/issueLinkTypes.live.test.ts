import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { ApiError } from '@jira.js/base';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueLinkTypes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getIssueLinkTypes', () => {
    it('returns an IssueLinkTypes object with issueLinkTypes array', async () => {
      const result = await live.client.issueLinkTypes.getIssueLinkTypes();

      expect(Array.isArray(result.issueLinkTypes)).toBe(true);
    });

    it('each link type has id, name, inward, and outward', async () => {
      const result = await live.client.issueLinkTypes.getIssueLinkTypes();

      for (const lt of result.issueLinkTypes!) {
        expect(typeof lt.id).toBe('string');
        expect(typeof lt.name).toBe('string');
        expect(typeof lt.inward).toBe('string');
        expect(typeof lt.outward).toBe('string');
      }
    });
  });

  describe('getIssueLinkType', () => {
    it('returns a specific IssueLinkType by id', async (ctx: TestContext) => {
      const all = await live.client.issueLinkTypes.getIssueLinkTypes();

      if (!all.issueLinkTypes || all.issueLinkTypes.length === 0) { ctx.skip(); return; }

      const first = all.issueLinkTypes[0];
      const result = await live.client.issueLinkTypes.getIssueLinkType({ issueLinkTypeId: first.id! });

      expect(result.id).toBe(first.id);
      expect(result.name).toBe(first.name);
    });

    it('throws ApiError for an unknown link type id', async () => {
      await expect(
        live.client.issueLinkTypes.getIssueLinkType({ issueLinkTypeId: '999999' }),
      ).rejects.toThrow(ApiError);
    });
  });
});
