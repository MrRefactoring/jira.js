/**
 * Adversarial and edge-case tests for serializeSearchParams.
 *
 * Purpose: discover whether mutations in the production code survive the nominal test suite.
 * Each test here was chosen because it covers a code path or boundary condition that the
 * nominal tests do not address, or validates a specific mutation-resistance property.
 */
import { describe, expect, it } from 'vitest';
import { buildUrlWithSearchParams, serializeSearchParamValue } from '../../src/serializeSearchParams';

describe('serializeSearchParamValue — adversarial inputs', () => {
  describe('arrays: boundary conditions for the all-string guard', () => {
    it('single-item string array does NOT join with comma (returns the single value)', () => {
      // Mutation target: changing join(',') to join('') would produce '' for empty but 'a' for single.
      // This test verifies the boundary is correct at length=1.
      expect(serializeSearchParamValue(['only'])).toBe('only');
    });

    it('two-item number array uses JSON stringify not comma join', () => {
      // Mutation: swap every() → some() in the all-string guard.
      // ['x', 1] — some() finds 'x' (a string), so it would take the join path → 'x,1'.
      // every() correctly identifies the mixed type → JSON.stringify → '["x",1]'.
      expect(serializeSearchParamValue(['x', 1])).toBe('["x",1]');
    });

    it('array of booleans goes through JSON stringify not comma join', () => {
      // Booleans are not strings; every(x => typeof x === 'string') = false.
      expect(serializeSearchParamValue([true, false])).toBe('[true,false]');
    });

    it('array containing null goes through JSON stringify (null is not a string)', () => {
      // [null] — null is not a string → JSON.stringify → '[null]'
      expect(serializeSearchParamValue([null])).toBe('[null]');
    });

    it('array containing undefined goes through JSON stringify (undefined is not a string)', () => {
      // [undefined] — undefined not a string → JSON.stringify → '[null]'  (undefined→null in JSON)
      expect(serializeSearchParamValue([undefined])).toBe('[null]');
    });

    it('array of empty strings returns empty strings joined (not undefined)', () => {
      // Empty string IS a string, so all-string guard passes → join(',') → ','
      expect(serializeSearchParamValue(['', ''])).toBe(',');
    });
  });

  describe('numbers: distinguishing number from boolean', () => {
    it('returns "0" for zero (not "false")', () => {
      // Mutation: changing branch order so booleans check runs before numbers.
      // 0 could accidentally hit boolean → 'false'. The branch order matters.
      expect(serializeSearchParamValue(0)).toBe('0');
      expect(serializeSearchParamValue(0)).not.toBe('false');
    });

    it('returns "1" for one (not "true")', () => {
      expect(serializeSearchParamValue(1)).toBe('1');
      expect(serializeSearchParamValue(1)).not.toBe('true');
    });
  });

  describe('objects: JSON.stringify boundary cases', () => {
    it('returns "{}" for an empty object', () => {
      expect(serializeSearchParamValue({})).toBe('{}');
    });

    it('serializes nested objects', () => {
      expect(serializeSearchParamValue({ a: { b: 'c' } })).toBe('{"a":{"b":"c"}}');
    });

    it('serializes Date objects with surrounding quotes (Date → JSON → ISO string)', () => {
      const d = new Date('2026-01-01T00:00:00.000Z');
      // JSON.stringify(d) = '"2026-01-01T00:00:00.000Z"' (string with quotes)
      expect(serializeSearchParamValue(d)).toBe('"2026-01-01T00:00:00.000Z"');
    });

    it('omits function values in objects (JSON.stringify behavior)', () => {
      // JSON.stringify({ fn: () => {} }) = '{}'
      expect(serializeSearchParamValue({ fn: () => {} })).toBe('{}');
    });

    it('serializes null prototype objects (Object.create(null)) without throwing', () => {
      const bare = Object.create(null) as Record<string, string>;
      bare['key'] = 'value';
      expect(serializeSearchParamValue(bare)).toBe('{"key":"value"}');
    });
  });

  describe('edge: function value falls through to String() fallback', () => {
    it('serializes a function via String() (not JSON.stringify)', () => {
      const fn = function named() {};
      const result = serializeSearchParamValue(fn);
      // typeof fn === 'function' — skips string/number/boolean/Array.isArray/object branches
      // falls to String(value) which produces the function source
      expect(typeof result).toBe('string');
      expect(result).toContain('named');
    });
  });
});

