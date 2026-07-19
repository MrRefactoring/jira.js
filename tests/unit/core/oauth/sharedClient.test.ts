import { afterEach, describe, expect, it, vi } from 'vitest';
import { createClient } from '#/core';
import { createAgileClient } from '#/agile/createAgileClient';
import { createCloudClient } from '#/cloud/createCloudClient';

interface Call {
  url: string;
  init: RequestInit;
}

function mockFetch(responses: Response[]): Call[] {
  const calls: Call[] = [];
  let index = 0;

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({ url, init });

    const next = responses[Math.min(index, responses.length - 1)];

    index += 1;

    return Promise.resolve(next.clone());
  });

  return calls;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function tokens(accessToken: string, refreshToken: string): Response {
  return json({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 3600,
    scope: 'read:page:confluence',
    token_type: 'bearer',
  });
}

afterEach(() => vi.unstubAllGlobals());

describe('sharing one client across versions', () => {
  it('refreshes once for both factories, so the rotated token stays valid', async () => {
    // Two managers would each refresh from the same stored refresh token; the
    // first rotation kills the second one's copy and the user has to re-consent.
    const rotations: (string | undefined)[] = [];
    // The shape satisfies both endpoints' schemas; responses are validated, so a
    // bare `{ results: [] }` would fail the v1 call on missing pagination fields.
    // The shape satisfies both endpoints' schemas; responses are validated, so a
    // bare `{ results: [] }` would fail the v1 call on its pagination fields.
    const calls = mockFetch([
      tokens('fresh', 'r2'),
      json({ results: [], start: 0, limit: 0, size: 0, _links: {} }),
    ]);

    const client = createClient({
      auth: {
        type: 'oauth2',
        clientId: 'client',
        clientSecret: 'secret',
        refreshToken: 'r1',
        cloudId: 'cloud-1',
        onTokenRefresh: event => void rotations.push(event.refreshToken),
      },
    });

    const v1 = createAgileClient(client);
    const v2 = createCloudClient(client);

    await v2.issues.getIssue({ issueIdOrKey: 'TEST-1' });
    await v1.board.getAllBoards({});

    const tokenCalls = calls.filter(call => call.url === 'https://auth.atlassian.com/oauth/token');

    expect(tokenCalls).toHaveLength(1);
    expect(rotations).toEqual(['r2']);
  });

  it('still accepts a plain config, building its own client', async () => {
    const calls = mockFetch([json({ results: [] })]);

    await createCloudClient({
      host: 'https://acme.atlassian.net',
      auth: { type: 'basic', email: 'a@b.co', apiToken: 'x' },
    }).issues.getIssue({ issueIdOrKey: 'TEST-1' });

    expect(calls[0].url).toContain('https://acme.atlassian.net/rest/api/3/issue/TEST-1');
  });

  it('hands back the very same client instance', () => {
    const client = createClient({ host: 'https://acme.atlassian.net' });

    expect(createClient(client)).toBe(client);
  });
});
