import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  exchangeAuthorizationCode,
  generateAuthorizationUrl,
  getAccessibleResources,
  refreshOAuth2Token,
} from '#/core';

interface Call {
  url: string;
  init: RequestInit;
}

function mockFetch(response: Response): Call[] {
  const calls: Call[] = [];

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({ url, init });

    return Promise.resolve(response.clone());
  });

  return calls;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

const TOKENS = {
  access_token: 'access',
  refresh_token: 'refresh',
  expires_in: 3600,
  scope: 'read:page:confluence offline_access',
  token_type: 'bearer',
};

afterEach(() => vi.unstubAllGlobals());

describe('generateAuthorizationUrl', () => {
  it('builds the consent URL with space-joined scopes', () => {
    const url = new URL(
      generateAuthorizationUrl({
        clientId: 'client',
        scopes: ['read:page:confluence', 'offline_access'],
        redirectUri: 'https://app.example/callback',
        state: 'xyz',
      }),
    );

    expect(url.origin + url.pathname).toBe('https://auth.atlassian.com/authorize');
    expect(url.searchParams.get('scope')).toBe('read:page:confluence offline_access');
    expect(url.searchParams.get('audience')).toBe('api.atlassian.com');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('prompt')).toBe('consent');
    expect(url.searchParams.get('state')).toBe('xyz');
  });

  it('honours a custom prompt and audience', () => {
    const url = new URL(
      generateAuthorizationUrl({
        clientId: 'client',
        scopes: ['read:page:confluence'],
        redirectUri: 'https://app.example/callback',
        state: 'xyz',
        prompt: 'none',
        audience: 'api.stg.atlassian.com',
      }),
    );

    expect(url.searchParams.get('prompt')).toBe('none');
    expect(url.searchParams.get('audience')).toBe('api.stg.atlassian.com');
  });
});

describe('exchangeAuthorizationCode', () => {
  it('posts the authorization_code grant and maps the response', async () => {
    const calls = mockFetch(json(TOKENS));

    const tokens = await exchangeAuthorizationCode({
      clientId: 'client',
      clientSecret: 'secret',
      code: 'the-code',
      redirectUri: 'https://app.example/callback',
    });

    expect(calls[0].url).toBe('https://auth.atlassian.com/oauth/token');
    expect(JSON.parse(calls[0].init.body as string)).toEqual({
      grant_type: 'authorization_code',
      client_id: 'client',
      client_secret: 'secret',
      code: 'the-code',
      redirect_uri: 'https://app.example/callback',
    });
    expect(tokens).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      expiresIn: 3600,
      scope: 'read:page:confluence offline_access',
      tokenType: 'bearer',
    });
  });

  it('throws with the status and body when the exchange fails', async () => {
    mockFetch(new Response('bad code', { status: 400, statusText: 'Bad Request' }));

    await expect(
      exchangeAuthorizationCode({
        clientId: 'client',
        clientSecret: 'secret',
        code: 'stale',
        redirectUri: 'https://app.example/callback',
      }),
    ).rejects.toThrow(/400 Bad Request: bad code/);
  });
});

describe('refreshOAuth2Token', () => {
  it('posts the refresh_token grant', async () => {
    const calls = mockFetch(json(TOKENS));

    await refreshOAuth2Token({ clientId: 'client', clientSecret: 'secret', refreshToken: 'r1' });

    expect(JSON.parse(calls[0].init.body as string)).toEqual({
      grant_type: 'refresh_token',
      client_id: 'client',
      client_secret: 'secret',
      refresh_token: 'r1',
    });
  });
});

describe('getAccessibleResources', () => {
  it('sends the bearer token and returns the sites', async () => {
    const calls = mockFetch(json([{ id: 'cloud-1', name: 'Acme', url: 'https://acme.atlassian.net' }]));

    const resources = await getAccessibleResources('access');

    expect(calls[0].url).toBe('https://api.atlassian.com/oauth/token/accessible-resources');
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe('Bearer access');
    expect(resources[0].id).toBe('cloud-1');
  });
});