describe('buildUrlWithSearchParams — adversarial inputs', () => {
  describe('URL injection resistance', () => {
    it('percent-encodes & in values so it cannot inject additional query params', () => {
      const url = buildUrlWithSearchParams('/search', { q: 'a&b=injected' });
      // If & were not encoded, the URL would have ?q=a&b=injected — an injection.
      expect(url).not.toContain('b=injected');
      expect(url).toContain('q=a%26b%3Dinjected');
    });

    it('percent-encodes = in values so it cannot split key/value', () => {
      const url = buildUrlWithSearchParams('/x', { filter: 'key=value' });
      expect(url).not.toBe('/x?filter=key=value'); // unencoded = is dangerous
      expect(url).toContain('filter=key%3Dvalue');
    });

    it('percent-encodes # in values (hash cannot truncate query string)', () => {
      const url = buildUrlWithSearchParams('/x', { q: 'a#fragment' });
      expect(url).not.toContain('#fragment');
      expect(url).toContain('%23');
    });

    it('encodes spaces as + in query string (URLSearchParams convention)', () => {
      const url = buildUrlWithSearchParams('/x', { q: 'hello world' });
      expect(url).toContain('q=hello+world');
    });

    it('percent-encodes special chars in keys too', () => {
      const url = buildUrlWithSearchParams('/x', { 'ke y': 'val' });
      expect(url).toContain('ke+y=val');
    });
  });

  describe('array items: null and undefined filtering is complete', () => {
    it('array with ALL nulls produces no query param for that key', () => {
      const url = buildUrlWithSearchParams('/x', { ids: [null, null] });
      expect(url).toBe('/x');
    });

    it('array with ALL undefineds produces no query param for that key', () => {
      const url = buildUrlWithSearchParams('/x', { ids: [undefined, undefined] });
      expect(url).toBe('/x');
    });

    it('array with mixed null/string keeps only string items as separate params', () => {
      const url = buildUrlWithSearchParams('/x', { ids: [null, 'a', null, 'b'] });
      expect(url).toBe('/x?ids=a&ids=b');
    });

    it('array items are appended independently (not joined with comma) in final URL', () => {
      // Mutation: if append() were changed to set(), only the last item would appear.
      const url = buildUrlWithSearchParams('/x', { tags: ['alpha', 'beta', 'gamma'] });
      expect(url).toBe('/x?tags=alpha&tags=beta&tags=gamma');
      // Explicitly verify all three appear — a set() mutation would produce only tags=gamma.
      const params = new URLSearchParams(url.split('?')[1]);
      expect(params.getAll('tags')).toEqual(['alpha', 'beta', 'gamma']);
    });
  });

  describe('separator logic: ? vs &', () => {
    it('uses & when baseUrl already contains ? (does NOT double the ?)', () => {
      const url = buildUrlWithSearchParams('/x?a=1', { b: '2' });
      expect(url).toBe('/x?a=1&b=2');
      expect(url.split('?').length - 1).toBe(1); // exactly one ?
    });

    it('uses ? when baseUrl contains no query string', () => {
      const url = buildUrlWithSearchParams('/x', { a: '1' });
      expect(url).toBe('/x?a=1');
    });

    it('empty baseUrl still gets a correct separator', () => {
      const url = buildUrlWithSearchParams('', { a: 'b' });
      expect(url).toBe('?a=b');
    });
  });

  describe('all-undefined params: short-circuit returns baseUrl unchanged', () => {
    it('returns baseUrl unchanged when all array items are null', () => {
      expect(buildUrlWithSearchParams('/x', { ids: [null, null] })).toBe('/x');
    });

    it('returns baseUrl when params has keys but all values are undefined', () => {
      expect(buildUrlWithSearchParams('/x', { a: undefined, b: undefined })).toBe('/x');
    });

    it('returns baseUrl when params has keys but all values are null', () => {
      expect(buildUrlWithSearchParams('/x', { a: null, b: null })).toBe('/x');
    });

    it('returns baseUrl when params is an empty object', () => {
      expect(buildUrlWithSearchParams('/x', {})).toBe('/x');
    });
  });

  describe('boolean params are serialized as lowercase strings', () => {
    it('true param becomes "true" not "1" or "True"', () => {
      const url = buildUrlWithSearchParams('/x', { active: true });
      expect(url).toBe('/x?active=true');
    });

    it('false param becomes "false" not "0" or "False"', () => {
      const url = buildUrlWithSearchParams('/x', { active: false });
      expect(url).toBe('/x?active=false');
    });
  });

  describe('numeric edge cases do not silently become invalid strings', () => {
    it('NaN param becomes literal "NaN" (callers must sanitize before calling)', () => {
      const url = buildUrlWithSearchParams('/x', { n: Number.NaN });
      expect(url).toBe('/x?n=NaN');
    });

    it('Infinity param becomes literal "Infinity"', () => {
      const url = buildUrlWithSearchParams('/x', { n: Infinity });
      expect(url).toBe('/x?n=Infinity');
    });

    it('zero param becomes "0" not empty/absent', () => {
      const url = buildUrlWithSearchParams('/x', { page: 0 });
      expect(url).toBe('/x?page=0');
    });
  });
});
