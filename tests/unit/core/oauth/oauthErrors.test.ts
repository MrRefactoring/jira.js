import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AuthError,
  ScopeError,
  createClient,
  createOAuth2Manager,
  isApiError,
  isAuthError,
  isOAuthError,
  isReauthorizationRequired,
  isScopeError,
  refreshOAuth2Token,
} from '#/core';
import type { OAuthError } from '#/core';

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

const SCOPE_401 = () => json({ code: 401, message: 'Unauthorized; scope does not match' }, 401);
const CREDENTIALS = { clientId: 'client', clientSecret: 'secret', refreshToken: 'r1' } as const;

afterEach(() => vi.unstubAllGlobals());

describe('scope errors', () => {
  it('classifies the scope 401 as its own type', async () => {
    mockFetch([SCOPE_401()]);

    const error = await createClient({ host: 'https://acme.atlassian.net' })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ScopeError);
    expect(isScopeError(error)).toBe(true);
    // Still a 401 and still an API error, so broad handlers keep working.
    expect(error).toBeInstanceOf(AuthError);
    expect(isAuthError(error)).toBe(true);
    expect(isApiError(error)).toBe(true);
  });

  it('names what to do about it in the message', async () => {
    mockFetch([SCOPE_401()]);

    const error = await createClient({ host: 'https://acme.atlassian.net' })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    // Jira grants scopes per operation, so the useful advice is to read the one
    // the failing operation names rather than to reach for a whole family.
    expect((error as Error).message).toMatch(/per operation/);
    expect((error as Error).message).toMatch(/API documentation/);
  });

  it('does not burn a token rotation trying to refresh past a missing scope', async () => {
    const calls = mockFetch([SCOPE_401()]);

    await createClient({
      auth: { type: 'oauth2', ...CREDENTIALS, accessToken: 'a', cloudId: 'cloud-1' },
    })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch(() => undefined);

    expect(calls.filter(call => call.url.includes('/oauth/token'))).toHaveLength(0);
    expect(calls).toHaveLength(1);
  });

  it('still refreshes on a 401 that is not about scope', async () => {
    const calls = mockFetch([json({ message: 'expired' }, 401), tokens('fresh'), json({})]);

    await createClient({
      auth: { type: 'oauth2', ...CREDENTIALS, accessToken: 'stale', cloudId: 'cloud-1' },
    }).sendRequest({ url: '/x', method: 'GET' });

    expect(calls.filter(call => call.url.includes('/oauth/token'))).toHaveLength(1);
  });
});

describe('OAuth error codes', () => {
  it('parses error and error_description out of the auth server response', async () => {
    mockFetch([json({ error: 'invalid_grant', error_description: 'Unknown or invalid refresh token.' }, 403)]);

    const error = (await refreshOAuth2Token(CREDENTIALS).catch((e: unknown) => e)) as OAuthError;

    expect(isOAuthError(error)).toBe(true);
    expect(error.error).toBe('invalid_grant');
    expect(error.errorDescription).toBe('Unknown or invalid refresh token.');
    expect(error.status).toBe(403);
  });

  it('flags invalid_grant as needing a fresh authorization', async () => {
    mockFetch([json({ error: 'invalid_grant', error_description: 'nope' }, 403)]);

    const error = await refreshOAuth2Token(CREDENTIALS).catch((e: unknown) => e);

    expect(isReauthorizationRequired(error)).toBe(true);
  });

  it('flags unauthorized_client too — what Atlassian really sends for a dead token', async () => {
    // The documented code is invalid_grant; the live API answers this instead.
    mockFetch([json({ error: 'unauthorized_client', error_description: 'refresh_token is invalid' }, 403)]);

    const error = await refreshOAuth2Token(CREDENTIALS).catch((e: unknown) => e);

    expect(isReauthorizationRequired(error)).toBe(true);
  });

  it('does NOT flag access_denied from the token endpoint — that is a bad client secret', async () => {
    // Sending the user through consent would loop them forever over a config typo.
    mockFetch([json({ error: 'access_denied', error_description: 'Unauthorized' }, 401)]);

    const error = await refreshOAuth2Token(CREDENTIALS).catch((e: unknown) => e);

    expect(isOAuthError(error)).toBe(true);
    expect(isReauthorizationRequired(error)).toBe(false);
  });

  it('does not flag an unrelated OAuth failure', async () => {
    mockFetch([json({ error: 'temporarily_unavailable' }, 503)]);

    const error = await refreshOAuth2Token(CREDENTIALS).catch((e: unknown) => e);

    expect(isOAuthError(error)).toBe(true);
    expect(isReauthorizationRequired(error)).toBe(false);
  });

  it('survives a non-JSON body from the auth server', async () => {
    mockFetch([new Response('<html>gateway</html>', { status: 502, statusText: 'Bad Gateway' })]);

    const error = (await refreshOAuth2Token(CREDENTIALS).catch((e: unknown) => e)) as OAuthError;

    expect(isOAuthError(error)).toBe(true);
    expect(error.error).toBeUndefined();
  });
});

describe('cloud id resolution recovers from a stale token', () => {
  it('refreshes once when accessible-resources answers 401', async () => {
    const site = { id: 'cloud-1', name: 'Acme', url: 'https://acme.atlassian.net', scopes: [], avatarUrl: '' };
    // No expiresAt, so nothing signals staleness up front — the 401 is the signal,
    // and it lands on the lookup that happens before the request loop.
    const calls = mockFetch([json({ message: 'expired' }, 401), tokens('fresh'), json([site])]);

    const manager = createOAuth2Manager({ ...CREDENTIALS, accessToken: 'stale' });

    expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cloud-1');
    expect(calls[1].url).toBe('https://auth.atlassian.com/oauth/token');
  });

  it('gives up when there are no credentials to refresh with', async () => {
    mockFetch([json({ message: 'expired' }, 401)]);

    const manager = createOAuth2Manager({ accessToken: 'stale' });

    await expect(manager.getBaseUrl()).rejects.toThrow(/401/);
  });

  it('does not loop when the refreshed token is rejected too', async () => {
    const calls = mockFetch([json({ message: 'expired' }, 401), tokens('fresh'), json({ message: 'expired' }, 401)]);

    const manager = createOAuth2Manager({ ...CREDENTIALS, accessToken: 'stale' });

    await expect(manager.getBaseUrl()).rejects.toThrow(/401/);
    expect(calls.filter(call => call.url.includes('accessible-resources'))).toHaveLength(2);
  });
});
