import { afterEach, describe, expect, it, vi } from 'vitest';
import { createClient, getTenantContext, isApiError, isConfigError, isNotFoundError, type ApiError } from '#/core';

const HOST = 'https://acme.atlassian.net';
const AUTH = { type: 'basic', email: 'someone@acme.io', apiToken: 'token' } as const;

const CONTEXT = {
  cloudId: '07028e94-bb1a-40d6-9337-aa1708858030',
  orgId: '3cf0d0b5-eeec-4e1b-8da8-c5b47e8ae609',
  hostName: 'acme.atlassian.net',
};

interface Call {
  url: string;
  init: RequestInit;
}

function mockFetch(body: unknown): Call[] {
  const calls: Call[] = [];

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({ url, init });

    return Promise.resolve(
      new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } }),
    );
  });

  return calls;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('the site has three names', () => {
  it('asks the gateway once, naming the site it was configured with', async () => {
    const calls = mockFetch({ data: { tenantContexts: [CONTEXT] } });

    const context = await getTenantContext({ host: HOST, auth: AUTH });

    expect(context).toEqual(CONTEXT);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(`${HOST}/gateway/api/graphql`);
    expect(calls[0].init.method).toBe('POST');
    expect(JSON.parse(calls[0].init.body as string)).toMatchObject({
      operationName: 'TenantContext',
      variables: { hostNames: ['acme.atlassian.net'] },
    });
  });

  it('takes a client that was already built, and sends through it', async () => {
    const calls = mockFetch({ data: { tenantContexts: [CONTEXT] } });
    const client = createClient({ host: HOST, auth: AUTH, headers: { 'X-Trace': 'yes' } });

    await expect(getTenantContext(client)).resolves.toEqual(CONTEXT);
    expect((calls[0].init.headers as Record<string, string>)['X-Trace']).toBe('yes');
  });

  // What happens once it is aborted belongs to `createClient` and is tested there; the job here is to thread the
  // option rather than drop it.
  it('hands the abort signal to the request', async () => {
    const calls = mockFetch({ data: { tenantContexts: [CONTEXT] } });
    const controller = new AbortController();

    await getTenantContext({ host: HOST, auth: AUTH }, { signal: controller.signal });

    expect(calls[0].init.signal).toBe(controller.signal);
  });
});

describe('when the site cannot be named', () => {
  it('refuses a client with no host rather than sending somewhere arbitrary', async () => {
    const calls = mockFetch({ data: { tenantContexts: [CONTEXT] } });

    const error = await getTenantContext({
      auth: { type: 'oauth2', accessToken: 'token', cloudId: 'cloud-id' },
    }).catch((e: unknown) => e);

    expect(isConfigError(error)).toBe(true);
    expect((error as Error).message).toContain('OAuth 2.0');
    expect(calls).toHaveLength(0);
  });

  it('reports the gateway error with the status it hid in the body, not the 200 it answered with', async () => {
    mockFetch({
      errors: [{ message: 'Auth category: UNAUTHENTICATED is not allowed in service tcs', extensions: { statusCode: 403 } }],
      data: { tenantContexts: null },
    });

    const error = await getTenantContext({ host: HOST, auth: AUTH }).catch((e: unknown) => e);

    expect(isApiError(error)).toBe(true);
    expect((error as ApiError).status).toBe(403);
    expect((error as Error).message).toContain('UNAUTHENTICATED');
  });

  it('falls back to 502 when the gateway names no status', async () => {
    mockFetch({ errors: [{ message: 'something broke' }] });

    const error = await getTenantContext({ host: HOST, auth: AUTH }).catch((e: unknown) => e);

    expect((error as ApiError).status).toBe(502);
  });

  it('is a not-found when Atlassian answers cleanly but knows no such site', async () => {
    mockFetch({ data: { tenantContexts: [] } });

    const error = await getTenantContext({ host: HOST, auth: AUTH }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
    expect((error as Error).message).toContain(HOST);
  });
});
