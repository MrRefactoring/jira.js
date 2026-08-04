import { afterEach, describe, expect, it, vi } from 'vitest';
import { createClient } from '#/core';

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

function tokens(accessToken: string): Response {
  return json({ access_token: accessToken, expires_in: 3600, scope: 'read:page:confluence', token_type: 'bearer' });
}

const CREDENTIALS = { clientId: 'client', clientSecret: 'secret', refreshToken: 'r1' } as const;

afterEach(() => vi.unstubAllGlobals());

describe('OAuth 2.0 routing', () => {
  it('sends the request to the gateway, not to the site domain', async () => {
    const calls = mockFetch([json({})]);

    await createClient({
      auth: { type: 'oauth2', accessToken: 'access', cloudId: 'cloud-1' },
    }).sendRequest({ url: '/wiki/api/v2/pages', method: 'GET' });

    expect(calls[0].url).toBe('https://api.atlassian.com/ex/jira/cloud-1/wiki/api/v2/pages');
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe('Bearer access');
  });

  it('overrides host when one is supplied anyway — a 3LO token is rejected on the site domain', async () => {
    const calls = mockFetch([json({})]);

    await createClient({
      host: 'https://acme.atlassian.net',
      auth: { type: 'oauth2', accessToken: 'access', cloudId: 'cloud-1' },
    }).sendRequest({ url: '/wiki/api/v2/pages', method: 'GET' });

    expect(calls[0].url).toBe('https://api.atlassian.com/ex/jira/cloud-1/wiki/api/v2/pages');
  });

  it('resolves the cloud id once and reuses it across requests', async () => {
    const site = { id: 'cloud-1', name: 'Acme', url: 'https://acme.atlassian.net', scopes: [], avatarUrl: '' };
    const calls = mockFetch([json([site]), json({}), json({})]);
    const client = createClient({ auth: { type: 'oauth2', accessToken: 'access' } });

    await client.sendRequest({ url: '/wiki/api/v2/pages', method: 'GET' });
    await client.sendRequest({ url: '/wiki/api/v2/spaces', method: 'GET' });

    expect(calls[0].url).toBe('https://api.atlassian.com/oauth/token/accessible-resources');
    expect(calls.filter(call => call.url.includes('accessible-resources'))).toHaveLength(1);
    expect(calls[2].url).toBe('https://api.atlassian.com/ex/jira/cloud-1/wiki/api/v2/spaces');
  });
});

describe('OAuth 2.0 refresh on 401', () => {
  it('refreshes and retries once', async () => {
    const calls = mockFetch([json({ message: 'unauthorized' }, 401), tokens('refreshed'), json({ ok: true })]);

    await createClient({
      auth: { type: 'oauth2', ...CREDENTIALS, accessToken: 'stale', cloudId: 'cloud-1' },
    }).sendRequest({ url: '/wiki/api/v2/pages', method: 'GET' });

    expect(calls[1].url).toBe('https://auth.atlassian.com/oauth/token');
    expect((calls[2].init.headers as Record<string, string>).Authorization).toBe('Bearer refreshed');
  });

  it('gives up after one retry rather than looping on a rejected token', async () => {
    const calls = mockFetch([
      json({ message: 'unauthorized' }, 401),
      tokens('refreshed'),
      json({ message: 'unauthorized' }, 401),
    ]);

    await expect(
      createClient({
        auth: { type: 'oauth2', ...CREDENTIALS, accessToken: 'stale', cloudId: 'cloud-1' },
      }).sendRequest({ url: '/wiki/api/v2/pages', method: 'GET' }),
    ).rejects.toThrow(/401/);

    expect(calls.filter(call => call.url.includes('/ex/jira/'))).toHaveLength(2);
  });

  it('does not try to refresh without the credentials to do it', async () => {
    const calls = mockFetch([json({ message: 'unauthorized' }, 401)]);

    await expect(
      createClient({
        auth: { type: 'oauth2', accessToken: 'stale', cloudId: 'cloud-1' },
      }).sendRequest({ url: '/wiki/api/v2/pages', method: 'GET' }),
    ).rejects.toThrow(/401/);

    expect(calls).toHaveLength(1);
  });
});

describe('config validation', () => {
  it('rejects a partial refresh credential set', () => {
    expect(() =>
      createClient({ auth: { type: 'oauth2', refreshToken: 'r1', clientId: 'client' } }),
    ).toThrow(/must all be provided together/);
  });

  it('rejects OAuth 2.0 with neither an access token nor refresh credentials', () => {
    expect(() => createClient({ auth: { type: 'oauth2' } })).toThrow(/requires either an `accessToken`/);
  });

  it('requires host for every strategy other than OAuth 2.0', () => {
    // @ts-expect-error -- host is mandatory in the type too; this pins the runtime guard
    expect(() => createClient({ auth: { type: 'bearer', token: 'tok' } })).toThrow(/`host` is required/);
  });

  it('accepts OAuth 2.0 without a host', () => {
    expect(() => createClient({ auth: { type: 'oauth2', accessToken: 'access' } })).not.toThrow();
  });
});
