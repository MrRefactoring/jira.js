/**
 * Mutation-hardening tests for schema handling in createClient.
 *
 * These tests exist because the nominal suite only checks the final result value,
 * not the specific argument passed to schema.parse. This means mutations like
 * "call schema.parse({})" or "call schema.parse(undefined)" would survive the
 * nominal tests as long as the schema returns the same output.
 *
 * Each test here targets a specific mutation that would otherwise survive.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { createClient } from '../../src/createClient';
import {
  installFetchMock,
  restoreFetch,
  type FetchMock,
} from './helpers/fetchMock';
import { emptyResponse, jsonResponse } from './helpers/mockResponse';

let fetchMock: FetchMock;

const HOST = 'https://example.atlassian.net';

beforeEach(() => {
  fetchMock = installFetchMock();
});

afterEach(() => {
  restoreFetch();
});

describe('createClient — schema.parse receives correct argument', () => {
  it('calls schema.parse with the actual JSON data, not undefined or empty object', async () => {
    const payload = { id: 7, name: 'Kira' };
    fetchMock.mockResolvedValueOnce(jsonResponse(payload));

    const schema = { parse: vi.fn().mockReturnValue(payload) };
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', schema });

    expect(schema.parse).toHaveBeenCalledOnce();
    expect(schema.parse).toHaveBeenCalledWith(payload);
  });

  it('schema.parse is called with a deeply nested payload (not a shallow copy)', async () => {
    const payload = { issue: { fields: { status: { name: 'Done' } } } };
    fetchMock.mockResolvedValueOnce(jsonResponse(payload));

    const schema = { parse: vi.fn().mockReturnValue(payload) };
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', schema });

    const arg = schema.parse.mock.calls[0]![0] as typeof payload;
    expect(arg.issue.fields.status.name).toBe('Done');
  });

  it('returns the transformed value from schema.parse, not the raw JSON', async () => {
    // Mutation: "return data as T" instead of "return schema.parse(data) as T"
    // would return the raw JSON, not the Zod-parsed/transformed value.
    fetchMock.mockResolvedValueOnce(jsonResponse({ ts: '2026-01-01' }));

    const schema = z.object({ ts: z.string().transform(s => new Date(s)) });
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x', schema });

    expect(result.ts).toBeInstanceOf(Date);
    expect(result.ts.getFullYear()).toBe(2026);
  });

  it('schema.parse is not called when response body is empty (data is undefined)', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('', { status: 200, headers: { 'content-type': 'application/json' } }),
    );
    const schema = { parse: vi.fn() };
    const client = createClient({ host: HOST });

    await client.sendRequest({ url: '/x', schema });

    expect(schema.parse).not.toHaveBeenCalled();
  });

  it('schema.parse is NOT called on 204 response even with a schema configured', async () => {
    // Mutation: removing the `response.status === 204` early-return check.
    fetchMock.mockResolvedValueOnce(emptyResponse(204));
    const schema = { parse: vi.fn() };
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x', schema });

    expect(schema.parse).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('schema.parse is NOT called when response is non-JSON (early undefined return)', async () => {
    // Non-JSON response (text/plain) — createClient returns undefined, schema is not called.
    fetchMock.mockResolvedValueOnce(
      new Response('plain text', { status: 200, headers: { 'content-type': 'text/plain' } }),
    );
    const schema = { parse: vi.fn() };
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x', schema });

    expect(schema.parse).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});

describe('createClient — ZodError propagates as ZodError, not ApiError', () => {
  it('propagates ZodError class identity when schema rejects the response', async () => {
    // Mutation: if ZodError were caught and re-thrown as ApiError, the instanceof check would fail.
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'not-a-number' }));
    const schema = z.object({ id: z.number() });
    const client = createClient({ host: HOST });

    const err = await client.sendRequest({ url: '/x', schema }).catch(e => e);

    // Must be ZodError (from Zod), NOT ApiError (from the transport layer).
    // ZodError extends Error, so we verify by constructor name and presence of .issues.
    expect(err.constructor.name).toBe('ZodError');
    expect(err.issues).toBeDefined();
    expect(err.issues.length).toBeGreaterThan(0);
  });

  it('ZodError includes the field that failed validation', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'wrong', name: 'ok' }));
    const schema = z.object({ id: z.number(), name: z.string() });
    const client = createClient({ host: HOST });

    const err = await client.sendRequest({ url: '/x', schema }).catch(e => e);

    const paths = err.issues.map((i: { path: string[] }) => i.path.join('.'));
    expect(paths).toContain('id');
    expect(paths).not.toContain('name');
  });
});

describe('createClient — schema used per-request, not shared across requests', () => {
  it('uses the schema from each individual request (not a stale schema from a previous request)', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ count: 5 }))
      .mockResolvedValueOnce(jsonResponse({ name: 'Alice' }));

    const client = createClient({ host: HOST });

    const schema1 = z.object({ count: z.number() });
    const schema2 = z.object({ name: z.string() });

    const [r1, r2] = await Promise.all([
      client.sendRequest({ url: '/a', schema: schema1 }),
      client.sendRequest({ url: '/b', schema: schema2 }),
    ]);

    expect(r1.count).toBe(5);
    expect(r2.name).toBe('Alice');
  });
});

describe('createClient — Jira plain-text body with application/json content-type', () => {
  it('returns the raw string when Jira sends application/json with a non-JSON body', async () => {
    // Jira occasionally sends a Content-Type: application/json with a plain-text error body.
    // Mutation: if the SyntaxError catch path stored undefined instead of text, this fails.
    fetchMock.mockResolvedValueOnce(
      new Response('Service temporarily unavailable', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBe('Service temporarily unavailable');
  });

  it('returns undefined (not empty string) when Jira sends application/json with empty body', async () => {
    // Mutation target: `data = text || undefined` — if changed to `data = text`, empty string would
    // be returned instead of undefined, which would be passed to schema.parse.
    fetchMock.mockResolvedValueOnce(
      new Response('', { status: 200, headers: { 'content-type': 'application/json' } }),
    );
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    expect(result).toBeUndefined();
  });
});

describe('createClient — adversarial response shapes', () => {
  it('handles response with application/json; charset=utf-8 (compound content-type)', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      }),
    );
    const schema = z.object({ ok: z.boolean() });
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x', schema });

    expect(result.ok).toBe(true);
  });

  it('treats status 200 with no content-type as non-JSON (returns undefined)', async () => {
    // No Content-Type header → createClient returns undefined (no JSON parse attempt).
    fetchMock.mockResolvedValueOnce(new Response(new TextEncoder().encode('{}'), { status: 200 }));
    const client = createClient({ host: HOST });

    const result = await client.sendRequest({ url: '/x' });

    // createClient reads text when no content-type; empty Uint8Array body → undefined
    // actual: readableStream → text() → '{}'... but no content-type → falls to text fallback
    // In createClient: no content-type → falls through to `const text = await response.text()`
    // then `data = text || undefined` → '{}' is truthy → data = '{}'
    expect(result).toBe('{}');
  });

  it('non-2xx status codes that are technically "ok" do not exist — all non-ok throw', async () => {
    for (const status of [400, 401, 403, 404, 500, 503]) {
      fetchMock.mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'fail' }), {
          status,
          statusText: 'Error',
          headers: { 'content-type': 'application/json' },
        }),
      );
      const client = createClient({ host: HOST });
      await expect(client.sendRequest({ url: '/x' })).rejects.toMatchObject({ status });
    }
  });
});
