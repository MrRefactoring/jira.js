import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createClient,
  exchangeServerAuthorizationCode,
  generateServerAuthorizationUrl,
  refreshServerOAuth2Token,
} from '#/core';

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

function tokens(accessToken: string, refreshToken?: string): Response {
  return json({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 3600,
    scope: 'READ WRITE',
    token_type: 'bearer',
  });
}

const HOST = 'https://jira.acme.internal';

const CREDENTIALS = {
  clientId: 'client',
  clientSecret: 'secret',
  refreshToken: 'r1',
  redirectUri: 'https://app.acme.internal/callback',
} as const;

afterEach(() => vi.unstubAllGlobals());

describe('Data Center authorization URL', () => {
  it('is built on the instance, not on auth.atlassian.com', () => {
    const url = new URL(
      generateServerAuthorizationUrl({
        host: HOST,
        clientId: 'client',
        scopes: ['READ', 'WRITE'],
        redirectUri: 'https://app.acme.internal/callback',
        state: 'nonce',
      }),
    );

    expect(url.origin).toBe(HOST);
    expect(url.pathname).toBe('/rest/oauth2/latest/authorize');
    expect(url.searchParams.get('scope')).toBe('READ WRITE');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('state')).toBe('nonce');
  });

  it('does not double the slash when the host carries a trailing one', () => {
    const url = generateServerAuthorizationUrl({
      host: `${HOST}/`,
      clientId: 'client',
      scopes: ['READ'],
      redirectUri: 'https://app.acme.internal/callback',
      state: 'nonce',
    });

    expect(url.startsWith(`${HOST}/rest/oauth2/latest/authorize?`)).toBe(true);
  });
});

describe('Data Center token endpoint', () => {
  it('posts the code exchange form-encoded to the instance', async () => {
    const calls = mockFetch([tokens('access')]);

    const result = await exchangeServerAuthorizationCode({
      host: HOST,
      clientId: 'client',
      clientSecret: 'secret',
      code: 'auth-code',
      redirectUri: 'https://app.acme.internal/callback',
    });

    expect(calls[0].url).toBe(`${HOST}/rest/oauth2/latest/token`);
    expect((calls[0].init.headers as Record<string, string>)['Content-Type']).toBe(
      'application/x-www-form-urlencoded',
    );

    const form = new URLSearchParams(calls[0].init.body as string);

    expect(form.get('grant_type')).toBe('authorization_code');
    expect(form.get('code')).toBe('auth-code');
    expect(result.accessToken).toBe('access');
  });

  it('sends redirect_uri on the refresh grant, which Data Center validates there too', async () => {
    const calls = mockFetch([tokens('access', 'r2')]);

    await refreshServerOAuth2Token({ host: HOST, ...CREDENTIALS });

    const form = new URLSearchParams(calls[0].init.body as string);

    expect(form.get('grant_type')).toBe('refresh_token');
    expect(form.get('redirect_uri')).toBe(CREDENTIALS.redirectUri);
  });

  it('turns a non-2xx into an OAuthError carrying the body', async () => {
    mockFetch([json({ error: 'invalid_grant' }, 400)]);

    await expect(refreshServerOAuth2Token({ host: HOST, ...CREDENTIALS })).rejects.toMatchObject({
      status: 400,
      body: { error: 'invalid_grant' },
    });
  });
});

describe('a client authenticated against Data Center', () => {
  it('keeps talking to the instance — there is no gateway to route through', async () => {
    const calls = mockFetch([json({})]);

    await createClient({
      host: HOST,
      auth: { type: 'oauth2Server', accessToken: 'access' },
    }).sendRequest({ url: '/rest/api/2/myself', method: 'GET' });

    expect(calls[0].url).toBe(`${HOST}/rest/api/2/myself`);
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe('Bearer access');
  });

  it('refreshes an expired token before the request, and reports the rotated one', async () => {
    const calls = mockFetch([tokens('fresh', 'r2'), json({})]);
    const rotated: string[] = [];

    await createClient({
      host: HOST,
      auth: {
        type: 'oauth2Server',
        accessToken: 'stale',
        expiresAt: Date.now() - 1,
        ...CREDENTIALS,
        onTokenRefresh: event => void rotated.push(event.refreshToken!),
      },
    }).sendRequest({ url: '/rest/api/2/myself', method: 'GET' });

    expect(calls[0].url).toBe(`${HOST}/rest/oauth2/latest/token`);
    expect((calls[1].init.headers as Record<string, string>).Authorization).toBe('Bearer fresh');
    expect(rotated).toEqual(['r2']);
  });

  it('refreshes once and retries when the instance answers 401', async () => {
    const calls = mockFetch([json({ message: 'no' }, 401), tokens('fresh'), json({})]);

    await createClient({
      host: HOST,
      auth: { type: 'oauth2Server', accessToken: 'stale', ...CREDENTIALS },
    }).sendRequest({ url: '/rest/api/2/myself', method: 'GET' });

    expect(calls.map(call => call.url)).toEqual([
      `${HOST}/rest/api/2/myself`,
      `${HOST}/rest/oauth2/latest/token`,
      `${HOST}/rest/api/2/myself`,
    ]);
  });

  it('refuses a half-filled refresh credential set', () => {
    // Without `redirectUri` the refresh grant is rejected by the provider, and the failure would surface an hour
    // later as an `invalid_grant` naming nothing.
    expect(() =>
      createClient({
        host: HOST,
        auth: { type: 'oauth2Server', refreshToken: 'r1', clientId: 'client', clientSecret: 'secret' },
      }),
    ).toThrow();
  });
});
