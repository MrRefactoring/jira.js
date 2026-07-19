import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ApiError, BufferSchema, createClient, isNetworkError, type NetworkError } from '#/core';

const HOST = 'https://acme.atlassian.net';

interface Call {
  url: string;
  init: RequestInit;
}

/** Answers each call with the next queued response; records what was sent. */
function mockFetch(responses: (Response | Error)[]): Call[] {
  const calls: Call[] = [];
  let index = 0;

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({ url, init });

    const next = responses[Math.min(index, responses.length - 1)];

    index += 1;

    return next instanceof Error ? Promise.reject(next) : Promise.resolve(next.clone());
  });

  return calls;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function networkError(code: string): Error {
  return Object.assign(new Error(code), { code });
}

afterEach(() => vi.unstubAllGlobals());

describe('auth headers', () => {
  it('base64-encodes email and token for basic auth', async () => {
    const calls = mockFetch([json({})]);

    await createClient({ host: HOST, auth: { type: 'basic', email: 'a@b.co', apiToken: 'secret' } })
      .sendRequest({ url: '/x', method: 'GET' });

    const expected = `Basic ${Buffer.from('a@b.co:secret').toString('base64')}`;

    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe(expected);
  });

  it('sends a static bearer token', async () => {
    const calls = mockFetch([json({})]);

    await createClient({ host: HOST, auth: { type: 'bearer', token: 'tok' } })
      .sendRequest({ url: '/x', method: 'GET' });

    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe('Bearer tok');
  });

  it('resolves a bearer token provider per request', async () => {
    const calls = mockFetch([json({})]);
    const getToken = vi.fn().mockResolvedValue('fresh');

    await createClient({ host: HOST, auth: { type: 'bearer', getToken } })
      .sendRequest({ url: '/x', method: 'GET' });

    expect(getToken).toHaveBeenCalledOnce();
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe('Bearer fresh');
  });

  it('sends no Authorization when unauthenticated', async () => {
    const calls = mockFetch([json({})]);

    await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' });

    expect((calls[0].init.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it('re-derives auth once on 401 and retries', async () => {
    const calls = mockFetch([new Response('nope', { status: 401 }), json({ ok: true })]);
    const getAuthOn401 = vi.fn().mockResolvedValue({ type: 'bearer', token: 'renewed' });

    const result = await createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' }, getAuthOn401 })
      .sendRequest({ url: '/x', method: 'GET' });

    expect(result).toEqual({ ok: true });
    expect(calls).toHaveLength(2);
    expect((calls[1].init.headers as Record<string, string>).Authorization).toBe('Bearer renewed');
  });

  it('surfaces the 401 when no refresh hook is configured', async () => {
    mockFetch([new Response('nope', { status: 401 })]);

    await expect(
      createClient({ host: HOST, auth: { type: 'bearer', token: 'stale' } }).sendRequest({ url: '/x', method: 'GET' }),
    ).rejects.toThrow(ApiError);
  });
});

describe('errors', () => {
  it('throws ApiError carrying status and parsed body', async () => {
    mockFetch([json({ message: 'no such page' }, 404)]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(404);
    expect((error as ApiError).body).toEqual({ message: 'no such page' });
  });

  it('keeps a non-JSON error body as raw text', async () => {
    mockFetch([new Response('<html>gateway</html>', { status: 500 })]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect((error as ApiError).body).toBe('<html>gateway</html>');
  });
});

describe('responses', () => {
  it('returns undefined for 204', async () => {
    mockFetch([new Response(null, { status: 204 })]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'DELETE' })).resolves.toBeUndefined();
  });

  it('validates the body against the response schema', async () => {
    mockFetch([json({ id: '1', title: 'Page' })]);

    const schema = z.object({ id: z.string(), title: z.string() });

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema })).resolves.toEqual({
      id: '1',
      title: 'Page',
    });
  });

  it('rejects when the response drifts from the schema', async () => {
    mockFetch([json({ id: 42 })]);

    const schema = z.object({ id: z.string() });

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema })).rejects.toThrow(
      z.ZodError,
    );
  });

  it('falls back to raw text when Confluence mislabels plain text as JSON', async () => {
    mockFetch([new Response('just words', { status: 200, headers: { 'content-type': 'application/json' } })]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' })).resolves.toBe('just words');
  });

  // `BufferSchema` is how a download endpoint declares itself. It has to be the
  // signal rather than the content type, because a download carries the *file's*
  // type — a text attachment is `text/plain`, indistinguishable from an ordinary
  // non-JSON response, which is discarded on purpose just below.
  it('returns the raw bytes for an endpoint that asks for a Buffer', async () => {
    const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);

    mockFetch([new Response(bytes, { status: 200, headers: { 'content-type': 'application/zip' } })]);

    const body = await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema: BufferSchema });

    expect(new Uint8Array(body as Uint8Array)).toEqual(bytes);
  });

  it('returns the bytes of a download whose content type is plain text', async () => {
    mockFetch([new Response('file contents', { status: 200, headers: { 'content-type': 'text/plain' } })]);

    const body = await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema: BufferSchema });

    expect(Buffer.from(body as Uint8Array).toString('utf8')).toBe('file contents');
  });

  it('still discards a non-JSON body when the endpoint does not ask for a Buffer', async () => {
    mockFetch([new Response('<html/>', { status: 200, headers: { 'content-type': 'text/html' } })]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' })).resolves.toBeUndefined();
  });
});

