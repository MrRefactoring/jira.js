import { describe, expect, it } from 'vitest';
import type { CreateFilter } from '#/cloud/parameters/createFilter';
import type { EditIssue } from '#/cloud/parameters/editIssue';
import type { QueryWorkspaces } from '#/admin/parameters/queryWorkspaces';

function request<T>(parameters: T): T {
  return parameters;
}

describe('a request names only the keys its models declare', () => {
  it('refuses a misspelt key inside a nested model', () => {
    request<CreateFilter>({
      name: 'filter',
      jql: 'project = X',
      // @ts-expect-error
      sharePermissions: [{ type: 'global', typo: 1 }],
    });

    expect(request<CreateFilter>({ name: 'filter', sharePermissions: [{ type: 'global' }] }).name).toBe('filter');
  });

  it('refuses a misspelt key inside a model on a reference cycle', () => {
    request<QueryWorkspaces>({
      orgId: 'org',
      // @ts-expect-error
      query: { andd: [] },
    });

    expect(request<QueryWorkspaces>({ orgId: 'org', query: { and: [{ nor: [] }] } }).orgId).toBe('org');
  });

  it('refuses a misspelt issue field and takes a custom field by its key', () => {
    request<EditIssue>({
      issueIdOrKey: 'X-1',
      // @ts-expect-error
      fields: { summaryy: 'typo' },
    });

    const edit = request<EditIssue>({
      issueIdOrKey: 'X-1',
      fields: { summary: 'fixed', project: { key: 'X' }, customfield_10016: { value: 'three' } },
    });
    const summary: string | undefined = edit.fields?.summary;

    expect(summary).toBe('fixed');
  });

  it('refuses an issue field Jira only reports', () => {
    request<EditIssue>({
      issueIdOrKey: 'X-1',
      // @ts-expect-error
      fields: { status: { name: 'Done' } },
    });

    request<EditIssue>({
      issueIdOrKey: 'X-1',
      // @ts-expect-error
      fields: { created: '2026-01-01T00:00:00Z' },
    });

    expect(request<EditIssue>({ issueIdOrKey: 'X-1', fields: { parent: { key: 'X-0' } } }).issueIdOrKey).toBe('X-1');
  });
});
