import { readFileSync } from 'node:fs';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { isSchemaMismatchError } from '#/core';
import { createServerClient, getAgileIssue, getIssue } from '#/server';
import { IssueSchema, type Issue } from '#/server/models';

function fixture(name: string): unknown {
  return JSON.parse(readFileSync(new URL(`../fixtures/issue-minimal/${name}.json`, import.meta.url), 'utf8'));
}

function connect(body: unknown, onSchemaMismatch: 'throw' | ((report: unknown) => void) = 'throw') {
  const fetch = vi.fn<typeof globalThis.fetch>().mockImplementation(async () => Response.json(body));
  const jira = createServerClient({ host: 'https://jira.example/jira', fetch, onSchemaMismatch });

  return { jira, fetch };
}

describe('Data Center minimal issue fields', () => {
  it.each(['platform', 'agile'])('preserves the actual %s minimal response', name => {
    const body = fixture(name);

    expect(IssueSchema.parse(body)).toEqual(body);
    expect(IssueSchema.parse(body).fields).toBeNull();
    expect(IssueSchema.parse(body).id).toBe('10000');
  });

  it.each([
    ['getIssue', 'platform', '/rest/api/2/issue/JMIG-1'],
    ['getAgileIssue', 'agile', '/rest/agile/1.0/issue/JMIG-1'],
  ] as const)('supports fields=id through %s with strict validation', async (method, name, path) => {
    const body = fixture(name);
    const { jira, fetch } = connect(body);

    await expect(jira.issues[method]({ issueIdOrKey: 'JMIG-1', fields: ['id'] })).resolves.toEqual(body);

    const url = new URL(String(fetch.mock.calls[0]![0]));

    expect(url.pathname).toBe(`/jira${path}`);
    expect(Object.fromEntries(url.searchParams)).toEqual({ fields: 'id' });
  });

  it('exposes the same response contract through the free functions', async () => {
    const body = fixture('platform');
    const client = {
      host: 'https://jira.example',
      sendRequest: async <T>() => body as T,
    };
    const result = await getIssue(client, { issueIdOrKey: 'JMIG-1', fields: ['id'] });

    expectTypeOf(result).toEqualTypeOf<Issue>();
    expectTypeOf(result.fields).toEqualTypeOf<Record<string, any> | null | undefined>();
    await expect(getAgileIssue(client, { issueIdOrKey: 'JMIG-1', fields: ['id'] })).resolves.toEqual(body);
  });

  it.each([
    { id: '10000', fields: { summary: 'Full issue', customfield_10000: { integration: ['preserved'] } } },
    { id: '10000', integrationMetadata: { enabled: true } },
  ])('continues to preserve full and omitted fields: %j', body => {
    expect(IssueSchema.parse(body)).toEqual(body);
  });

  it.each([{ fields: 42 }, { fields: false }, { fields: 'unexpected' }, { fields: [] }])(
    'rejects invalid fields $fields through both issue methods',
    async ({ fields }) => {
      const { jira } = connect({ id: '10000', fields });

      for (const method of ['getIssue', 'getAgileIssue'] as const) {
        const error = await jira.issues[method]({ issueIdOrKey: 'JMIG-1', fields: ['id'] }).catch(
          (value: unknown) => value,
        );

        expect(isSchemaMismatchError(error)).toBe(true);
        expect(error).toMatchObject({ report: { issues: [expect.objectContaining({ path: 'fields' })] } });
      }
    },
  );

  it('retains the shared nonfatal mismatch behavior for malformed fields', async () => {
    const body = { id: '10000', fields: [] };
    const onSchemaMismatch = vi.fn();
    const { jira } = connect(body, onSchemaMismatch);

    await expect(jira.issues.getIssue({ issueIdOrKey: 'JMIG-1' })).resolves.toEqual(body);
    expect(onSchemaMismatch).toHaveBeenCalledWith(
      expect.objectContaining({ issues: [expect.objectContaining({ path: 'fields', expected: 'record' })] }),
    );
  });
});
