import { describe, expect, it, vi } from 'vitest';
import { createServerClient } from '#/server';

function connect() {
  const fetch = vi.fn<typeof globalThis.fetch>().mockImplementation(async () => Response.json({}));
  const jira = createServerClient({ host: 'https://jira.example/jira', fetch, onSchemaMismatch: 'throw' });

  return { jira, fetch };
}

describe('Data Center path parameters', () => {
  it.each(['ordinary-key', 'part/with?query#fragment %', '日本語 пробел', 'a%2Fb', 'a+b&x=y'])(
    'keeps the raw property key %s inside one path segment',
    async propertyKey => {
      const { jira, fetch } = connect();

      await jira.issues.getIssueProperty({ issueIdOrKey: 'TEST-1', propertyKey });

      const url = new URL(String(fetch.mock.calls[0]![0]));

      expect(url.pathname).toBe(`/jira/rest/api/2/issue/TEST-1/properties/${encodeURIComponent(propertyKey)}`);
      expect(url.search).toBe('');
      expect(url.hash).toBe('');
      expect(decodeURIComponent(url.pathname.split('/').at(-1)!)).toBe(propertyKey);
    },
  );

  it.each(['ordinary-role', 'role/with?query#fragment %', '日本語 пробел', 'a%2Fb', 'a+b&x=y'])(
    'encodes the application role key %s through its public method',
    async key => {
      const { jira, fetch } = connect();

      await jira.applicationRoles.getApplicationRole({ key });

      const url = new URL(String(fetch.mock.calls[0]![0]));

      expect(url.pathname).toBe(`/jira/rest/api/2/applicationrole/${encodeURIComponent(key)}`);
      expect(url.search).toBe('');
      expect(url.hash).toBe('');
    },
  );

  it('retains numeric path parameters and static route separators', async () => {
    const { jira, fetch } = connect();

    await jira.board.getBoard({ boardId: 42 });

    expect(String(fetch.mock.calls[0]![0])).toBe('https://jira.example/jira/rest/agile/1.0/board/42');
  });

  it('serializes queries separately from the encoded path', async () => {
    const { jira, fetch } = connect();

    await jira.projects.getProject({
      projectIdOrKey: 'project?expand=wrong#fragment',
      expand: ['description', 'lead'],
    });

    const url = new URL(String(fetch.mock.calls[0]![0]));

    expect(url.pathname).toBe('/jira/rest/api/2/project/project%3Fexpand%3Dwrong%23fragment');
    expect(Object.fromEntries(url.searchParams)).toEqual({ expand: 'description,lead' });
    expect(url.hash).toBe('');
  });
});
