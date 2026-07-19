import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `jql` API (`getAutoComplete`, `getAutoCompletePost`, `getFieldAutoCompleteForQueryString`,
 * `parseJqlQueries`, `migrateQueries`).
 *
 * Read-only. This is the machinery a query builder is made of: what fields exist, what values they take, and whether
 * a string is valid before it is run. The distinction the suite pins is that parsing is *not* the same as searching —
 * `parseJqlQueries` reports on a query without executing it, and its `validation` mode decides whether a suspicious
 * but legal query is an error, a warning, or neither.
 */
describe('Jira Cloud — jql.getAutoComplete (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('describes the fields a query can be built from', async () => {
    const data = await client.jql.getAutoComplete();

    expect(data.visibleFieldNames!.length).toBeGreaterThan(0);
    expect(data.visibleFunctionNames!.length).toBeGreaterThan(0);
    expect(Array.isArray(data.jqlReservedWords)).toBe(true);

    for (const field of data.visibleFieldNames!) {
      expect(typeof field.value).toBe('string');
      // `searchable` and `orderable` are strings carrying "true"/"false" rather
      // than booleans — a shape that reliably catches people out.
      expect(typeof field.searchable).toBe('string');
    }
  });

  it('includes the fields the rest of the suite queries by', async () => {
    const data = await client.jql.getAutoComplete();
    const names = data.visibleFieldNames!.map(field => field.value);

    expect(names).toEqual(expect.arrayContaining(['project', 'summary', 'status', 'created']));
  });

  it('suggests values for a field as a user types', async () => {
    const suggestions = await client.jql.getFieldAutoCompleteForQueryString({
      fieldName: 'project',
      fieldValue: TEST_PROJECT_KEY.slice(0, 4),
    });

    expect(Array.isArray(suggestions.results)).toBe(true);
    // The suggestion carries display HTML alongside the raw value — the value is
    // what goes into the query, the HTML is what a picker renders.
    for (const result of suggestions.results ?? []) {
      expect(typeof result.value).toBe('string');
      expect(typeof result.displayName).toBe('string');
    }
  });
});

describe('Jira Cloud — jql.parseJqlQueries (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('parses a valid query into its structure without running it', async () => {
    const parsed = await client.jql.parseJqlQueries({
      validation: 'strict',
      queries: [`project = ${TEST_PROJECT_KEY} ORDER BY created DESC`],
    });

    expect(parsed.queries).toHaveLength(1);

    const [query] = parsed.queries!;

    expect(query!.errors ?? []).toEqual([]);
    // The structure is what a query builder round-trips through, and it is the
    // reason to parse rather than simply search and see whether it fails.
    expect(query!.structure?.where).toBeDefined();
    expect(query!.structure?.orderBy?.fields?.[0]?.field?.name).toBe('created');
  });

  it('reports errors for a malformed query instead of throwing', async () => {
    const parsed = await client.jql.parseJqlQueries({
      validation: 'strict',
      queries: ['project = "unterminated'],
    });

    // A parse failure is data here, not an exception — the call itself succeeds.
    // Code that only wraps this in try/catch will never notice a bad query.
    expect(parsed.queries![0]!.errors?.length).toBeGreaterThan(0);
    expect(parsed.queries![0]!.structure).toBeUndefined();
  });

  it('lets the validation mode decide how strict the answer is', async () => {
    const suspicious = [`project = ${TEST_PROJECT_KEY} AND nosuchfield = 1`];

    const strict = await client.jql.parseJqlQueries({ validation: 'strict', queries: suspicious });
    const none = await client.jql.parseJqlQueries({ validation: 'none', queries: suspicious });

    expect(strict.queries![0]!.errors?.length).toBeGreaterThan(0);
    // With validation off the same query parses cleanly: the syntax was always
    // fine, it is the field that does not exist. The mode chooses which of the
    // two questions is being asked.
    expect(none.queries![0]!.errors ?? []).toEqual([]);
    expect(none.queries![0]!.structure).toBeDefined();
  });

  it('parses several queries in one call, independently', async () => {
    const parsed = await client.jql.parseJqlQueries({
      validation: 'strict',
      queries: [`project = ${TEST_PROJECT_KEY}`, 'project = "unterminated'],
    });

    expect(parsed.queries).toHaveLength(2);
    // One bad query does not poison the batch — each answer stands alone.
    expect(parsed.queries![0]!.errors ?? []).toEqual([]);
    expect(parsed.queries![1]!.errors?.length).toBeGreaterThan(0);
  });
});