describe('retry', () => {
  const retry = { maxAttempts: 3, initialDelayMs: 1 };

  it('is off by default', async () => {
    const calls = mockFetch([networkError('ECONNRESET')]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' })).rejects.toThrow();
    expect(calls).toHaveLength(1);
  });

  it('retries a transient network error up to maxAttempts', async () => {
    const calls = mockFetch([networkError('ECONNRESET')]);

    await expect(createClient({ host: HOST, retry }).sendRequest({ url: '/x', method: 'GET' })).rejects.toThrow();
    expect(calls).toHaveLength(3);
  });

  it('stops retrying as soon as a call succeeds', async () => {
    const calls = mockFetch([networkError('ETIMEDOUT'), json({ ok: true })]);

    await expect(createClient({ host: HOST, retry }).sendRequest({ url: '/x', method: 'GET' })).resolves.toEqual({
      ok: true,
    });
    expect(calls).toHaveLength(2);
  });

  it('retries 503', async () => {
    const calls = mockFetch([new Response('busy', { status: 503 })]);

    await expect(createClient({ host: HOST, retry }).sendRequest({ url: '/x', method: 'GET' })).rejects.toThrow(
      ApiError,
    );
    expect(calls).toHaveLength(3);
  });

  it('never retries 429 — rate limiting is not a transport failure to paper over', async () => {
    const calls = mockFetch([new Response('slow down', { status: 429 })]);

    await expect(createClient({ host: HOST, retry }).sendRequest({ url: '/x', method: 'GET' })).rejects.toThrow(
      ApiError,
    );
    expect(calls).toHaveLength(1);
  });

  it('never retries 4xx', async () => {
    const calls = mockFetch([new Response('bad', { status: 400 })]);

    await expect(createClient({ host: HOST, retry }).sendRequest({ url: '/x', method: 'GET' })).rejects.toThrow(
      ApiError,
    );
    expect(calls).toHaveLength(1);
  });

  it('does not retry a non-transport error such as a bad URL', async () => {
    const calls = mockFetch([new TypeError('Invalid URL')]);

    const error = await createClient({ host: HOST, retry })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    // Wrapped rather than rethrown, so every failure of this client is catchable
    // as one of its own errors. `transient: false` is what keeps it out of retries.
    expect(isNetworkError(error)).toBe(true);
    expect((error as NetworkError).transient).toBe(false);
    expect((error as NetworkError).cause).toBeInstanceOf(TypeError);
    expect(calls).toHaveLength(1);
  });
});

describe('headers and body', () => {
  it('sets JSON content type for a plain object body', async () => {
    const calls = mockFetch([json({})]);

    await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'POST', body: { title: 'p' } });

    const headers = calls[0].init.headers as Record<string, string>;

    expect(headers['Content-Type']).toBe('application/json');
    expect(calls[0].init.body).toBe('{"title":"p"}');
  });

  it('lets a per-request header win over a client-wide one', async () => {
    const calls = mockFetch([json({})]);

    await createClient({ host: HOST, headers: { 'X-Trace': 'client' } })
      .sendRequest({ url: '/x', method: 'GET', headers: { 'X-Trace': 'request' } });

    expect((calls[0].init.headers as Record<string, string>)['X-Trace']).toBe('request');
  });
});
