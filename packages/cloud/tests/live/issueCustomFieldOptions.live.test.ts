import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueCustomFieldOptions — live', () => {
  let live: LiveCloudClient;
  let selectFieldId: string;
  let contextId: number;

  beforeAll(async () => {
    live = createLiveCloudClient();

    const fields = await live.client.issueFields.getFieldsPaginated({
      type: ['custom'],
      maxResults: 50,
    });

    const selectField = fields.values?.find(f => f.schema?.type === 'option' || f.schema?.custom?.includes('select'));
    selectFieldId = selectField?.id ?? '';

    if (selectFieldId) {
      const contexts = await live.client.issueCustomFieldContexts.getContextsForField({
        fieldId: selectFieldId,
        maxResults: 1,
      });
      contextId = Number(contexts.values?.[0]?.id ?? 0);
    }
  });

  describe('getOptionsForContext', () => {
    it('returns PageCustomFieldContextOption with pagination fields', async (ctx: TestContext) => {
      if (!selectFieldId || !contextId) { ctx.skip(); return; }

      const result = await live.client.issueCustomFieldOptions.getOptionsForContext({
        fieldId: selectFieldId,
        contextId,
        maxResults: 5,
      });

      expect(typeof result.startAt).toBe('number');
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });
  });

  describe('getCustomFieldOption', () => {
    it('returns CustomFieldOption with value for first option', async (ctx: TestContext) => {
      if (!selectFieldId || !contextId) { ctx.skip(); return; }

      const page = await live.client.issueCustomFieldOptions.getOptionsForContext({
        fieldId: selectFieldId,
        contextId,
        maxResults: 1,
      });

      if (!page.values || page.values.length === 0) { ctx.skip(); return; }

      const optionId = page.values[0]!.id!;
      const result = await live.client.issueCustomFieldOptions.getCustomFieldOption({ id: optionId });

      expect(typeof result.value).toBe('string');
      expect(typeof result.self).toBe('string');
    });
  });
});
