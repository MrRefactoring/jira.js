import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ApiError } from '../../src/apiError';
import { createClient } from '../../src/createClient';
import type { Auth } from '../../src/schemas';
import {
  getRequestHeaders,
  installFetchMock,
  restoreFetch,
  type FetchMock,
} from './helpers/fetchMock';
import { errorResponse, jsonResponse } from './helpers/mockResponse';

let fetchMock: FetchMock;

beforeEach(() => {
  fetchMock = installFetchMock();
});

afterEach(() => {
  restoreFetch();
});

const HOST = 'https://example.atlassian.net';

describe('createClient — network failure', () => {
  it('propagates TypeError from fetch without wrapping in ApiError', async () => {
    const networkError = new TypeError('Failed to fetch');
    fetchMock.mockRejectedValueOnce(networkError);
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toBe(networkError);
  });

  it('does not wrap network errors in ApiError', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.not.toBeInstanceOf(ApiError);
  });

  it('propagates TypeError when fetch rejects on the retry attempt after 401', async () => {
    const networkErrorOnRetry = new TypeError('connection reset on retry');
    fetchMock
      .mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }))
      .mockRejectedValueOnce(networkErrorOnRetry);
    const getAuthOn401 = vi.fn<() => Promise<Auth>>().mockResolvedValue({ type: 'bearer', token: 'fresh' });
    const client = createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' }, getAuthOn401 });

    await expect(client.sendRequest({ url: '/x' })).rejects.toBe(networkErrorOnRetry);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe('createClient — dynamic bearer getToken edge cases', () => {
  it('propagates rejection from getToken() before making any fetch call', async () => {
    const tokenError = new Error('token provider unreachable');
    const getToken = vi.fn().mockRejectedValue(tokenError);
    const client = createClient({ host: HOST, auth: { type: 'bearer', getToken } });

    await expect(client.sendRequest({ url: '/x' })).rejects.toBe(tokenError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends "Bearer undefined" when getToken() resolves to undefined at runtime', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}));
    const getToken = vi.fn().mockResolvedValue(undefined);
    // runtime-only scenario: TypeScript would reject undefined, but JS callers may pass it
    const client = createClient({ host: HOST, auth: { type: 'bearer', getToken } as never });

    await client.sendRequest({ url: '/x' });

    expect(getRequestHeaders(fetchMock).authorization).toBe('Bearer undefined');
  });

  it('sends "Bearer " when getToken() resolves to an empty string', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}));
    const getToken = vi.fn().mockResolvedValue('');
    const client = createClient({ host: HOST, auth: { type: 'bearer', getToken } });

    await client.sendRequest({ url: '/x' });

    expect(getRequestHeaders(fetchMock).authorization).toBe('Bearer ');
  });
});

describe('createClient — getAuthOn401 edge cases', () => {
  it('propagates error from getAuthOn401 and makes no second fetch', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }));
    const getAuthOn401 = vi.fn().mockRejectedValue(new Error('refresh token revoked'));
    const client = createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' }, getAuthOn401 });

    await expect(client.sendRequest({ url: '/x' })).rejects.toThrow('refresh token revoked');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('calls getAuthOn401 independently for concurrent 401 responses (no deduplication)', async () => {
    fetchMock
      .mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }))
      .mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }))
      .mockResolvedValueOnce(jsonResponse({ req: 1 }))
      .mockResolvedValueOnce(jsonResponse({ req: 2 }));
    const getAuthOn401 = vi.fn<() => Promise<Auth>>().mockResolvedValue({ type: 'bearer', token: 'fresh' });
    const client = createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' }, getAuthOn401 });

    const [r1, r2] = await Promise.all([
      client.sendRequest({ url: '/a' }),
      client.sendRequest({ url: '/b' }),
    ]);

    expect(getAuthOn401).toHaveBeenCalledTimes(2);
    expect(r1).toEqual({ req: 1 });
    expect(r2).toEqual({ req: 2 });
  });

  it('uses basic auth returned by getAuthOn401 for the retry', async () => {
    fetchMock
      .mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    const newAuth: Auth = { type: 'basic', email: 'admin@corp.com', apiToken: 's3cret' };
    const getAuthOn401 = vi.fn<() => Promise<Auth>>().mockResolvedValue(newAuth);
    const client = createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' }, getAuthOn401 });

    await client.sendRequest({ url: '/x' });

    const expected = `Basic ${Buffer.from('admin@corp.com:s3cret', 'utf-8').toString('base64')}`;
    expect(getRequestHeaders(fetchMock, 1).authorization).toBe(expected);
  });
});

describe('createClient — response parsing edge cases', () => {
  it('returns undefined on 204 even when content-type is application/json', async () => {
    // 204 is a null-body status; the content-type header is set separately
    fetchMock.mockResolvedValueOnce(
      new Response(null, { status: 204, headers: { 'content-type': 'application/json' } }),
    );
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBeUndefined();
  });

  it('does not invoke schema.parse when the JSON body is empty (data coerces to undefined)', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('', { status: 200, headers: { 'content-type': 'application/json' } }),
    );
    const schema = { parse: vi.fn() };
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x', schema });

    expect(schema.parse).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('returns the raw plain-text string when Jira sends application/json content-type with non-JSON body', async () => {
    // Jira sometimes sends "application/json" with a plain-text error body.
    fetchMock.mockResolvedValueOnce(
      new Response('Service Unavailable', { status: 200, headers: { 'content-type': 'application/json' } }),
    );
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBe('Service Unavailable');
  });

  it('passes the raw string to schema.parse when Jira uses application/json with a non-JSON body', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('not json', { status: 200, headers: { 'content-type': 'application/json' } }),
    );
    const schema = z.object({ id: z.number() });
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x', schema })).rejects.toThrow();
  });

  it('error body detail is parsed JSON when available', async () => {
    const body = { errorMessages: ['Issue does not exist'] };
    fetchMock.mockResolvedValueOnce(errorResponse(404, body, { statusText: 'Not Found' }));
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({
      status: 404,
      body,
    });
  });

  it('error body detail is raw text when the error response is not JSON', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(503, 'gateway timeout', { statusText: 'Service Unavailable' }));
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({
      status: 503,
      body: 'gateway timeout',
    });
  });
});
