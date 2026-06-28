import axios from 'axios';
import * as sinon from 'sinon';
import { afterEach, beforeEach, describe, expect, test as baseTest, vi } from 'vitest';
import { OAuth2Manager } from '@jirajs/services/oauth2/oauth2Manager';

// These tests stub the shared global `axios` and use fake timers. The unit suite runs with
// `--sequence.concurrent`, so everything is wrapped in a single sequential suite (and the tests
// themselves are sequential) to serialize access to the stubbed singleton across describe blocks.
const test = baseTest.sequential;

const REFRESH_CREDS = { refreshToken: 'r1', clientId: 'c', clientSecret: 's' };

const tokenResponse = (overrides: Record<string, unknown> = {}) => ({
  data: {
    access_token: 'new-access',
    refresh_token: 'new-refresh',
    expires_in: 3600,
    scope: 'read:jira-work offline_access',
    token_type: 'bearer',
    ...overrides,
  },
});

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-06-27T00:00:00.000Z'));
});

afterEach(() => {
  vi.useRealTimers();
  sinon.restore();
});

describe.sequential('OAuth2Manager', () => {
  describe('proactive refresh', () => {
    test('refreshes when the token is within the skew window of expiry', async () => {
      const post = sinon.stub(axios, 'post').resolves(tokenResponse());
      const manager = new OAuth2Manager({
        accessToken: 'old',
        expiresAt: Date.now() + 30_000, // 30s left, inside the 60s skew
        ...REFRESH_CREDS,
      });

      const header = await manager.getAuthorizationHeader();

      expect(post.calledOnce).toBe(true);
      expect(header).toBe('Bearer new-access');
    });

    test('does not refresh when the token is far from expiry', async () => {
      const post = sinon.stub(axios, 'post').resolves(tokenResponse());
      const manager = new OAuth2Manager({
        accessToken: 'old',
        expiresAt: Date.now() + 3_600_000,
        ...REFRESH_CREDS,
      });

      const header = await manager.getAuthorizationHeader();

      expect(post.called).toBe(false);
      expect(header).toBe('Bearer old');
    });

    test('does not proactively refresh when expiresAt is unknown', async () => {
      const post = sinon.stub(axios, 'post').resolves(tokenResponse());
      const manager = new OAuth2Manager({ accessToken: 'old', ...REFRESH_CREDS });

      const header = await manager.getAuthorizationHeader();

      expect(post.called).toBe(false);
      expect(header).toBe('Bearer old');
    });
  });

  describe('single-flight refresh', () => {
    test('collapses concurrent refreshes into one network call', async () => {
      const post = sinon.stub(axios, 'post').resolves(tokenResponse());
      const manager = new OAuth2Manager({ expiresAt: Date.now() - 1, ...REFRESH_CREDS });

      const headers = await Promise.all([
        manager.getAuthorizationHeader(),
        manager.getAuthorizationHeader(),
        manager.getAuthorizationHeader(),
      ]);

      expect(post.calledOnce).toBe(true);
      expect(headers).toEqual(['Bearer new-access', 'Bearer new-access', 'Bearer new-access']);
    });
  });

  describe('rotation & persistence', () => {
    test('rotates the refresh token and persists via onTokenRefresh', async () => {
      const post = sinon.stub(axios, 'post');
      post.onFirstCall().resolves(tokenResponse({ refresh_token: 'r2' }));
      post.onSecondCall().resolves(tokenResponse({ refresh_token: 'r3' }));
      const onTokenRefresh = sinon.spy();

      const manager = new OAuth2Manager({ ...REFRESH_CREDS, onTokenRefresh });

      await manager.forceRefresh();

      expect(onTokenRefresh.calledOnce).toBe(true);
      expect(onTokenRefresh.getCall(0).args[0]).toEqual({
        accessToken: 'new-access',
        refreshToken: 'r2',
        expiresAt: Date.now() + 3600 * 1000,
      });

      await manager.forceRefresh();

      // the second refresh must use the rotated token from the first refresh
      expect(post.getCall(1).args[1]).toMatchObject({ grant_type: 'refresh_token', refresh_token: 'r2' });
    });

    test('forceRefresh refreshes even when the token is not near expiry', async () => {
      const post = sinon.stub(axios, 'post').resolves(tokenResponse());
      const manager = new OAuth2Manager({
        accessToken: 'old',
        expiresAt: Date.now() + 3_600_000,
        ...REFRESH_CREDS,
      });

      await manager.forceRefresh();

      expect(post.calledOnce).toBe(true);
    });
  });

  describe('cloudId resolution', () => {
    test('uses an explicit cloudId without a network call', async () => {
      const get = sinon.stub(axios, 'get');
      const manager = new OAuth2Manager({ accessToken: 'a', cloudId: 'cid-explicit' });

      const baseUrl = await manager.getBaseUrl();

      expect(baseUrl).toBe('https://api.atlassian.com/ex/jira/cid-explicit');
      expect(get.called).toBe(false);
    });

    test('resolves and caches the cloudId from accessible-resources', async () => {
      const get = sinon.stub(axios, 'get').resolves({
        data: [{ id: 'cid-1', name: 'S', url: 'https://s.atlassian.net', scopes: [], avatarUrl: '' }],
      });
      const manager = new OAuth2Manager({ accessToken: 'a' });

      expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cid-1');
      expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cid-1');
      expect(get.calledOnce).toBe(true); // cached after the first resolve
    });

    test('matches the requested siteUrl (case- and trailing-slash-insensitive)', async () => {
      sinon.stub(axios, 'get').resolves({
        data: [
          { id: 'cid-a', name: 'A', url: 'https://a.atlassian.net', scopes: [], avatarUrl: '' },
          { id: 'cid-b', name: 'B', url: 'https://b.atlassian.net', scopes: [], avatarUrl: '' },
        ],
      });
      const manager = new OAuth2Manager({ accessToken: 'a', siteUrl: 'https://B.atlassian.net/' });

      expect(await manager.getBaseUrl()).toBe('https://api.atlassian.com/ex/jira/cid-b');
    });

    test('throws when multiple resources and no disambiguation', async () => {
      sinon.stub(axios, 'get').resolves({
        data: [
          { id: 'cid-a', name: 'A', url: 'https://a.atlassian.net', scopes: [], avatarUrl: '' },
          { id: 'cid-b', name: 'B', url: 'https://b.atlassian.net', scopes: [], avatarUrl: '' },
        ],
      });
      const manager = new OAuth2Manager({ accessToken: 'a' });

      await expect(manager.getBaseUrl()).rejects.toThrow(/Multiple accessible Jira resources/);
    });

    test('throws when no resources are accessible', async () => {
      sinon.stub(axios, 'get').resolves({ data: [] });
      const manager = new OAuth2Manager({ accessToken: 'a' });

      await expect(manager.getBaseUrl()).rejects.toThrow(/No accessible Jira resources/);
    });

    test('throws when siteUrl does not match any resource', async () => {
      sinon.stub(axios, 'get').resolves({
        data: [{ id: 'cid-a', name: 'A', url: 'https://a.atlassian.net', scopes: [], avatarUrl: '' }],
      });
      const manager = new OAuth2Manager({ accessToken: 'a', siteUrl: 'https://other.atlassian.net' });

      await expect(manager.getBaseUrl()).rejects.toThrow(/No accessible resource matches/);
    });
  });

  describe('canRefresh', () => {
    test('true only with the full refresh credential set', () => {
      expect(new OAuth2Manager({ ...REFRESH_CREDS }).canRefresh()).toBe(true);
      expect(new OAuth2Manager({ refreshToken: 'r', clientId: 'c' }).canRefresh()).toBe(false);
      expect(new OAuth2Manager({ accessToken: 'a' }).canRefresh()).toBe(false);
    });
  });
});
