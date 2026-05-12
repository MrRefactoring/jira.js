import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { refreshAtlassianOAuthTokens } from '../../../src/oauth/refreshAtlassianOAuthTokens';
import {
  getRequestHeaders,
  getRequestInit,
  getRequestUrl,
  installFetchMock,
  restoreFetch,
  type FetchMock,
} from '../helpers/fetchMock';
import { errorResponse, jsonResponse } from '../helpers/mockResponse';

let fetchMock: FetchMock;

beforeEach(() => {
  fetchMock = installFetchMock();
});

afterEach(() => {
  restoreFetch();
});

describe('refreshAtlassianOAuthTokens', () => {
  it('posts grant_type=refresh_token to the Atlassian token endpoint', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        access_token: 'at',
        expires_in: 3600,
        scope: 'read:jira-user',
        refresh_token: 'rt-new',
      }),
    );

    await refreshAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 'sec',
      refreshToken: 'rt',
    });

    expect(getRequestUrl(fetchMock)).toBe('https://auth.atlassian.com/oauth/token');
    expect(getRequestInit(fetchMock).method).toBe('POST');
    expect(getRequestHeaders(fetchMock)['content-type']).toBe('application/json');
    expect(getRequestInit(fetchMock).body).toBe(
      JSON.stringify({
        grant_type: 'refresh_token',
        client_id: 'c',
        client_secret: 'sec',
        refresh_token: 'rt',
      }),
    );
  });

  it('maps the response to AtlassianOAuthTokens', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        access_token: 'at',
        expires_in: 3600,
        scope: 'read:jira-user',
        refresh_token: 'rt-new',
      }),
    );

    const tokens = await refreshAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 'sec',
      refreshToken: 'rt',
    });

    expect(tokens).toEqual({
      accessToken: 'at',
      expiresIn: 3600,
      scope: 'read:jira-user',
      refreshToken: 'rt-new',
    });
  });

  it('leaves refreshToken undefined when not returned by the server', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ access_token: 'at', expires_in: 3600, scope: 'x' }));

    const tokens = await refreshAtlassianOAuthTokens({
      clientId: 'c',
      clientSecret: 'sec',
      refreshToken: 'rt',
    });

    expect(tokens.refreshToken).toBeUndefined();
  });

  it('throws an Error with response text when the refresh fails', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(400, 'invalid_grant', { statusText: 'Bad Request' }));

    await expect(
      refreshAtlassianOAuthTokens({
        clientId: 'c',
        clientSecret: 'sec',
        refreshToken: 'rt',
      }),
    ).rejects.toThrow('Token refresh failed: 400 invalid_grant');
  });

  it('throws on 500 responses as well', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(500, 'down', { statusText: 'Server Error' }));

    await expect(
      refreshAtlassianOAuthTokens({
        clientId: 'c',
        clientSecret: 'sec',
        refreshToken: 'rt',
      }),
    ).rejects.toThrow(/Token refresh failed: 500/);
  });
});
