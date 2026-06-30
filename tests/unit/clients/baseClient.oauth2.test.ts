import * as sinon from 'sinon';
import { afterEach, describe, expect, test as baseTest } from 'vitest';
import { BaseClient } from '@jirajs';
import { jsonResponse, stubFetch } from '@tests/unit/utils/fetchMock';

// The OAuth 2.0 token refresh goes through the global `fetch`; the main request pipeline still uses the
// per-client axios instance (stubbed via `instance.request`). The unit suite runs with
// `--sequence.concurrent`, so everything is wrapped in a single sequential suite (and the tests themselves
// are sequential) to serialize access to the stubbed globals across describe blocks.
const test = baseTest.sequential;

const refreshedToken = {
  access_token: 'refreshed-access',
  refresh_token: 'rotated-refresh',
  expires_in: 3600,
  scope: 'read:jira-work offline_access',
  token_type: 'bearer',
};

const axios401 = { isAxiosError: true, response: { status: 401 } };
const axios500 = { isAxiosError: true, response: { status: 500 } };

const oauth2Manager = (client: BaseClient) => (client as unknown as { oauth2Manager?: unknown }).oauth2Manager;
const instanceOf = (client: BaseClient) => (client as unknown as { instance: { request: unknown } }).instance;

afterEach(() => {
  sinon.restore();
});

describe.sequential('BaseClient OAuth 2.0', () => {
  describe('manager creation', () => {
    test('no manager for a static accessToken + host (unchanged behavior)', () => {
      const client = new BaseClient({
        host: 'https://site.atlassian.net',
        authentication: { oauth2: { accessToken: 'a' } },
      });

      expect(oauth2Manager(client)).toBeUndefined();
    });

    test('creates a manager when host is omitted but cloudId is given', () => {
      const client = new BaseClient({
        authentication: { oauth2: { accessToken: 'a', cloudId: 'cid' } },
      });

      expect(oauth2Manager(client)).toBeDefined();
    });

    test('throws when host is missing and no oauth2 is configured', () => {
      // @ts-expect-error `host` is required at the type level; this verifies the runtime guard for untyped callers
      expect(() => new BaseClient({})).toThrowError(/`host` is required/);
    });
  });

  describe('gateway routing', () => {
    test('overrides baseURL with the gateway for the resolved cloudId', async () => {
      const client = new BaseClient({
        authentication: { oauth2: { accessToken: 'a', cloudId: 'cid' } },
      });
      const request = sinon.stub(instanceOf(client), 'request').resolves({ data: { ok: true } });

      await client.sendRequestFullResponse({ method: 'GET', url: '/rest/api/3/myself' });

      expect((request.getCall(0).args[0] as { baseURL?: string }).baseURL).toBe('https://api.atlassian.com/ex/jira/cid');
      expect((request.getCall(0).args[0] as { headers: Record<string, string> }).headers.Authorization).toBe('Bearer a');
    });
  });

  describe('401 refresh-and-retry', () => {
    test('refreshes once and retries on a 401, then succeeds', async () => {
      const client = new BaseClient({
        authentication: {
          oauth2: { accessToken: 'a', refreshToken: 'r', clientId: 'c', clientSecret: 's', cloudId: 'cid' },
        },
      });
      stubFetch().resolves(jsonResponse(refreshedToken));
      const request = sinon.stub(instanceOf(client), 'request');
      request.onFirstCall().rejects(axios401);
      request.onSecondCall().resolves({ data: { ok: true } });

      const result = await client.sendRequestFullResponse<{ ok: boolean }>({ method: 'GET', url: '/x' });

      expect(request.calledTwice).toBe(true);
      expect(result.data.ok).toBe(true);
      // second attempt carries the refreshed bearer
      expect((request.getCall(1).args[0] as { headers: Record<string, string> }).headers.Authorization).toBe(
        'Bearer refreshed-access',
      );
    });

    test('does not retry on a non-401 error', async () => {
      const client = new BaseClient({
        authentication: {
          oauth2: { accessToken: 'a', refreshToken: 'r', clientId: 'c', clientSecret: 's', cloudId: 'cid' },
        },
      });
      const fetchStub = stubFetch().resolves(jsonResponse(refreshedToken));
      const request = sinon.stub(instanceOf(client), 'request').rejects(axios500);

      await expect(client.sendRequestFullResponse({ method: 'GET', url: '/x' })).rejects.toBe(axios500);
      expect(request.calledOnce).toBe(true);
      expect(fetchStub.called).toBe(false);
    });

    test('retries at most once (no infinite loop on persistent 401)', async () => {
      const client = new BaseClient({
        authentication: {
          oauth2: { accessToken: 'a', refreshToken: 'r', clientId: 'c', clientSecret: 's', cloudId: 'cid' },
        },
      });
      stubFetch().resolves(jsonResponse(refreshedToken));
      const request = sinon.stub(instanceOf(client), 'request').rejects(axios401);

      await expect(client.sendRequestFullResponse({ method: 'GET', url: '/x' })).rejects.toBe(axios401);
      expect(request.calledTwice).toBe(true);
    });

    test('does not retry when the manager cannot refresh (static token)', async () => {
      const client = new BaseClient({
        authentication: { oauth2: { accessToken: 'a', cloudId: 'cid' } },
      });
      const request = sinon.stub(instanceOf(client), 'request').rejects(axios401);

      await expect(client.sendRequestFullResponse({ method: 'GET', url: '/x' })).rejects.toBe(axios401);
      expect(request.calledOnce).toBe(true);
    });
  });
});
