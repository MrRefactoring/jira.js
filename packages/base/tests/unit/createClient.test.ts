import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ApiError } from '../../src/apiError';
import { createClient } from '../../src/createClient';
import { createMultipartRequestBody } from '../../src/formData/multipartRequest';
import type { Auth } from '../../src/schemas';
import {
  getRequestHeaders,
  getRequestInit,
  getRequestUrl,
  installFetchMock,
  restoreFetch,
  type FetchMock,
} from './helpers/fetchMock';
import { emptyResponse, errorResponse, jsonResponse, textResponse } from './helpers/mockResponse';

let fetchMock: FetchMock;

beforeEach(() => {
  fetchMock = installFetchMock();
});

afterEach(() => {
  restoreFetch();
});

const HOST = 'https://example.atlassian.net';

describe('createClient — auth header derivation', () => {
  it('derives a Basic header from basic auth', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({
      host: HOST,
      auth: { type: 'basic', email: 'user@example.com', apiToken: 'tok' },
    });

    await client.sendRequest({ url: '/x' });

    const expected = `Basic ${Buffer.from('user@example.com:tok', 'utf-8').toString('base64')}`;
    expect(getRequestHeaders(fetchMock).authorization).toBe(expected);
  });

  it('derives a Bearer header from a static bearer token', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST, auth: { type: 'bearer', token: 'abc' } });

    await client.sendRequest({ url: '/x' });

    expect(getRequestHeaders(fetchMock).authorization).toBe('Bearer abc');
  });

  it('awaits a bearer provider getToken() and uses the resolved value', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const getToken = vi.fn().mockResolvedValue('dynamic-token');
    const client = createClient({ host: HOST, auth: { type: 'bearer', getToken } });

    await client.sendRequest({ url: '/x' });

    expect(getToken).toHaveBeenCalledOnce();
    expect(getRequestHeaders(fetchMock).authorization).toBe('Bearer dynamic-token');
  });

  it('emits no Authorization header when no auth is configured', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x' });

    expect(getRequestHeaders(fetchMock).authorization).toBeUndefined();
  });
});

describe('createClient — URL assembly', () => {
  it('prefixes paths that start with a slash to the host', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/rest/api/3/issue' });

    expect(getRequestUrl(fetchMock)).toBe(`${HOST}/rest/api/3/issue`);
  });

  it('prepends a slash to paths that do not start with one', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: 'rest/api/3/issue' });

    expect(getRequestUrl(fetchMock)).toBe(`${HOST}/rest/api/3/issue`);
  });

  it('strips a trailing slash from the host before joining', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: `${HOST}/` });

    await client.sendRequest({ url: '/x' });

    expect(getRequestUrl(fetchMock)).toBe(`${HOST}/x`);
  });

  it('uses the request URL as-is when no host is configured', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: '' });

    await client.sendRequest({ url: 'https://other.host/path' });

    expect(getRequestUrl(fetchMock)).toBe('https://other.host/path');
  });

  it('appends searchParams via buildUrlWithSearchParams', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', searchParams: { a: 'b', c: 2 } });

    expect(getRequestUrl(fetchMock)).toBe(`${HOST}/x?a=b&c=2`);
  });
});

describe('createClient — body & Content-Type', () => {
  it('sends no body and no Content-Type for undefined body', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', method: 'POST' });

    expect(getRequestInit(fetchMock).body).toBeUndefined();
    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('sends no body and no Content-Type for null body', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', method: 'POST', body: null });

    expect(getRequestInit(fetchMock).body).toBeUndefined();
    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('passes string body through without adding Content-Type', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', method: 'POST', body: 'raw' });

    expect(getRequestInit(fetchMock).body).toBe('raw');
    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('JSON-stringifies object bodies and sets Content-Type', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', method: 'POST', body: { a: 1 } });

    expect(getRequestInit(fetchMock).body).toBe('{"a":1}');
    expect(getRequestHeaders(fetchMock)['content-type']).toBe('application/json');
  });

  it('passes async iterable bodies through and sets duplex to half', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });
    const body = {
      async *[Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array> {
        yield new TextEncoder().encode('abc');
      },
    };

    await client.sendRequest({ url: '/x', method: 'POST', body });

    const init = getRequestInit(fetchMock) as RequestInit & { duplex?: string };
    expect(init.body).toBe(body);
    expect(init.duplex).toBe('half');
    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('always sends Accept: application/json', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x' });

    expect(getRequestHeaders(fetchMock).accept).toBe('application/json');
  });
});

describe('createClient — header precedence', () => {
  it('merges in order auth < config < request (request wins)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({
      host: HOST,
      auth: { type: 'bearer', token: 'a' },
      headers: { 'X-Test': 'from-config', 'X-Shared': 'config-value' },
    });

    await client.sendRequest({
      url: '/x',
      headers: { 'X-Shared': 'request-value', 'X-Request': 'from-request' },
    });

    const headers = getRequestHeaders(fetchMock);

    expect(headers['x-test']).toBe('from-config');
    expect(headers['x-request']).toBe('from-request');
    expect(headers['x-shared']).toBe('request-value');
    expect(headers.authorization).toBe('Bearer a');
  });

  it('config headers can override auth headers (documented precedence)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createClient({
      host: HOST,
      auth: { type: 'bearer', token: 'a' },
      headers: { Authorization: 'Custom override' },
    });

    await client.sendRequest({ url: '/x' });

    expect(getRequestHeaders(fetchMock).authorization).toBe('Custom override');
  });
});

