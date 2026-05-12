import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('jql — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAutoComplete', () => {
    it('returns JQLReferenceData with reserved words and field names', async () => {
      const result = await live.client.jql.getAutoComplete();

      expect(Array.isArray(result.jqlReservedWords)).toBe(true);
      expect(result.jqlReservedWords!.length).toBeGreaterThan(0);
      expect(result.jqlReservedWords!.every((w) => typeof w === 'string')).toBe(true);

      expect(Array.isArray(result.visibleFieldNames)).toBe(true);
      expect(result.visibleFieldNames!.length).toBeGreaterThan(0);
    });

    it('returned field names have value and displayName', async () => {
      const result = await live.client.jql.getAutoComplete();

      const field = result.visibleFieldNames![0]!;
      expect(typeof field.value).toBe('string');
    });
  });

  describe('getAutoCompletePost', () => {
    it('returns the same reference data as GET when called without filters', async () => {
      const result = await live.client.jql.getAutoCompletePost();

      expect(Array.isArray(result.visibleFieldNames)).toBe(true);
      expect(result.visibleFieldNames!.length).toBeGreaterThan(0);
    });

    it('filters by projectIds and returns data', async () => {
      const handle = getInjectedLiveProject();

      const result = await live.client.jql.getAutoCompletePost({
        projectIds: [Number(handle.projectId)],
      });

      expect(Array.isArray(result.visibleFieldNames)).toBe(true);
      expect(result.visibleFieldNames!.length).toBeGreaterThan(0);
    });

    it('includeCollapsedFields returns additional collapsed fields', async () => {
      const [withoutCollapsed, withCollapsed] = await Promise.all([
        live.client.jql.getAutoCompletePost({ includeCollapsedFields: false }),
        live.client.jql.getAutoCompletePost({ includeCollapsedFields: true }),
      ]);

      expect(withCollapsed.visibleFieldNames!.length).toBeGreaterThanOrEqual(
        withoutCollapsed.visibleFieldNames!.length,
      );
    });
  });

  describe('getFieldAutoCompleteForQueryString', () => {
    it('returns suggestions for a known field name', async () => {
      const result = await live.client.jql.getFieldAutoCompleteForQueryString({
        fieldName: 'project',
      });

      expect(Array.isArray(result.results)).toBe(true);
      expect(result.results!.length).toBeGreaterThan(0);
    });

    it('returns empty results for unknown field value', async () => {
      const result = await live.client.jql.getFieldAutoCompleteForQueryString({
        fieldName: 'project',
        fieldValue: 'zzz-nonexistent-zzz',
      });

      expect(Array.isArray(result.results)).toBe(true);
    });

    it('returns results when called without parameters', async () => {
      const result = await live.client.jql.getFieldAutoCompleteForQueryString();

      expect(result).toHaveProperty('results');
    });
  });

  describe('parseJqlQueries', () => {
    it('parses a valid JQL query without errors (strict)', async () => {
      const result = await live.client.jql.parseJqlQueries({
        validation: 'strict',
        queries: ['project is not EMPTY'],
      });

      expect(result.queries).toHaveLength(1);
      const parsed = result.queries[0]!;
      expect(typeof parsed.query).toBe('string');
      expect(parsed.errors ?? []).toHaveLength(0);
    });

    it('reports errors for an invalid JQL query', async () => {
      const result = await live.client.jql.parseJqlQueries({
        validation: 'strict',
        queries: ['NOT_A_FIELD = "something"'],
      });

      expect(result.queries).toHaveLength(1);
      const parsed = result.queries[0]!;
      expect(Array.isArray(parsed.errors)).toBe(true);
      expect(parsed.errors!.length).toBeGreaterThan(0);
    });

    it('parses multiple queries in one request', async () => {
      const result = await live.client.jql.parseJqlQueries({
        validation: 'warn',
        queries: ['project is not EMPTY', 'status = "In Progress"'],
      });

      expect(result.queries).toHaveLength(2);
    });

    it('validation=none returns structure even for invalid query', async () => {
      const result = await live.client.jql.parseJqlQueries({
        validation: 'none',
        queries: ['INVALID_FIELD = "x"'],
      });

      expect(result.queries).toHaveLength(1);
    });
  });

  describe('migrateQueries', () => {
    it('returns converted queryStrings array', async () => {
      const result = await live.client.jql.migrateQueries({
        queryStrings: ['project = "TEST"'],
      });

      expect(Array.isArray(result.queryStrings)).toBe(true);
      expect(result.queryStrings).toHaveLength(1);
    });

    it('returns empty results for empty input', async () => {
      const result = await live.client.jql.migrateQueries({ queryStrings: [] });

      expect(result.queryStrings ?? []).toHaveLength(0);
    });

  });
});
