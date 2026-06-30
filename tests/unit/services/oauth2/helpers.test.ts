import * as sinon from 'sinon';
import { afterEach, describe, expect, test as baseTest } from 'vitest';
import {
  exchangeAuthorizationCode,
  generateAuthorizationUrl,
  getAccessibleResources,
  refreshOAuth2Token,
} from '@jirajs';
import { jsonResponse, requestBody, stubFetch } from '@tests/unit/utils/fetchMock';

// These tests stub the global `fetch`. The unit suite runs with `--sequence.concurrent`, so everything is
// wrapped in a single sequential suite (and the tests themselves are sequential) to serialize access to
// the stubbed global across describe blocks.
const test = baseTest.sequential;

const rawToken = {
  access_token: 'new-access-token',
  refresh_token: 'new-refresh-token',
  expires_in: 3600,
  scope: 'read:jira-work offline_access',
  token_type: 'bearer',
};

afterEach(() => {
  sinon.restore();
});

describe.sequential('oauth2 helpers', () => {
  describe('generateAuthorizationUrl', () => {
    test('builds the Atlassian authorize URL with all required params', () => {
      const url = generateAuthorizationUrl({
        clientId: 'client-123',
        scopes: ['read:jira-work', 'offline_access'],
        redirectUri: 'https://app.example.com/callback',
        state: 'xyz-state',
      });

      expect(url.startsWith('https://auth.atlassian.com/authorize?')).toBe(true);

      const params = new URL(url).searchParams;

      expect(params.get('audience')).toBe('api.atlassian.com');
      expect(params.get('client_id')).toBe('client-123');
      expect(params.get('scope')).toBe('read:jira-work offline_access');
      expect(params.get('redirect_uri')).toBe('https://app.example.com/callback');
      expect(params.get('state')).toBe('xyz-state');
      expect(params.get('response_type')).toBe('code');
      expect(params.get('prompt')).toBe('consent');
    });

    test('honors custom prompt and audience', () => {
      const url = generateAuthorizationUrl({
        clientId: 'c',
        scopes: ['read:me'],
        redirectUri: 'https://x/cb',
        state: 's',
        prompt: 'login',
        audience: 'custom-audience',
      });
      const params = new URL(url).searchParams;

      expect(params.get('prompt')).toBe('login');
      expect(params.get('audience')).toBe('custom-audience');
    });
  });

  describe('exchangeAuthorizationCode', () => {
    test('POSTs the authorization_code grant and maps the response', async () => {
      const fetchStub = stubFetch().resolves(jsonResponse(rawToken));

      const result = await exchangeAuthorizationCode({
        clientId: 'client-123',
        clientSecret: 'secret-456',
        code: 'auth-code',
        redirectUri: 'https://app.example.com/callback',
      });

      expect(fetchStub.calledOnce).toBe(true);
      expect(fetchStub.getCall(0).args[0]).toBe('https://auth.atlassian.com/oauth/token');
      expect(fetchStub.getCall(0).args[1]?.method).toBe('POST');
      expect(requestBody(fetchStub.getCall(0))).toEqual({
        grant_type: 'authorization_code',
        client_id: 'client-123',
        client_secret: 'secret-456',
        code: 'auth-code',
        redirect_uri: 'https://app.example.com/callback',
      });

      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 3600,
        scope: 'read:jira-work offline_access',
        tokenType: 'bearer',
      });
    });
  });

  describe('refreshOAuth2Token', () => {
    test('POSTs the refresh_token grant and returns the rotated token', async () => {
      const fetchStub = stubFetch().resolves(jsonResponse(rawToken));

      const result = await refreshOAuth2Token({
        clientId: 'client-123',
        clientSecret: 'secret-456',
        refreshToken: 'old-refresh-token',
      });

      expect(fetchStub.getCall(0).args[0]).toBe('https://auth.atlassian.com/oauth/token');
      expect(requestBody(fetchStub.getCall(0))).toEqual({
        grant_type: 'refresh_token',
        client_id: 'client-123',
        client_secret: 'secret-456',
        refresh_token: 'old-refresh-token',
      });
      expect(result.accessToken).toBe('new-access-token');
      expect(result.refreshToken).toBe('new-refresh-token');
    });
  });

  describe('getAccessibleResources', () => {
    test('GETs accessible-resources with a Bearer header and returns the array', async () => {
      const resources = [
        { id: 'cloud-1', name: 'Site', url: 'https://site.atlassian.net', scopes: ['read:jira-work'], avatarUrl: 'a' },
      ];
      const fetchStub = stubFetch().resolves(jsonResponse(resources));

      const result = await getAccessibleResources('access-token-abc');

      expect(fetchStub.getCall(0).args[0]).toBe('https://api.atlassian.com/oauth/token/accessible-resources');
      expect((fetchStub.getCall(0).args[1]?.headers as Record<string, string>).Authorization).toBe(
        'Bearer access-token-abc',
      );
      expect(result).toEqual(resources);
    });
  });
});
