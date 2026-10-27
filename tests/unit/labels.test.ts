import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createCloudClient } from '#/cloud/createCloudClient';
import { GetAllLabelsSchema, type GetAllLabels } from '#/cloud/parameters/getAllLabels';
import type { PageString } from '#/cloud/models/pageString';

const host = 'https://example.atlassian.net';
const page = { values: ['label'], startAt: 0, maxResults: 1, total: 1, isLast: true };

describe('Cloud labels filters', () => {
  it.each([
    undefined,
    { startAt: 2, maxResults: 1 },
    { query: 'prefix & more', scope: 'ALL_BROWSEABLE_PROJECTS' },
    { query: '', scope: 'RECENT_PROJECTS' },
    { scope: 'future-scope' },
  ] satisfies (GetAllLabels | undefined)[])('forwards the optional parameters %j', async parameters => {
    const fetch = vi.fn(async () => Response.json(page));
    const client = createCloudClient({ host, fetch, onSchemaMismatch: 'throw' });
    const result = await client.labels.getAllLabels(parameters);
    const expected = new URL(`${host}/rest/api/3/label`);

    for (const [key, value] of Object.entries(parameters ?? {})) expected.searchParams.set(key, String(value));

    expect(fetch).toHaveBeenCalledExactlyOnceWith(expected.toString(), expect.objectContaining({ method: 'GET' }));
    expect(result).toEqual(page);
    expectTypeOf(result).toEqualTypeOf<PageString>();
    expectTypeOf(client.labels.getAllLabels).toExtend<(parameters?: GetAllLabels) => Promise<PageString>>();
  });

  it('validates new filters without restricting future scope values', () => {
    expect(GetAllLabelsSchema.parse({ query: 'prefix', scope: 'future-scope' })).toEqual({
      query: 'prefix',
      scope: 'future-scope',
    });
    expect(GetAllLabelsSchema.safeParse({ query: 1 }).success).toBe(false);
    expect(GetAllLabelsSchema.safeParse({ scope: ['RECENT_PROJECTS'] }).success).toBe(false);
  });
});
