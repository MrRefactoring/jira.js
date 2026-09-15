import { afterEach, describe, expect, it, vi } from 'vitest';
import { createCloudClient } from '#/cloud/createCloudClient';
import {
  evaluateExpression,
  evaluateJSISJiraExpression,
  search,
  searchAndReconsileIssuesUsingJql,
  searchAndReconsileIssuesUsingJqlPost,
  searchIssues,
  searchIssuesPost,
  searchStatuses,
} from '#/cloud/api';

interface Call {
  url: string;
  method: string;
}

function mockFetch(): Call[] {
  const calls: Call[] = [];

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({ url, method: init.method ?? 'GET' });

    return Promise.resolve(
      new Response(JSON.stringify({ issues: [], values: [], isLast: true, value: null }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );
  });

  return calls;
}

const client = () =>
  createCloudClient({
    host: 'https://acme.atlassian.net',
    auth: { type: 'basic', email: 'a@b.co', apiToken: 'token' },
  });

afterEach(() => vi.unstubAllGlobals());

describe('a retired operation name still reaches the endpoint the new one does', () => {
  it('searchAndReconsileIssuesUsingJql goes where searchIssues goes', async () => {
    const viaAlias = mockFetch();

    await client().issueSearch.searchAndReconsileIssuesUsingJql({ jql: 'order by created' });
    const aliasCall = { ...viaAlias[0] };

    vi.unstubAllGlobals();
    const viaName = mockFetch();

    await client().issueSearch.searchIssues({ jql: 'order by created' });

    expect(aliasCall).toEqual(viaName[0]);
    expect(aliasCall.method).toBe('GET');
  });

  it('searchAndReconsileIssuesUsingJqlPost goes where searchIssuesPost goes, and stays a POST', async () => {
    const viaAlias = mockFetch();

    await client().issueSearch.searchAndReconsileIssuesUsingJqlPost({ jql: 'order by created' });
    const aliasCall = { ...viaAlias[0] };

    vi.unstubAllGlobals();
    const viaName = mockFetch();

    await client().issueSearch.searchIssuesPost({ jql: 'order by created' });

    expect(aliasCall).toEqual(viaName[0]);
    expect(aliasCall.method).toBe('POST');
  });

  it('evaluateJSISJiraExpression goes where evaluateExpression goes', async () => {
    const viaAlias = mockFetch();

    await client().jiraExpressions.evaluateJSISJiraExpression({ expression: '1 + 1' });
    const aliasCall = { ...viaAlias[0] };

    vi.unstubAllGlobals();
    const viaName = mockFetch();

    await client().jiraExpressions.evaluateExpression({ expression: '1 + 1' });

    expect(aliasCall).toEqual(viaName[0]);
  });

  it('status.search goes where status.searchStatuses goes', async () => {
    const viaAlias = mockFetch();

    await client().status.search({});
    const aliasCall = { ...viaAlias[0] };

    vi.unstubAllGlobals();
    const viaName = mockFetch();

    await client().status.searchStatuses({});

    expect(aliasCall).toEqual(viaName[0]);
  });
});

describe('the flat exports keep the retired names too', () => {
  it('each retired export is the function that replaced it', () => {
    expect(searchAndReconsileIssuesUsingJql).toBe(searchIssues);
    expect(searchAndReconsileIssuesUsingJqlPost).toBe(searchIssuesPost);
    expect(evaluateJSISJiraExpression).toBe(evaluateExpression);
    expect(search).toBe(searchStatuses);
  });
});
