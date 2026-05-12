import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ApiError } from '../../src/apiError';
import { sendRequest } from '../../src/sendRequest';
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

describe('sendRequest — request shape', () => {
  it('defaults method to GET', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({ url: 'https://host/api' });

    expect(getRequestInit(fetchMock).method).toBe('GET');
  });

  it('does not set Content-Type when body is omitted', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({ url: 'https://host/api' });

    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('allows caller headers to override the default Content-Type', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({
      url: 'https://host/api',
      headers: { 'Content-Type': 'text/plain', 'X-Custom': 'yes' },
    });

    const headers = getRequestHeaders(fetchMock);

    expect(headers['content-type']).toBe('text/plain');
    expect(headers['x-custom']).toBe('yes');
  });

  it('drops the body on GET requests even when body is provided', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({ url: 'https://host/api', method: 'GET', body: { a: 1 } });

    expect(getRequestInit(fetchMock).body).toBeUndefined();
  });

  it('passes string body through as-is on non-GET requests', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({ url: 'https://host/api', method: 'POST', body: 'raw-string' });

    expect(getRequestInit(fetchMock).body).toBe('raw-string');
  });

  it('JSON-stringifies object bodies on non-GET requests', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({ url: 'https://host/api', method: 'POST', body: { a: 1 } });

    expect(getRequestInit(fetchMock).body).toBe('{"a":1}');
  });

  it('passes async iterable bodies through and sets duplex to half', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    const body = {
      async *[Symbol.asyncIterator](): AsyncIterableIterator<string> {
        yield 'hello';
      },
    };

    await sendRequest({ url: 'https://host/api', method: 'POST', body });

    const init = getRequestInit(fetchMock) as RequestInit & { duplex?: string };
    expect(init.body).toBe(body);
    expect(init.duplex).toBe('half');
    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('passes URLSearchParams without JSON content-type', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    const body = new URLSearchParams({ a: '1' });
    await sendRequest({ url: 'https://host/api', method: 'POST', body });

    expect(getRequestInit(fetchMock).body).toBe(body);
    expect(getRequestHeaders(fetchMock)['content-type']).toBeUndefined();
  });

  it('appends searchParams to the URL via buildUrlWithSearchParams', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await sendRequest({
      url: 'https://host/api',
      searchParams: { a: 'b', c: 2 },
    });

    expect(getRequestUrl(fetchMock)).toBe('https://host/api?a=b&c=2');
  });
});

describe('sendRequest — error responses', () => {
  it('throws ApiError with JSON detail when the body is JSON', async () => {
    const body = { errorMessages: ['bad'] };
    fetchMock.mockResolvedValueOnce(errorResponse(400, body, { statusText: 'Bad Request' }));

    await expect(sendRequest({ url: 'https://host/api' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 400,
      statusText: 'Bad Request',
      body,
    });
  });

  it('throws ApiError with raw text detail when the body is not JSON', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(500, 'upstream failure', { statusText: 'Server Error' }));

    const promise = sendRequest({ url: 'https://host/api' });
    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      status: 500,
      statusText: 'Server Error',
      body: 'upstream failure',
    });
  });

  it('message includes status and statusText', async () => {
    fetchMock.mockResolvedValueOnce(errorResponse(404, 'nope', { statusText: 'Not Found' }));

    await expect(sendRequest({ url: 'https://host/api' })).rejects.toThrow('Request failed: 404 Not Found');
  });
});

describe('sendRequest — JSON response handling', () => {
  it('returns parsed JSON on a successful response', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1, name: 'x' }));

    const result = await sendRequest<{ id: number; name: string }>({ url: 'https://host/api' });

    expect(result).toEqual({ id: 1, name: 'x' });
  });

  it('returns undefined when JSON body is empty and response.json() throws SyntaxError', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200, headers: { 'content-type': 'application/json' } }));

    const result = await sendRequest({ url: 'https://host/api' });

    expect(result).toBeUndefined();
  });

  it('re-throws non-SyntaxError errors from response.json()', async () => {
    const exploding = new Response('{}', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
    const boom = new TypeError('network collapsed');
    vi.spyOn(exploding, 'json').mockRejectedValueOnce(boom);
    fetchMock.mockResolvedValueOnce(exploding);

    await expect(sendRequest({ url: 'https://host/api' })).rejects.toBe(boom);
  });

  it('runs schema.parse on JSON responses when schema is provided', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1 }));
    const schema = z.object({ id: z.number() });

    const result = await sendRequest({ url: 'https://host/api', schema });

    expect(result).toEqual({ id: 1 });
  });

  it('propagates schema.parse errors', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'not-a-number' }));
    const schema = z.object({ id: z.number() });

    await expect(sendRequest({ url: 'https://host/api', schema })).rejects.toThrow();
  });
});

describe('sendRequest — non-JSON response handling', () => {
  it('returns text when content-type is not JSON and no schema is provided', async () => {
    fetchMock.mockResolvedValueOnce(textResponse('hello world'));

    const result = await sendRequest<string>({ url: 'https://host/api' });

    expect(result).toBe('hello world');
  });

  it('throws ApiError when content-type is not JSON but a schema is provided', async () => {
    fetchMock.mockResolvedValueOnce(textResponse('hello world'));
    const schema = z.string();

    await expect(sendRequest({ url: 'https://host/api', schema })).rejects.toMatchObject({
      name: 'ApiError',
      status: 0,
      message: 'Schema provided but response is not JSON',
      body: 'hello world',
    });
  });

  it('falls back to text when content-type header is missing', async () => {
    fetchMock.mockResolvedValueOnce(new Response('plain', { status: 200 }));

    const result = await sendRequest<string>({ url: 'https://host/api' });

    expect(result).toBe('plain');
  });

  it('returns empty string on 200 with no content-type and empty body', async () => {
    fetchMock.mockResolvedValueOnce(emptyResponse(200));

    const result = await sendRequest<string>({ url: 'https://host/api' });

    expect(result).toBe('');
  });

  it('returns empty string on 204 — sendRequest has no special 204 handling unlike createClient', async () => {
    fetchMock.mockResolvedValueOnce(emptyResponse(204));

    const result = await sendRequest<string>({ url: 'https://host/api' });

    expect(result).toBe('');
  });
});

describe('sendRequest — network failure', () => {
  it('propagates TypeError from fetch without wrapping in ApiError', async () => {
    const networkError = new TypeError('Failed to fetch');
    fetchMock.mockRejectedValueOnce(networkError);

    await expect(sendRequest({ url: 'https://host/api' })).rejects.toBe(networkError);
  });

  it('does not wrap network errors in ApiError', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(sendRequest({ url: 'https://host/api' })).rejects.not.toBeInstanceOf(ApiError);
  });
});
