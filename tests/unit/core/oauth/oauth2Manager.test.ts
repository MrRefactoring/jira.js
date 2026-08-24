import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createOAuth2Manager } from '#/core';
import type { TokenRefreshEvent } from '#/core';

const NOW = new Date('2026-06-27T00:00:00.000Z');

interface Call {
  url: string;
  init: RequestInit;
}

/** Answers each call with the next queued response; records what was sent. */
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
    scope: 'read:page:confluence',
    token_type: 'bearer',
  });
}

const CREDENTIALS = { clientId: 'client', clientSecret: 'secret', refreshToken: 'r1' };

beforeEach(() => vi.useFakeTimers({ now: NOW }));

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('token expiry', () => {
  it('refreshes when the token is inside the skew window', async () => {
    const calls = mockFetch([tokens('fresh')]);
    const manager = createOAuth2Manager({
      ...CREDENTIALS,
      accessToken: 'stale',
      expiresAt: NOW.getTime() + 30_000,
    });

    expect(await manager.getAuthorizationHeader()).toBe('Bearer fresh');
    expect(calls).toHaveLength(1);
  });

  it('leaves a token alone while it is comfortably valid', async () => {
    const calls = mockFetch([tokens('fresh')]);
    const manager = createOAuth2Manager({
      ...CREDENTIALS,
      accessToken: 'current',
      expiresAt: NOW.getTime() + 3_600_000,
    });

    expect(await manager.getAuthorizationHeader()).toBe('Bearer current');
    expect(calls).toHaveLength(0);
  });

  it('does not refresh when the expiry is unknown', async () => {
    const calls = mockFetch([tokens('fresh')]);
    const manager = createOAuth2Manager({ ...CREDENTIALS, accessToken: 'current' });

    expect(await manager.getAuthorizationHeader()).toBe('Bearer current');
    expect(calls).toHaveLength(0);
  });

  it('refreshes immediately when there is no access token at all', async () => {
    mockFetch([tokens('fresh')]);
    const manager = createOAuth2Manager(CREDENTIALS);

    expect(await manager.getAuthorizationHeader()).toBe('Bearer fresh');
  });

  it('forceRefresh ignores expiry', async () => {
    const calls = mockFetch([tokens('fresh')]);
    const manager = createOAuth2Manager({
      ...CREDENTIALS,
      accessToken: 'current',
      expiresAt: NOW.getTime() + 3_600_000,
    });

    await manager.forceRefresh();

    expect(calls).toHaveLength(1);
    expect(await manager.getAuthorizationHeader()).toBe('Bearer fresh');
  });
});

describe('refresh token rotation', () => {
  it('reports the rotated token and uses it on the next refresh', async () => {
    const calls = mockFetch([tokens('a1', 'r2'), tokens('a2', 'r3')]);
    const events: TokenRefreshEvent[] = [];
    const manager = createOAuth2Manager({ ...CREDENTIALS, onTokenRefresh: event => void events.push(event) });

    await manager.forceRefresh();
    await manager.forceRefresh();

    expect(events[0]).toEqual({ accessToken: 'a1', refreshToken: 'r2', expiresAt: NOW.getTime() + 3_600_000 });
    expect(JSON.parse(calls[0].init.body as string).refresh_token).toBe('r1');
    expect(JSON.parse(calls[1].init.body as string).refresh_token).toBe('r2');
  });

  it('keeps the old refresh token when the response omits one', async () => {
    const calls = mockFetch([tokens('a1'), tokens('a2')]);
    const manager = createOAuth2Manager(CREDENTIALS);

    await manager.forceRefresh();
    await manager.forceRefresh();

    expect(JSON.parse(calls[1].init.body as string).refresh_token).toBe('r1');
  });
});

describe('single-flight', () => {
  it('collapses concurrent refreshes into one token call', async () => {
    const calls = mockFetch([tokens('fresh')]);
    const manager = createOAuth2Manager(CREDENTIALS);

    const headers = await Promise.all([
      manager.getAuthorizationHeader(),
      manager.getAuthorizationHeader(),
      manager.getAuthorizationHeader(),
    ]);

    expect(headers).toEqual(['Bearer fresh', 'Bearer fresh', 'Bearer fresh']);
    expect(calls).toHaveLength(1);
  });

  it('recovers after a failed refresh instead of caching the failure', async () => {
    mockFetch([new Response('nope', { status: 400, statusText: 'Bad Request' })]);
    const manager = createOAuth2Manager(CREDENTIALS);

    await expect(manager.forceRefresh()).rejects.toThrow(/400 Bad Request/);

    mockFetch([tokens('fresh')]);

    expect(await manager.getAuthorizationHeader()).toBe('Bearer fresh');
  });
});

describe('cloud id resolution', () => {
  const SITES = [
    { id: 'cloud-1', name: 'Acme', url: 'https://acme.atlassian.net', scopes: [], avatarUrl: '' },
    { id: 'cloud-2', name: 'Other', url: 'https://other.atlassian.net', scopes: [], avatarUrl: '' },
  ];

  it('routes through the Jira gateway', async () => {
    const manager = createOAuth2Manager({ accessToken: 'access', cloudId: 'cloud-1' });

    expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cloud-1');
  });

  it('skips the lookup entirely when the cloud id is known', async () => {
    const calls = mockFetch([json(SITES)]);
    const manager = createOAuth2Manager({ accessToken: 'access', cloudId: 'cloud-1' });

    await manager.getBaseUrl();

    expect(calls).toHaveLength(0);
  });

  it('resolves a single accessible site and caches it', async () => {
    const calls = mockFetch([json([SITES[0]])]);
    const manager = createOAuth2Manager({ accessToken: 'access' });

    expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cloud-1');
    expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cloud-1');
    expect(calls).toHaveLength(1);
  });

  it('picks the site matching siteUrl, ignoring case and trailing slash', async () => {
    mockFetch([json(SITES)]);
    const manager = createOAuth2Manager({ accessToken: 'access', siteUrl: 'https://Other.atlassian.net/' });

    expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cloud-2');
  });

  it('refuses to guess when several sites are reachable', async () => {
    mockFetch([json(SITES)]);
    const manager = createOAuth2Manager({ accessToken: 'access' });

    await expect(manager.getBaseUrl()).rejects.toThrow(/Multiple accessible resources/);
  });

  it('explains an empty resource list', async () => {
    mockFetch([json([])]);
    const manager = createOAuth2Manager({ accessToken: 'access' });

    await expect(manager.getBaseUrl()).rejects.toThrow(/No accessible resources/);
  });

  it('reports which sites were available when siteUrl matches none', async () => {
    mockFetch([json(SITES)]);
    const manager = createOAuth2Manager({ accessToken: 'access', siteUrl: 'https://absent.atlassian.net' });

    await expect(manager.getBaseUrl()).rejects.toThrow(/No accessible resource matches siteUrl/);
  });
});

describe('canRefresh', () => {
  it('is true only with the full credential set', () => {
    expect(createOAuth2Manager(CREDENTIALS).canRefresh()).toBe(true);
    expect(createOAuth2Manager({ accessToken: 'access' }).canRefresh()).toBe(false);
    expect(createOAuth2Manager({ refreshToken: 'r1', clientId: 'client' }).canRefresh()).toBe(false);
  });

  it('explains itself when there is no token and no way to get one', async () => {
    const manager = createOAuth2Manager({ refreshToken: 'r1' });

    await expect(manager.getAuthorizationHeader()).rejects.toThrow(/No OAuth 2.0 access token is available/);
  });
});
