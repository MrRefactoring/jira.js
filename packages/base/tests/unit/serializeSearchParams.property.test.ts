import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { buildUrlWithSearchParams, serializeSearchParamValue } from '../../src/serializeSearchParams';

const SEED = 0xdeadbeef;

describe('serializeSearchParamValue — property: type invariants', () => {
  it('string inputs are returned unchanged (identity)', () => {
    fc.assert(
      fc.property(fc.string(), v => {
        expect(serializeSearchParamValue(v)).toBe(v);
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('integer inputs stringify to the same value as String(n)', () => {
    fc.assert(
      fc.property(fc.integer({ min: -1_000_000, max: 1_000_000 }), n => {
        expect(serializeSearchParamValue(n)).toBe(String(n));
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('boolean inputs always produce exactly "true" or "false"', () => {
    fc.assert(
      fc.property(fc.boolean(), b => {
        const result = serializeSearchParamValue(b);
        expect(result).toBe(String(b));
        expect(['true', 'false']).toContain(result);
      }),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('all-string arrays are joined with "," — result equals arr.join(",")', () => {
    fc.assert(
      fc.property(fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }), arr => {
        expect(serializeSearchParamValue(arr)).toBe(arr.join(','));
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('empty arrays always return undefined — never an empty string', () => {
    // Regression guard: changing `length === 0 → undefined` to `return ''` must be caught.
    fc.assert(
      fc.property(fc.constant([]), arr => {
        expect(serializeSearchParamValue(arr)).toBeUndefined();
      }),
      { seed: SEED, numRuns: 10 },
    );
  });
});

describe('buildUrlWithSearchParams — property: URL encoding roundtrip', () => {
  it('scalar string value survives URLSearchParams encode/decode cycle', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), fc.string(), (key, value) => {
        const url = buildUrlWithSearchParams('/base', { [key]: value });
        const queryString = url.slice(url.indexOf('?') + 1);
        const decoded = new URLSearchParams(queryString).get(key);
        expect(decoded).toBe(value);
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('integer value survives encode/decode cycle', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.integer({ min: -1_000_000, max: 1_000_000 }),
        (key, n) => {
          const url = buildUrlWithSearchParams('/base', { [key]: n });
          const queryString = url.slice(url.indexOf('?') + 1);
          const decoded = new URLSearchParams(queryString).get(key);
          expect(decoded).toBe(String(n));
        },
      ),
      { seed: SEED, numRuns: 200 },
    );
  });
});

describe('buildUrlWithSearchParams — property: URL structure invariants', () => {
  it('is deterministic: same inputs always produce the same URL', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string({ minLength: 1 }),
        fc.string(),
        (baseUrl, key, value) => {
          const url1 = buildUrlWithSearchParams(baseUrl, { [key]: value });
          const url2 = buildUrlWithSearchParams(baseUrl, { [key]: value });
          expect(url1).toBe(url2);
        },
      ),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('adds exactly one "?" when base URL has none and params are non-empty', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes('?')),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (baseUrl, key, value) => {
          const url = buildUrlWithSearchParams(baseUrl, { [key]: value });
          expect(url.split('?').length).toBe(2);
        },
      ),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('uses "&" separator — no second "?" when base already has one', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), fc.string(), (key, value) => {
        const baseWithQuery = '/api?existing=1';
        const url = buildUrlWithSearchParams(baseWithQuery, { [key]: value });
        expect(url.split('?').length).toBe(2);
        expect(url).toContain('&');
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('returns base URL unchanged when params is empty', () => {
    fc.assert(
      fc.property(fc.string(), baseUrl => {
        expect(buildUrlWithSearchParams(baseUrl, {})).toBe(baseUrl);
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('returns base URL unchanged when params is undefined', () => {
    fc.assert(
      fc.property(fc.string(), baseUrl => {
        expect(buildUrlWithSearchParams(baseUrl)).toBe(baseUrl);
      }),
      { seed: SEED, numRuns: 200 },
    );
  });

  it('null and undefined values never appear in the query string', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), key => {
        const urlWithNull = buildUrlWithSearchParams('/base', { [key]: null });
        const urlWithUndefined = buildUrlWithSearchParams('/base', { [key]: undefined });
        expect(urlWithNull).toBe('/base');
        expect(urlWithUndefined).toBe('/base');
      }),
      { seed: SEED, numRuns: 200 },
    );
  });
});
