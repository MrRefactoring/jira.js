import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createServer, type Server } from 'node:http';

const { execMock } = vi.hoisted(() => ({ execMock: vi.fn() }));

vi.mock('node:child_process', async () => {
  const actual = await vi.importActual<typeof import('node:child_process')>('node:child_process');

  return { ...actual, exec: execMock };
});

import { obtainAtlassianOAuthTokens } from '../../../src/oauth/obtainAtlassianOAuthTokens';
import { getRequestInit, getRequestUrl, installFetchMock, restoreFetch, type FetchMock } from '../helpers/fetchMock';
import { errorResponse, jsonResponse } from '../helpers/mockResponse';
import { findFreePort, sendCallback, waitForPort } from '../helpers/serverHelpers';

let fetchMock: FetchMock;

beforeEach(() => {
  fetchMock = installFetchMock();
  execMock.mockReset();
});

afterEach(() => {
  restoreFetch();
  vi.restoreAllMocks();
});

describe('obtainAtlassianOAuthTokens', () => {
  it('exchanges the callback code for tokens and resolves with the mapped result', async () => {
    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        access_token: 'at',
        expires_in: 3600,
        scope: 'read:jira-user',
        refresh_token: 'rt',
      }),
    );

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'client',
      clientSecret: 'secret',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'read:jira-user',
      state: 'fixed-state',
    });

    await waitForPort(port);

    const callback = await sendCallback(port, '/callback', 'code=AUTH&state=fixed-state');

    expect(callback.status).toBe(200);
    expect(callback.body).toContain('Authorization successful');

    const tokens = await tokensPromise;

    expect(tokens).toEqual({
      accessToken: 'at',
      expiresIn: 3600,
      scope: 'read:jira-user',
      refreshToken: 'rt',
    });

    expect(getRequestUrl(fetchMock)).toBe('https://auth.atlassian.com/oauth/token');
    expect(getRequestInit(fetchMock).body).toBe(
      JSON.stringify({
        grant_type: 'authorization_code',
        client_id: 'client',
        client_secret: 'secret',
        code: 'AUTH',
        redirect_uri: `http://127.0.0.1:${port}/callback`,
      }),
    );
  });

  it('leaves refreshToken undefined when the server omits it', async () => {
    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(jsonResponse({ access_token: 'at', expires_in: 60, scope: 'r' }));

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 's1',
    });

    await waitForPort(port);
    await sendCallback(port, '/callback', 'code=AUTH&state=s1');

    const tokens = await tokensPromise;

    expect(tokens.refreshToken).toBeUndefined();
  });

  it('rejects with "Invalid state or missing code" when state mismatches', async () => {
    const port = await findFreePort();

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 'expected',
    });
    const assertion = expect(tokensPromise).rejects.toThrow('Invalid state or missing code');

    await waitForPort(port);

    const callback = await sendCallback(port, '/callback', 'code=AUTH&state=wrong');

    expect(callback.status).toBe(400);
    expect(callback.body).toBe('Invalid state or missing code');

    await assertion;
  });

  it('rejects when code is missing from the callback', async () => {
    const port = await findFreePort();

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 's1',
    });
    const assertion = expect(tokensPromise).rejects.toThrow('Invalid state or missing code');

    await waitForPort(port);

    const callback = await sendCallback(port, '/callback', 'state=s1');

    expect(callback.status).toBe(400);

    await assertion;
  });

  it('returns 404 for unknown paths and continues to wait for the real callback', async () => {
    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(jsonResponse({ access_token: 'at', expires_in: 60, scope: 'r' }));

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 's1',
    });

    await waitForPort(port);

    const noise = await sendCallback(port, '/somewhere-else', 'code=X&state=s1');

    expect(noise.status).toBe(404);

    const real = await sendCallback(port, '/callback', 'code=AUTH&state=s1');

    expect(real.status).toBe(200);

    const tokens = await tokensPromise;

    expect(tokens.accessToken).toBe('at');
  });

  it('rejects when the token-exchange endpoint returns non-ok', async () => {
    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(errorResponse(400, 'invalid_grant', { statusText: 'Bad Request' }));

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 's1',
    });
    const assertion = expect(tokensPromise).rejects.toThrow(/Token exchange failed: 400 invalid_grant/);

    await waitForPort(port);
    await sendCallback(port, '/callback', 'code=AUTH&state=s1');

    await assertion;
  });

  it('opens the auth URL in a browser when openBrowser is true', async () => {
    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(jsonResponse({ access_token: 'at', expires_in: 60, scope: 'r' }));

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'client',
      clientSecret: 'secret',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 's1',
      openBrowser: true,
    });

    await waitForPort(port);

    expect(execMock).toHaveBeenCalledTimes(1);

    const command = execMock.mock.calls[0][0] as string;

    expect(command).toMatch(/^(open|start|xdg-open) "https:\/\/auth\.atlassian\.com\//);
    expect(command).toContain('client_id=client');
    expect(command).toContain('state=s1');

    await sendCallback(port, '/callback', 'code=AUTH&state=s1');
    await tokensPromise;
  });

  it('does not open a browser when openBrowser is unset', async () => {
    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(jsonResponse({ access_token: 'at', expires_in: 60, scope: 'r' }));

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
      state: 's1',
    });

    await waitForPort(port);
    await sendCallback(port, '/callback', 'code=AUTH&state=s1');
    await tokensPromise;

    expect(execMock).not.toHaveBeenCalled();
  });

  it('generates a random state when none is provided (deterministic via mocked crypto)', async () => {
    vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation(arr => {
      const view = arr as Uint8Array;

      for (let i = 0; i < view.length; i++) {
        view[i] = i;
      }

      return arr;
    });

    const expectedState = Array.from({ length: 24 }, (_, i) => i.toString(16).padStart(2, '0')).join('');

    const port = await findFreePort();

    fetchMock.mockResolvedValueOnce(jsonResponse({ access_token: 'at', expires_in: 60, scope: 'r' }));

    const tokensPromise = obtainAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 's',
      redirectUri: `http://127.0.0.1:${port}/callback`,
      scope: 'r',
    });
    const assertion = expect(tokensPromise).rejects.toThrow('Invalid state or missing code');

    await waitForPort(port);

    const wrong = await sendCallback(port, '/callback', 'code=X&state=not-the-state');

    expect(wrong.status).toBe(400);

    await assertion;

    expect(expectedState).toHaveLength(48);
  });

  it('rejects when the server cannot bind to the requested port', async () => {
    const port = await findFreePort();

    // Hold the port so the function under test cannot bind to it.
    const blocker = await new Promise<Server>((resolve, reject) => {
      const srv = createServer();

      srv.on('error', reject);
      srv.listen(port, '127.0.0.1', () => resolve(srv));
    });

    try {
      await expect(
        obtainAtlassianOAuthTokens({
          clientId: 'c',
          clientSecret: 's',
          redirectUri: `http://127.0.0.1:${port}/callback`,
          scope: 'r',
          state: 's1',
        }),
      ).rejects.toThrow();
    } finally {
      await new Promise<void>(resolve => blocker.close(() => resolve()));
    }
  });
});
