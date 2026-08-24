import { beforeAll, describe, expect, it } from 'vitest';
import { getTenantContext, isConfigError } from '#/core';
import { getClient } from '../setup/client';
import { requireLiveEnv } from '../setup/env';

/**
 * Live suite for `getTenantContext`.
 *
 * Atlassian publishes no REST endpoint for a site's `cloudId` or `orgId`, so this is the only way the package can
 * answer the question at all — which makes it worth pinning against the real gateway rather than a mock. The Teams
 * suites depend on it: without a real `orgId` they cannot address a single call.
 */
describe('Jira Cloud — getTenantContext (live)', () => {
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  let host: string;

  beforeAll(() => {
    ({ host } = requireLiveEnv());
  });

  it('resolves the three names the platform APIs address this site by', async () => {
    const context = await getTenantContext(getClient());

    expect(context.cloudId).toMatch(UUID);
    expect(context.orgId).toMatch(UUID);
    expect(context.hostName).toBe(new URL(host).hostname);
  });

  it('agrees with the unauthenticated tenant endpoint about the cloudId', async () => {
    const [context, edge] = await Promise.all([
      getTenantContext(getClient()),
      fetch(`${host}/_edge/tenant_info`).then(response => response.json() as Promise<{ cloudId: string }>),
    ]);

    expect(context.cloudId).toBe(edge.cloudId);
  });

  it('names the organization, which is a level above the site and not the same id', async () => {
    const context = await getTenantContext(getClient());

    expect(context.orgId).not.toBe(context.cloudId);
  });

  it('refuses a client with no host instead of asking the wrong gateway', async () => {
    const error = await getTenantContext({
      auth: { type: 'oauth2', accessToken: 'not-used', cloudId: 'not-used' },
    }).catch((e: unknown) => e);

    expect(isConfigError(error)).toBe(true);
  });
});
