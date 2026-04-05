import { beforeAll, describe, expect, it } from 'vitest';
import { ApiError } from '@jira.js/base';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('issueTypes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getIssueAllTypes', () => {
    it('returns a non-empty array of IssueTypeDetails', async () => {
      const result = await live.client.issueTypes.getIssueAllTypes();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each type has id, name, and description', async () => {
      const result = await live.client.issueTypes.getIssueAllTypes();

      for (const type of result) {
        expect(typeof type.id).toBe('string');
        expect(typeof type.name).toBe('string');
      }
    });
  });

  describe('getIssueType', () => {
    it('returns a specific IssueTypeDetails by id', async () => {
      const all = await live.client.issueTypes.getIssueAllTypes();

      if (all.length === 0) return;

      const first = all[0];
      const result = await live.client.issueTypes.getIssueType({ id: first.id! });

      expect(result.id).toBe(first.id);
      expect(result.name).toBe(first.name);
    });

    it('throws ApiError for an unknown issue type id', async () => {
      await expect(
        live.client.issueTypes.getIssueType({ id: '999999' }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getAlternativeIssueTypes', () => {
    it('returns alternative issue types for a given type', async () => {
      const all = await live.client.issueTypes.getIssueAllTypes();

      if (all.length === 0) return;

      const result = await live.client.issueTypes.getAlternativeIssueTypes({ id: all[0].id! });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
