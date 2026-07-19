import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ApiError,
  AuthError,
  ForbiddenError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  SchemaMismatchError,
  ServerError,
  createClient,
  isApiError,
  isAuthError,
  isForbiddenError,
  isNetworkError,
  isNotFoundError,
  isOAuthError,
  isRateLimitError,
  isSchemaMismatchError,
  isServerError,
  withRetry,
} from '#/core';

const HOST = 'https://acme.atlassian.net';

interface Call {
  url: string;
  init: RequestInit;
}

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

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function request(status: number, headers: Record<string, string> = {}): Promise<unknown> {
  mockFetch([json({ message: 'nope' }, status, headers)]);

  return createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET' });
}

afterEach(() => vi.unstubAllGlobals());

describe('status to error class', () => {
  it.each([
    [401, AuthError, isAuthError],
    [403, ForbiddenError, isForbiddenError],
    [404, NotFoundError, isNotFoundError],
    [429, RateLimitError, isRateLimitError],
    [500, ServerError, isServerError],
    [503, ServerError, isServerError],
  ])('maps %i to its own class', async (status, Class, predicate) => {
    const error = await request(status).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Class);
    expect(predicate(error)).toBe(true);
    expect((error as ApiError).status).toBe(status);
  });

  it('leaves an unremarkable 4xx as a plain ApiError', async () => {
    const error = await request(418).catch((e: unknown) => e);

    expect(isApiError(error)).toBe(true);
    expect(isNotFoundError(error)).toBe(false);
    expect((error as ApiError).status).toBe(418);
  });

  it('keeps every subclass catchable as ApiError', async () => {
    const error = await request(404).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(isApiError(error)).toBe(true);
  });

  it('carries the parsed body', async () => {
    const error = await request(404).catch((e: unknown) => e);

    expect((error as ApiError).body).toEqual({ message: 'nope' });
  });
});

describe('rate limiting', () => {
  it('reads Retry-After given in seconds', async () => {
    const error = await request(429, { 'retry-after': '30' }).catch((e: unknown) => e);

    expect((error as RateLimitError).retryAfterMs).toBe(30_000);
  });

  it('reads Retry-After given as an HTTP date', async () => {
    vi.useFakeTimers({ now: new Date('2026-06-27T00:00:00.000Z') });

    const error = await request(429, { 'retry-after': 'Sat, 27 Jun 2026 00:01:00 GMT' }).catch((e: unknown) => e);

    expect((error as RateLimitError).retryAfterMs).toBe(60_000);

    vi.useRealTimers();
  });

  it('leaves retryAfterMs undefined when the header is absent or nonsense', async () => {
    expect(((await request(429).catch((e: unknown) => e)) as RateLimitError).retryAfterMs).toBeUndefined();

    const garbled = await request(429, { 'retry-after': 'soon' }).catch((e: unknown) => e);

    expect((garbled as RateLimitError).retryAfterMs).toBeUndefined();
  });
});

