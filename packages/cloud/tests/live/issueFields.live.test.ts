import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueFields — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getFields', () => {
    it('returns a non-empty array of FieldDetails', async () => {
      const result = await live.client.issueFields.getFields();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each field has id, name, and custom flag', async () => {
      const result = await live.client.issueFields.getFields();

      for (const field of result) {
        expect(typeof field.id).toBe('string');
        expect(typeof field.name).toBe('string');
        expect(typeof field.custom).toBe('boolean');
      }
    });

    it('contains standard system fields', async () => {
      const result = await live.client.issueFields.getFields();
      const ids = result.map((f) => f.id);

      expect(ids).toContain('summary');
      expect(ids).toContain('status');
      expect(ids).toContain('assignee');
    });
  });

  describe('getFieldsPaginated', () => {
    it('returns a PageField response', async () => {
      const result = await live.client.issueFields.getFieldsPaginated({ maxResults: 10 });

      expect(typeof result.startAt).toBe('number');
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });

    it('respects maxResults', async () => {
      const result = await live.client.issueFields.getFieldsPaginated({ maxResults: 5 });

      expect(result.values!.length).toBeLessThanOrEqual(5);
    });
  });
});
