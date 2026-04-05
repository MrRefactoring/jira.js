import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueTypeProperties — live', () => {
  let live: LiveCloudClient;
  let issueTypeId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();

    const types = await live.client.issueTypes.getIssueAllTypes();
    issueTypeId = types[0]?.id ?? '';
  });

  describe('getIssueTypePropertyKeys', () => {
    it('returns PropertyKeys with keys array', async (ctx: TestContext) => {
      if (!issueTypeId) { ctx.skip(); return; }

      const result = await live.client.issueTypeProperties.getIssueTypePropertyKeys({ issueTypeId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });
  });

  describe('setIssueTypeProperty / getIssueTypeProperty / deleteIssueTypeProperty', () => {
    it('full property lifecycle — set, get, then delete', async (ctx: TestContext) => {
      if (!issueTypeId) { ctx.skip(); return; }

      const propertyKey = 'live-test-prop';

      await live.client.issueTypeProperties.setIssueTypeProperty({
        issueTypeId,
        propertyKey,
        body: { value: 'test' },
      });

      const got = await live.client.issueTypeProperties.getIssueTypeProperty({ issueTypeId, propertyKey });

      expect(got.key).toBe(propertyKey);

      await live.client.issueTypeProperties.deleteIssueTypeProperty({ issueTypeId, propertyKey });
    });
  });
});
