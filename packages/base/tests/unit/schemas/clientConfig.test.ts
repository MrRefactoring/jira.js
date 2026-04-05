import { describe, expect, it } from 'vitest';
import { clientConfigSchema } from '../../../src/schemas/clientConfig';

describe('clientConfigSchema', () => {
  it('accepts a minimal config with just a host URL', () => {
    const parsed = clientConfigSchema.parse({ host: 'https://x.atlassian.net' });

    expect(parsed.host).toBe('https://x.atlassian.net');
    expect(parsed.auth).toBeUndefined();
  });

  it('rejects a non-URL host', () => {
    expect(() => clientConfigSchema.parse({ host: 'not-a-url' })).toThrow();
  });

  it('accepts an optional headers record', () => {
    const parsed = clientConfigSchema.parse({
      host: 'https://x.atlassian.net',
      headers: { 'X-Custom': 'val' },
    });

    expect(parsed.headers).toEqual({ 'X-Custom': 'val' });
  });

  it('rejects non-string values in headers record', () => {
    expect(() =>
      clientConfigSchema.parse({
        host: 'https://x.atlassian.net',
        headers: { 'X-Custom': 42 },
      }),
    ).toThrow();
  });

  it('accepts a getAuthOn401 function', () => {
    const getAuthOn401 = async () => ({ type: 'bearer' as const, token: 'x' });
    const parsed = clientConfigSchema.parse({
      host: 'https://x.atlassian.net',
      getAuthOn401,
    });

    expect(parsed.getAuthOn401).toBe(getAuthOn401);
  });

  it('rejects a non-function getAuthOn401', () => {
    expect(() =>
      clientConfigSchema.parse({
        host: 'https://x.atlassian.net',
        getAuthOn401: 'not-a-function',
      }),
    ).toThrow();
  });

  it('accepts a nested auth object and validates it via authSchema', () => {
    const parsed = clientConfigSchema.parse({
      host: 'https://x.atlassian.net',
      auth: { type: 'basic', email: 'a@b.co', apiToken: 'tok' },
    });

    expect(parsed.auth).toEqual({ type: 'basic', email: 'a@b.co', apiToken: 'tok' });
  });

  it('rejects an invalid nested auth object', () => {
    expect(() =>
      clientConfigSchema.parse({
        host: 'https://x.atlassian.net',
        auth: { type: 'basic', email: 'not-an-email', apiToken: 'tok' },
      }),
    ).toThrow();
  });
});
