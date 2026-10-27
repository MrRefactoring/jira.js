import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { z } from 'zod';
import {
  createClient,
  isSchemaMismatchError,
  resetSchemaMismatchReporting,
  SchemaMismatchError,
  type SchemaMismatchReport,
} from '#/core';

const report: SchemaMismatchReport = {
  endpoint: 'GET /example',
  issues: [{ path: 'id', expected: 'string', received: 'number' }],
};

afterEach(() => {
  vi.restoreAllMocks();
  resetSchemaMismatchReporting();
});

describe('SchemaMismatchError constructor compatibility', () => {
  it('preserves the report object and cause from the existing constructor', () => {
    const cause = new Error('validation');
    const error = new SchemaMismatchError('mismatch', report, { cause });

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(SchemaMismatchError);
    expect(isSchemaMismatchError(error)).toBe(true);
    expect(error.name).toBe('SchemaMismatchError');
    expect(error.message).toBe('mismatch');
    expectTypeOf<ConstructorParameters<typeof SchemaMismatchError>[1]>().toEqualTypeOf<SchemaMismatchReport>();
    expect(error.report).toBe(report);
    expect(error.cause).toBe(cause);
    expect(error.body).toBe('');
  });

  it('retains an explicitly supplied legacy body and cause', () => {
    const cause = new Error('legacy');
    const error = new SchemaMismatchError('mismatch', '<html>legacy body</html>', { cause });

    expect(error.body).toBe('<html>legacy body</html>');
    expect(error.report).toEqual({ endpoint: '', issues: [] });
    expect(error.cause).toBe(cause);
    expect(isSchemaMismatchError(error)).toBe(true);
  });

  it('accepts an explicit body alongside a structured report', () => {
    const error = new SchemaMismatchError('mismatch', report, { body: 'explicit body' });

    expect(error.body).toBe('explicit body');
    expect(error.report).toBe(report);
  });

  it('keeps the default warn behaviour and returns the original response', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const client = createClient({
      host: 'https://example.atlassian.net',
      fetch: async () => Response.json({ id: 1, secret: 'private' }),
    });
    const result = await client.sendRequest({ url: '/example', method: 'GET', schema: z.object({ id: z.string() }) });

    expect(result).toEqual({ id: 1, secret: 'private' });
    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls.flat().join(' ')).not.toContain('private');
  });

  it('does not retain response values when the Jira transport throws on validation', async () => {
    const client = createClient({
      host: 'https://example.atlassian.net',
      onSchemaMismatch: 'throw',
      fetch: async () => Response.json({ id: 1, secret: 'private' }),
    });
    const error = await client
      .sendRequest({ url: '/example', method: 'GET', schema: z.object({ id: z.string() }) })
      .catch((value: unknown) => value);

    expect(isSchemaMismatchError(error)).toBe(true);
    if (!isSchemaMismatchError(error)) throw error;

    expect(error.body).toBe('');
    expect(error.report).toEqual(report);
    expect(error.cause).toBeInstanceOf(z.ZodError);
    expect(JSON.stringify(error)).not.toContain('private');
  });

  it('does not retain a non-JSON response body', async () => {
    const client = createClient({
      host: 'https://example.atlassian.net',
      fetch: async () => new Response('<html>private</html>', { headers: { 'content-type': 'text/html' } }),
    });
    const error = await client
      .sendRequest({ url: '/example', method: 'GET', schema: z.object({ id: z.string() }) })
      .catch((value: unknown) => value);

    expect(isSchemaMismatchError(error)).toBe(true);
    if (!isSchemaMismatchError(error)) throw error;

    expect(error.body).toBe('');
    expect(error.report.issues[0]?.received).toBe('text/html');
  });
});
