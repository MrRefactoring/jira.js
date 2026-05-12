import { describe, expect, it } from 'vitest';
import {
  authBasicSchema,
  authBearerProviderSchema,
  authBearerSchema,
  authBearerTokenSchema,
  authSchema,
} from '../../../src/schemas/auth';

describe('authBasicSchema', () => {
  it('accepts a valid basic auth object', () => {
    expect(authBasicSchema.parse({ type: 'basic', email: 'a@b.co', apiToken: 'tok' })).toEqual({
      type: 'basic',
      email: 'a@b.co',
      apiToken: 'tok',
    });
  });

  it('rejects an invalid email', () => {
    expect(() => authBasicSchema.parse({ type: 'basic', email: 'not-an-email', apiToken: 'tok' })).toThrow();
  });

  it('rejects an empty apiToken', () => {
    expect(() => authBasicSchema.parse({ type: 'basic', email: 'a@b.co', apiToken: '' })).toThrow();
  });

  it('rejects the wrong type literal', () => {
    expect(() => authBasicSchema.parse({ type: 'bearer', email: 'a@b.co', apiToken: 'tok' })).toThrow();
  });
});

describe('authBearerTokenSchema', () => {
  it('accepts a bearer token', () => {
    expect(authBearerTokenSchema.parse({ type: 'bearer', token: 'abc' })).toEqual({
      type: 'bearer',
      token: 'abc',
    });
  });

  it('rejects an empty token', () => {
    expect(() => authBearerTokenSchema.parse({ type: 'bearer', token: '' })).toThrow();
  });
});

describe('authBearerProviderSchema', () => {
  it('accepts an object with a function getToken', () => {
    const getToken = async () => 'x';
    const parsed = authBearerProviderSchema.parse({ type: 'bearer', getToken });

    expect(parsed.type).toBe('bearer');
    expect(parsed.getToken).toBe(getToken);
  });

  it('rejects non-function getToken', () => {
    expect(() => authBearerProviderSchema.parse({ type: 'bearer', getToken: 'not-a-function' })).toThrow();
  });
});

describe('authBearerSchema (union of token + provider)', () => {
  it('accepts a static token', () => {
    expect(authBearerSchema.parse({ type: 'bearer', token: 'abc' })).toEqual({
      type: 'bearer',
      token: 'abc',
    });
  });

  it('accepts a token provider', () => {
    const getToken = async () => 'x';

    expect(authBearerSchema.parse({ type: 'bearer', getToken })).toMatchObject({
      type: 'bearer',
    });
  });
});

describe('authSchema (top-level discriminated union)', () => {
  it('routes basic auth to the basic schema', () => {
    expect(authSchema.parse({ type: 'basic', email: 'a@b.co', apiToken: 'tok' })).toMatchObject({ type: 'basic' });
  });

  it('routes static bearer to the bearer-token schema', () => {
    expect(authSchema.parse({ type: 'bearer', token: 'x' })).toMatchObject({
      type: 'bearer',
      token: 'x',
    });
  });

  it('routes provider bearer to the bearer-provider schema', () => {
    const parsed = authSchema.parse({ type: 'bearer', getToken: async () => 'x' });

    expect(parsed).toMatchObject({ type: 'bearer' });
    expect('getToken' in parsed && typeof parsed.getToken).toBe('function');
  });

  it('rejects an unknown type literal', () => {
    expect(() => authSchema.parse({ type: 'unknown', token: 'x' })).toThrow();
  });
});
