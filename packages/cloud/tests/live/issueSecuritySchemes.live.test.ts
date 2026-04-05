import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueSecuritySchemes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getIssueSecuritySchemes', () => {
    it('returns SecuritySchemes', async () => {
      const result = await live.client.issueSecuritySchemes.getIssueSecuritySchemes();

      expect(result).toBeDefined();
      expect(Array.isArray(result.issueSecuritySchemes)).toBe(true);
    });
  });

  describe('getIssueSecurityScheme', () => {
    it('returns SecurityScheme by id', async (ctx: TestContext) => {
      const schemes = await live.client.issueSecuritySchemes.getIssueSecuritySchemes();

      if (!schemes.issueSecuritySchemes || schemes.issueSecuritySchemes.length === 0) { ctx.skip(); return; }

      const id = schemes.issueSecuritySchemes[0]!.id!;
      const result = await live.client.issueSecuritySchemes.getIssueSecurityScheme({ id });

      expect(result.id).toBe(id);
    });
  });
});
