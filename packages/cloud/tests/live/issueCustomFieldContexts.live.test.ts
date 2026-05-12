import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueCustomFieldContexts — live', () => {
  let live: LiveCloudClient;
  let customFieldId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();

    const fields = await live.client.issueFields.getFieldsPaginated({ type: ['custom'], maxResults: 1 });
    customFieldId = fields.values?.[0]?.id ?? '';
  });

  describe('getContextsForField', () => {
    it('returns PageCustomFieldContext with pagination fields', async (ctx: TestContext) => {
      if (!customFieldId) { ctx.skip(); return; }

      const result = await live.client.issueCustomFieldContexts.getContextsForField({
        fieldId: customFieldId,
        maxResults: 5,
      });

      expect(typeof result.startAt).toBe('number');
      expect(typeof result.maxResults).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getIssueTypeMappingsForContexts', () => {
    it('returns PageIssueTypeToContextMapping with pagination fields', async (ctx: TestContext) => {
      if (!customFieldId) { ctx.skip(); return; }

      const result = await live.client.issueCustomFieldContexts.getIssueTypeMappingsForContexts({
        fieldId: customFieldId,
        maxResults: 5,
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getProjectContextMapping', () => {
    it('returns PageCustomFieldContextProjectMapping with pagination fields', async (ctx: TestContext) => {
      if (!customFieldId) { ctx.skip(); return; }

      const result = await live.client.issueCustomFieldContexts.getProjectContextMapping({
        fieldId: customFieldId,
        maxResults: 5,
      });

      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });
});
