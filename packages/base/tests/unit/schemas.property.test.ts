import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { authBasicSchema, authBearerTokenSchema } from '../../src/schemas/auth';

const SEED = 0xdeadbeef;

const ALPHANUM_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

const alphanumericString = (minLength = 1, maxLength = 20) =>
  fc
    .array(fc.constantFrom(...ALPHANUM_CHARS), { minLength, maxLength })
    .map(chars => chars.join(''));

const emailArb = fc
  .tuple(alphanumericString(1, 15), alphanumericString(1, 10))
  .map(([local, domain]) => `${local}@${domain}.com`);

const validBasicAuthArb = fc.record({
  type: fc.constant('basic' as const),
  email: emailArb,
  apiToken: alphanumericString(1, 32),
});

const validBearerTokenArb = fc.record({
  type: fc.constant('bearer' as const),
  token: alphanumericString(1, 64),
});

describe('authBasicSchema — property: strip mode', () => {
  it('adding unknown fields to a valid object does not throw (Zod strips them)', () => {
    fc.assert(
      fc.property(
        validBasicAuthArb,
        fc.string({ minLength: 1 }),
        fc.string(),
        (base, extraKey, extraValue) => {
          const withExtra = { ...base, [extraKey]: extraValue };
          expect(() => authBasicSchema.parse(withExtra)).not.toThrow();
        },
      ),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('parsing is idempotent: parse(parse(x)) deepEquals parse(x)', () => {
    fc.assert(
      fc.property(validBasicAuthArb, input => {
        const first = authBasicSchema.parse(input);
        const second = authBasicSchema.parse(first);
        expect(second).toEqual(first);
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('unknown fields are stripped from output — parsed result has no extra keys', () => {
    fc.assert(
      fc.property(
        validBasicAuthArb,
        fc.string({ minLength: 1 }),
        fc.string(),
        (base, extraKey, extraValue) => {
          const withExtra = { ...base, [extraKey]: extraValue };
          const result = authBasicSchema.parse(withExtra) as Record<string, unknown>;
          // Known fields are present
          expect(result.type).toBe('basic');
          expect(result.email).toBe(base.email);
          expect(result.apiToken).toBe(base.apiToken);
          // Extra field is stripped (unless it happened to match a known field name)
          if (!['type', 'email', 'apiToken'].includes(extraKey)) {
            expect(result[extraKey]).toBeUndefined();
          }
        },
      ),
      { seed: SEED, numRuns: 200 },
    );
  });
});

describe('authBearerTokenSchema — property: strip mode', () => {
  it('adding unknown fields to a valid bearer token does not throw', () => {
    fc.assert(
      fc.property(
        validBearerTokenArb,
        fc.string({ minLength: 1 }),
        fc.string(),
        (base, extraKey, extraValue) => {
          const withExtra = { ...base, [extraKey]: extraValue };
          expect(() => authBearerTokenSchema.parse(withExtra)).not.toThrow();
        },
      ),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('parsing is idempotent: parse(parse(x)) deepEquals parse(x)', () => {
    fc.assert(
      fc.property(validBearerTokenArb, input => {
        const first = authBearerTokenSchema.parse(input);
        const second = authBearerTokenSchema.parse(first);
        expect(second).toEqual(first);
      }),
      { seed: SEED, numRuns: 200 },
    );
  });
});
