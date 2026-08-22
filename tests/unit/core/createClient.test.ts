import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import {
  ApiError,
  BlobSchema,
  BufferSchema,
  createClient,
  isAuthError,
  isForbiddenError,
  isNetworkError,
  isSchemaMismatchError,
  resetSchemaMismatchReporting,
  type AuthError,
  type NetworkError,
  type SchemaMismatchError,
  type SchemaMismatchReport,
} from '#/core';

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

  it('base64-encodes username and password for Data Center basic auth', async () => {
    const calls = mockFetch([json({})]);

    await createClient({ host: HOST, auth: { type: 'basic', username: 'jdoe', password: 'hunter2' } })
      .sendRequest({ url: '/x', method: 'GET' });

    const expected = `Basic ${Buffer.from('jdoe:hunter2').toString('base64')}`;

    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe(expected);
  });

  it('rejects a basic credential that mixes the two forms', async () => {
    mockFetch([json({})]);

    // Half a Cloud credential and half a Data Center one authenticates against neither, and the 401 it would earn
    // arrives far from the mistake.
    expect(() => createClient({ host: HOST, auth: { email: 'a@b.co', password: 'hunter2' } as never }))
      .toThrow();
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

  it('rejects a drifted response as SchemaMismatchError under `throw`, keeping the zod issues on `cause`', async () => {
    mockFetch([json({ id: 42 })]);

    const schema = z.object({ id: z.string() });

    const error = await createClient({ host: HOST, onSchemaMismatch: 'throw' })
      .sendRequest({ url: '/x', method: 'GET', schema })
      .catch((e: unknown) => e);

    expect(isSchemaMismatchError(error)).toBe(true);
    expect((error as { cause?: unknown }).cause).toBeInstanceOf(z.ZodError);

    const { report } = error as SchemaMismatchError;

    expect(report.endpoint).toBe('GET /x');
    expect(report.issues).toEqual([{ path: 'id', expected: 'string', received: 'number' }]);
    expect(JSON.stringify(report)).not.toContain('42');
  });

  it('hands back the unvalidated body by default rather than ending the request', async () => {
    mockFetch([json({ id: 42 })]);

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    resetSchemaMismatchReporting();

    const result = await createClient({ host: HOST }).sendRequest({
      url: '/x',
      method: 'GET',
      schema: z.object({ id: z.string() }),
    });

    expect(result).toEqual({ id: 42 });
    expect(warn).toHaveBeenCalledOnce();

    warn.mockRestore();
  });

  it('says each distinct problem once, however many responses repeat it', async () => {
    mockFetch([json({ id: 42 }), json({ id: 43 }), json({ id: 44 })]);

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    resetSchemaMismatchReporting();

    const client = createClient({ host: HOST });
    const schema = z.object({ id: z.string() });

    for (let i = 0; i < 3; i++) await client.sendRequest({ url: '/x', method: 'GET', schema });

    expect(warn).toHaveBeenCalledOnce();

    warn.mockRestore();
  });

  it('lets a handler replace the reporting entirely', async () => {
    mockFetch([json({ id: 42 })]);

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const seen: SchemaMismatchReport[] = [];

    resetSchemaMismatchReporting();

    await createClient({ host: HOST, onSchemaMismatch: report => seen.push(report) }).sendRequest({
      url: '/x',
      method: 'GET',
      schema: z.object({ id: z.string() }),
    });

    expect(seen).toHaveLength(1);
    expect(seen[0]!.issues[0]!.path).toBe('id');
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  it('stays quiet under `silent`', async () => {
    mockFetch([json({ id: 42 })]);

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    resetSchemaMismatchReporting();

    const result = await createClient({ host: HOST, onSchemaMismatch: 'silent' }).sendRequest({
      url: '/x',
      method: 'GET',
      schema: z.object({ id: z.string() }),
    });

    expect(result).toEqual({ id: 42 });
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  it('rejects a non-JSON response where a schema was expected, rather than returning undefined', async () => {
    mockFetch([new Response('<html>nope</html>', { status: 200, headers: { 'content-type': 'text/html' } })]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET', schema: z.object({ id: z.string() }) })
      .catch((e: unknown) => e);

    expect(isSchemaMismatchError(error)).toBe(true);
    expect((error as SchemaMismatchError).report.issues).toEqual([
      { path: '', expected: 'application/json', received: 'text/html' },
    ]);
  });

  it('still returns undefined for a non-JSON response when no schema was declared', async () => {
    mockFetch([new Response('plain', { status: 200, headers: { 'content-type': 'text/html' } })]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' })).resolves.toBeUndefined();
  });

  it('falls back to raw text when Confluence mislabels plain text as JSON', async () => {
    mockFetch([new Response('just words', { status: 200, headers: { 'content-type': 'application/json' } })]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' })).resolves.toBe('just words');
  });

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

  it('returns a Blob carrying the content type for an endpoint that asks for one', async () => {
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);

    mockFetch([new Response(bytes, { status: 200, headers: { 'content-type': 'image/png' } })]);

    const body = await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema: BlobSchema });

    expect(body).toBeInstanceOf(Blob);
    expect((body as Blob).type).toBe('image/png');
    expect(new Uint8Array(await (body as Blob).arrayBuffer())).toEqual(bytes);
  });

  it('reads an image as a Blob rather than reporting a schema mismatch', async () => {
    mockFetch([
      new Response('<svg/>', { status: 200, headers: { 'content-type': 'image/svg+xml;charset=UTF-8' } }),
    ]);

    const body = await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema: BlobSchema });

    expect((body as Blob).type).toBe('image/svg+xml;charset=utf-8');
  });

  it('sends a Blob body untouched, letting it carry its own content type', async () => {
    const calls = mockFetch([new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })]);

    await createClient({ host: HOST }).sendRequest({
      url: '/x',
      method: 'POST',
      headers: { 'X-Atlassian-Token': 'no-check' },
      body: new Blob([new Uint8Array([1, 2, 3])], { type: 'image/png' }),
    });

    const headers = calls[0]!.init.headers as Record<string, string>;

    expect(calls[0]!.init.body).toBeInstanceOf(Blob);
    expect(headers['Content-Type']).toBeUndefined();
    expect(headers['X-Atlassian-Token']).toBe('no-check');
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

describe('credentials refused behind a status that says otherwise', () => {
  const basic = { type: 'basic', email: 'a@b.co', apiToken: 'expired' } as const;

  /** What Jira answers an anonymous-accessible endpoint with when the token is dead. */
  function anonymous(reason = 'AUTHENTICATED_FAILED', status = 200): Response {
    return new Response(JSON.stringify({ total: 0, isLast: true, values: [] }), {
      status,
      headers: { 'content-type': 'application/json', 'x-seraph-loginreason': reason },
    });
  }

  it('throws rather than handing back the anonymous body', async () => {
    mockFetch([anonymous()]);

    const error = await createClient({ host: HOST, auth: basic })
      .sendRequest({ url: '/rest/api/3/project/search', method: 'GET' })
      .catch((e: unknown) => e);

    expect(isAuthError(error)).toBe(true);
    expect((error as AuthError).message).toContain('x-seraph-loginreason: AUTHENTICATED_FAILED');
  });

  it('reports the status that was actually on the wire, not 401', async () => {
    mockFetch([anonymous()]);

    const error = await createClient({ host: HOST, auth: basic })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect((error as AuthError).status).toBe(200);
    expect((error as AuthError).statusText).toBe('');
  });

  it('fires on a 4xx too, where the status alone would blame the request', async () => {
    mockFetch([anonymous('AUTHENTICATED_FAILED', 400)]);

    const error = await createClient({ host: HOST, auth: basic })
      .sendRequest({ url: '/x', method: 'POST' })
      .catch((e: unknown) => e);

    expect(isAuthError(error)).toBe(true);
    expect((error as AuthError).status).toBe(400);
  });

  it('counts a login the instance refused outright', async () => {
    mockFetch([anonymous('AUTHENTICATION_DENIED')]);

    const error = await createClient({ host: HOST, auth: basic })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect(isAuthError(error)).toBe(true);
  });

  it.each(['AUTHORISATION_FAILED', 'OUT', 'OK'])('leaves %s alone — it is not a refused credential', async reason => {
    mockFetch([anonymous(reason)]);

    await expect(
      createClient({ host: HOST, auth: basic }).sendRequest({ url: '/x', method: 'GET' }),
    ).resolves.toEqual({ total: 0, isLast: true, values: [] });
  });

  it('leaves a client with no credentials alone', async () => {
    mockFetch([anonymous()]);

    await expect(createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' })).resolves.toEqual({
      total: 0,
      isLast: true,
      values: [],
    });
  });

  it('does not reclassify a permission denial that carries the header', async () => {
    mockFetch([
      new Response('{"errorMessages":["nope"]}', {
        status: 403,
        headers: { 'content-type': 'application/json', 'x-seraph-loginreason': 'AUTHORISATION_FAILED' },
      }),
    ]);

    const error = await createClient({ host: HOST, auth: basic })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect(isForbiddenError(error)).toBe(true);
    expect(isAuthError(error)).toBe(false);
  });

  it('gives getAuthOn401 the same single attempt a 401 would', async () => {
    const calls = mockFetch([anonymous(), json({ ok: true })]);
    const getAuthOn401 = vi.fn(async () => ({ type: 'basic', email: 'a@b.co', apiToken: 'fresh' }) as const);

    await expect(
      createClient({ host: HOST, auth: basic, getAuthOn401 }).sendRequest({ url: '/x', method: 'GET' }),
    ).resolves.toEqual({ ok: true });

    expect(getAuthOn401).toHaveBeenCalledOnce();
    expect(calls).toHaveLength(2);
    expect((calls[1].init.headers as Record<string, string>).Authorization).toContain(
      Buffer.from('a@b.co:fresh').toString('base64'),
    );
  });

  it('does not loop when the fresh credentials are refused as well', async () => {
    const calls = mockFetch([anonymous(), anonymous()]);
    const getAuthOn401 = vi.fn(async () => ({ type: 'basic', email: 'a@b.co', apiToken: 'also-dead' }) as const);

    await expect(
      createClient({ host: HOST, auth: basic, getAuthOn401 }).sendRequest({ url: '/x', method: 'GET' }),
    ).rejects.toSatisfy(isAuthError);

    expect(calls).toHaveLength(2);
  });
});

describe('cancellation', () => {
  it('hands the signal to fetch', async () => {
    const calls = mockFetch([json({})]);
    const controller = new AbortController();

    await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', signal: controller.signal });

    expect(calls[0].init.signal).toBe(controller.signal);
  });

  it('rethrows the reason the caller supplied, unwrapped', async () => {
    const reason = new Error('gave up waiting');

    mockFetch([reason]);

    const controller = new AbortController();

    controller.abort(reason);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET', signal: controller.signal })
      .catch((e: unknown) => e);

    expect(error).toBe(reason);
    expect(isNetworkError(error)).toBe(false);
  });

  it('cuts the retry back-off short instead of waiting it out', async () => {
    const calls = mockFetch([networkError('ECONNRESET')]);
    const controller = new AbortController();
    const started = Date.now();

    setTimeout(() => controller.abort(), 5);

    // Compared after the fact: `signal.reason` is undefined until `abort()` runs, so reading it while building the
    // assertion would pin the wrong value.
    const error = await createClient({ host: HOST, retry: { maxAttempts: 3, initialDelayMs: 30_000 } })
      .sendRequest({ url: '/x', method: 'GET', signal: controller.signal })
      .catch((e: unknown) => e);

    expect(error).toBe(controller.signal.reason);
    expect(calls).toHaveLength(1);
    expect(Date.now() - started).toBeLessThan(1_000);
  });
});

describe('a fetch of your own', () => {
  it('is used in place of the global one', async () => {
    mockFetch([json({ from: 'global' })]);

    const own = vi.fn(async (_url: string, _init: RequestInit) => json({ from: 'own' }));

    await expect(
      createClient({ host: HOST, fetch: own }).sendRequest({ url: '/x', method: 'GET' }),
    ).resolves.toEqual({ from: 'own' });

    expect(own).toHaveBeenCalledOnce();
    expect(own.mock.calls[0][0]).toBe(`${HOST}/x`);
  });

  it('sees the headers the client built', async () => {
    const own = vi.fn(async (_url: string, _init: RequestInit) => json({}));

    await createClient({
      host: HOST,
      auth: { type: 'bearer', token: 'pat' },
      fetch: own,
    }).sendRequest({ url: '/x', method: 'GET' });

    const init = own.mock.calls[0][1];

    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer pat');
  });
});
