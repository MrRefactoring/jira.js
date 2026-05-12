import { describe, expect, it } from 'vitest';
import { sendRequestOptionsSchema } from '../../../src/schemas/sendRequestOptions';

describe('sendRequestOptionsSchema', () => {
  it('accepts the minimal shape { url }', () => {
    const parsed = sendRequestOptionsSchema.parse({ url: '/x' });

    expect(parsed.url).toBe('/x');
  });

  it('accepts all valid HTTP methods', () => {
    for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const) {
      expect(sendRequestOptionsSchema.parse({ url: '/x', method })).toMatchObject({ method });
    }
  });

  it('rejects an unknown HTTP method', () => {
    expect(() => sendRequestOptionsSchema.parse({ url: '/x', method: 'CONNECT' })).toThrow();
  });

  it('accepts arbitrary body values (no validation)', () => {
    expect(sendRequestOptionsSchema.parse({ url: '/x', body: { anything: [1, 2, 'three'] } })).toMatchObject({
      url: '/x',
    });
    expect(sendRequestOptionsSchema.parse({ url: '/x', body: 'raw' })).toMatchObject({ url: '/x' });
    expect(sendRequestOptionsSchema.parse({ url: '/x', body: null })).toMatchObject({ url: '/x' });
  });

  it('accepts a searchParams record with any value type', () => {
    const parsed = sendRequestOptionsSchema.parse({
      url: '/x',
      searchParams: { a: 'string', b: 1, c: true, d: null, e: [1, 2] },
    });

    expect(parsed.searchParams).toBeDefined();
  });

  it('accepts a headers record of strings', () => {
    const parsed = sendRequestOptionsSchema.parse({
      url: '/x',
      headers: { 'X-Test': 'yes' },
    });

    expect(parsed.headers).toEqual({ 'X-Test': 'yes' });
  });

  it('rejects non-string header values', () => {
    expect(() => sendRequestOptionsSchema.parse({ url: '/x', headers: { 'X-Test': 42 } })).toThrow();
  });

  it('rejects a missing url', () => {
    expect(() => sendRequestOptionsSchema.parse({ method: 'GET' })).toThrow();
  });
});