describe('createClient — 401 retry', () => {
  it('retries once via getAuthOn401 when the first response is 401', async () => {
    fetchMock
      .mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    const newAuth: Auth = { type: 'bearer', token: 'fresh' };
    const getAuthOn401 = vi.fn<() => Promise<Auth>>().mockResolvedValue(newAuth);

    const client = createClient({
      host: HOST,
      auth: { type: 'bearer', token: 'stale' },
      getAuthOn401,
    });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(getAuthOn401).toHaveBeenCalledOnce();
    expect(getRequestHeaders(fetchMock, 0).authorization).toBe('Bearer stale');
    expect(getRequestHeaders(fetchMock, 1).authorization).toBe('Bearer fresh');
  });

  it('throws ApiError on 401 when getAuthOn401 is not configured', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(401, 'nope', { statusText: 'Unauthorized' }));
    const client = createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' } });

    await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not retry a second time when the refreshed request also returns 401', async () => {
    fetchMock
      .mockResolvedValueOnce(errorResponse(401, 'unauth', { statusText: 'Unauthorized' }))
      .mockResolvedValueOnce(errorResponse(401, 'still-unauth', { statusText: 'Unauthorized' }));
    const getAuthOn401 = vi.fn<() => Promise<Auth>>().mockResolvedValue({ type: 'bearer', token: 'fresh' });

    const client = createClient({
      host: HOST,
      auth: { type: 'bearer', token: 'stale' },
      getAuthOn401,
    });

    await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(getAuthOn401).toHaveBeenCalledOnce();
  });

  it('reuses a single-use multipart stream body across retry attempts', async () => {
    const multipart = createMultipartRequestBody({
      filename: 'retry.bin',
      content: {
        async *[Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array> {
          yield new TextEncoder().encode('part-1');
          yield new TextEncoder().encode('part-2');
        },
      },
    });
    const payloadSizes: number[] = [];
    fetchMock.mockImplementation(async (_input, init) => {
      let size = 0;
      const requestBody = init?.body as unknown;
      if (
        requestBody &&
        typeof (requestBody as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function'
      ) {
        for await (const chunk of requestBody as AsyncIterable<Uint8Array>) {
          size += chunk.byteLength;
        }
      }
      payloadSizes.push(size);
      if (payloadSizes.length === 1) {
        return errorResponse(401, 'unauth', { statusText: 'Unauthorized' });
      }
      return jsonResponse({ ok: true });
    });

    const getAuthOn401 = vi.fn<() => Promise<Auth>>().mockResolvedValue({ type: 'bearer', token: 'fresh' });
    const client = createClient({
      host: HOST,
      auth: { type: 'bearer', token: 'stale' },
      getAuthOn401,
    });

    const result = await client.sendRequest({
      url: '/x',
      method: 'POST',
      headers: multipart.headers,
      body: multipart.body,
    });

    expect(result).toEqual({ ok: true });
    expect(payloadSizes[0]).toBeGreaterThan(0);
    expect(payloadSizes[1]).toBe(0);
  });
});

describe('createClient — response handling', () => {
  it('throws ApiError with parsed JSON body when response is JSON', async () => {
    const body = { errorMessages: ['bad'] };
    fetchMock.mockResolvedValueOnce(errorResponse(400, body, { statusText: 'Bad Request' }));

    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 400,
      statusText: 'Bad Request',
      body,
    });
  });

  it('throws ApiError with raw text body when response is not JSON', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(500, 'upstream failure', { statusText: 'Server Error' }));

    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({
      status: 500,
      body: 'upstream failure',
    });
  });

  it('error message contains status, statusText, and a fragment of the response text', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(500, 'boom details', { statusText: 'Server Error' }));
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toThrow(/Request failed: 500 Server Error - boom details/);
  });

  it('returns undefined on 204 No Content', async () => {
    fetchMock.mockResolvedValueOnce(emptyResponse(204));
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBeUndefined();
  });

  it('returns undefined when response is 200 with a non-JSON content-type', async () => {
    fetchMock.mockResolvedValueOnce(textResponse('hi'));
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBeUndefined();
  });

  it('reads the body as text when no content-type header is present', async () => {
    // Uint8Array body does not trigger Response's auto content-type; string body would.
    fetchMock.mockResolvedValueOnce(new Response(new TextEncoder().encode('plain'), { status: 200 }));
    const client = createClient({ host: HOST });

    const result = await client.sendRequest<string>({ url: '/x' });

    expect(result).toBe('plain');
  });

  it('returns parsed JSON when schema is not provided', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1, name: 'x' }));
    const client = createClient({ host: HOST });

    const result = await client.sendRequest<{ id: number; name: string }>({ url: '/x' });

    expect(result).toEqual({ id: 1, name: 'x' });
  });

  it('validates JSON via schema.parse when schema is provided', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1 }));
    const schema = z.object({ id: z.number() });
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x', schema });

    expect(result).toEqual({ id: 1 });
  });

  it('propagates schema.parse errors', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'not-a-number' }));
    const schema = z.object({ id: z.number() });
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x', schema })).rejects.toThrow();
  });

  it('returns undefined when JSON body is empty and .json() throws SyntaxError', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200, headers: { 'content-type': 'application/json' } }));
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBeUndefined();
  });

  it('re-throws non-SyntaxError errors during JSON response processing', async () => {
    const exploding = new Response('{}', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
    const boom = new TypeError('network collapsed');
    vi.spyOn(exploding, 'text').mockRejectedValueOnce(boom);
    fetchMock.mockResolvedValueOnce(exploding);

    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toBe(boom);
  });

  it('uses the ApiError type for all non-ok responses', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(418, "I'm a teapot", { statusText: 'Teapot' }));
    const client = createClient({ host: HOST });

    await expect(client.sendRequest({ url: '/x' })).rejects.toBeInstanceOf(ApiError);
  });
});