describe('network failures', () => {
  it('wraps a transport error and marks it transient', async () => {
    mockFetch([Object.assign(new Error('fetch failed'), { code: 'ECONNRESET' })]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(NetworkError);
    expect(isNetworkError(error)).toBe(true);
    expect((error as NetworkError).code).toBe('ECONNRESET');
    expect((error as NetworkError).transient).toBe(true);
  });

  it('finds the code one level down the cause chain', async () => {
    const cause = Object.assign(new Error('read ECONNRESET'), { code: 'UND_ERR_SOCKET' });

    mockFetch([Object.assign(new TypeError('fetch failed'), { cause })]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect((error as NetworkError).code).toBe('UND_ERR_SOCKET');
    expect((error as NetworkError).transient).toBe(true);
  });

  it('treats a broken TLS session as transient', async () => {
    mockFetch([Object.assign(new Error('ssl'), { code: 'ERR_SSL_WRONG_VERSION_NUMBER' })]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect((error as NetworkError).transient).toBe(true);
  });

  it('is not an ApiError — there was no HTTP answer to describe', async () => {
    mockFetch([Object.assign(new Error('nope'), { code: 'ENOTFOUND' })]);

    const error = await createClient({ host: HOST })
      .sendRequest({ url: '/x', method: 'GET' })
      .catch((e: unknown) => e);

    expect(isApiError(error)).toBe(false);
  });
});

describe('predicates versus instanceof', () => {
  it('narrows a foreign copy of the error that instanceof would miss', () => {
    const real = new NotFoundError('gone', 'Not Found', null);
    // What a second copy of the package in node_modules produces: same brand,
    // different prototype. `instanceof` on a plain object cannot see it.
    const foreign = Object.assign(Object.create(null), {
      ...real,
      [Symbol.for('confluence.js:error-kinds')]: ['api', 'notFound'],
    });

    expect(isNotFoundError(foreign)).toBe(true);
    expect(isApiError(foreign)).toBe(true);
  });

  it('rejects unrelated values', () => {
    for (const value of [null, undefined, 'error', 42, {}, new Error('plain')]) {
      expect(isApiError(value)).toBe(false);
      expect(isNetworkError(value)).toBe(false);
      expect(isOAuthError(value)).toBe(false);
    }
  });

  it('does not confuse siblings', async () => {
    const error = await request(403).catch((e: unknown) => e);

    expect(isForbiddenError(error)).toBe(true);
    expect(isAuthError(error)).toBe(false);
    expect(isNotFoundError(error)).toBe(false);
  });
});

describe('SchemaMismatchError', () => {
  it('reports a 2xx that is not JSON where a schema was promised', () => {
    const error = new SchemaMismatchError('not json', '<html>hi</html>');

    expect(isSchemaMismatchError(error)).toBe(true);
    expect(isApiError(error)).toBe(false);
    expect(error.body).toBe('<html>hi</html>');
  });
});

describe('withRetry shares the client policy', () => {
  it('retries a 503', async () => {
    let attempts = 0;

    const result = await withRetry(
      async () => {
        attempts += 1;

        if (attempts < 3) throw new ServerError('down', 503, 'Service Unavailable', null);

        return 'ok';
      },
      { maxAttempts: 3, initialDelayMs: 0 },
    );

    expect(result).toBe('ok');
    expect(attempts).toBe(3);
  });

  it('retries a transient network failure', async () => {
    let attempts = 0;

    await withRetry(
      async () => {
        attempts += 1;

        if (attempts < 2) throw new NetworkError('reset', { cause: null, code: 'ECONNRESET', transient: true });

        return 'ok';
      },
      { maxAttempts: 2, initialDelayMs: 0 },
    );

    expect(attempts).toBe(2);
  });

  it('does not retry a 429 by default', async () => {
    let attempts = 0;

    await expect(
      withRetry(
        async () => {
          attempts += 1;

          throw new RateLimitError('slow down', 'Too Many Requests', null);
        },
        { maxAttempts: 3, initialDelayMs: 0 },
      ),
    ).rejects.toBeInstanceOf(RateLimitError);

    expect(attempts).toBe(1);
  });

  it('retries a 429 when asked, honouring Retry-After', async () => {
    let attempts = 0;

    await withRetry(
      async () => {
        attempts += 1;

        if (attempts < 2) {
          throw new RateLimitError('slow down', 'Too Many Requests', null, { retryAfterMs: 0 });
        }

        return 'ok';
      },
      { maxAttempts: 2, initialDelayMs: 0, retryRateLimit: true },
    );

    expect(attempts).toBe(2);
  });

  it('never retries a 404', async () => {
    let attempts = 0;

    await expect(
      withRetry(
        async () => {
          attempts += 1;

          throw new NotFoundError('gone', 'Not Found', null);
        },
        { maxAttempts: 3, initialDelayMs: 0 },
      ),
    ).rejects.toBeInstanceOf(NotFoundError);

    expect(attempts).toBe(1);
  });
});
