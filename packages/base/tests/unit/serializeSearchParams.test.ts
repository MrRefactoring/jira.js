import { describe, expect, it } from 'vitest';
import { buildUrlWithSearchParams, serializeSearchParamValue } from '../../src/serializeSearchParams';

describe('serializeSearchParamValue', () => {
  it('returns undefined for undefined', () => {
    expect(serializeSearchParamValue(undefined)).toBeUndefined();
  });

  it('returns undefined for null', () => {
    expect(serializeSearchParamValue(null)).toBeUndefined();
  });

  it('passes strings through', () => {
    expect(serializeSearchParamValue('hello')).toBe('hello');
  });

  it('passes empty string through unchanged', () => {
    expect(serializeSearchParamValue('')).toBe('');
  });

  it('stringifies numbers', () => {
    expect(serializeSearchParamValue(0)).toBe('0');
    expect(serializeSearchParamValue(123)).toBe('123');
    expect(serializeSearchParamValue(-1.5)).toBe('-1.5');
  });

  it('stringifies booleans', () => {
    expect(serializeSearchParamValue(true)).toBe('true');
    expect(serializeSearchParamValue(false)).toBe('false');
  });

  it('returns undefined for empty arrays', () => {
    expect(serializeSearchParamValue([])).toBeUndefined();
  });

  it('joins all-string arrays with a comma', () => {
    expect(serializeSearchParamValue(['a', 'b', 'c'])).toBe('a,b,c');
    expect(serializeSearchParamValue(['single'])).toBe('single');
  });

  it('JSON-stringifies arrays with non-string items', () => {
    expect(serializeSearchParamValue([1, 2, 3])).toBe('[1,2,3]');
  });

  it('JSON-stringifies arrays of mixed types', () => {
    expect(serializeSearchParamValue(['a', 1])).toBe('["a",1]');
  });

  it('JSON-stringifies plain objects', () => {
    expect(serializeSearchParamValue({ key: 'val' })).toBe('{"key":"val"}');
  });

  it('JSON-stringifies Date objects (falls into object branch)', () => {
    const date = new Date('2025-01-01T00:00:00.000Z');

    expect(serializeSearchParamValue(date)).toBe('"2025-01-01T00:00:00.000Z"');
  });

  it('stringifies bigint values via the final String() fallback', () => {
    expect(serializeSearchParamValue(123n)).toBe('123');
  });

  it('stringifies symbol values via the final String() fallback', () => {
    expect(serializeSearchParamValue(Symbol('label'))).toBe('Symbol(label)');
  });

  it('stringifies NaN as the literal "NaN"', () => {
    // NaN passes typeof === 'number' check and becomes String(NaN) = 'NaN'
    expect(serializeSearchParamValue(Number.NaN)).toBe('NaN');
  });

  it('stringifies Infinity as the literal "Infinity"', () => {
    expect(serializeSearchParamValue(Infinity)).toBe('Infinity');
  });

  it('stringifies -Infinity as the literal "-Infinity"', () => {
    expect(serializeSearchParamValue(-Infinity)).toBe('-Infinity');
  });
});

describe('buildUrlWithSearchParams', () => {
  it('returns the baseUrl unchanged when searchParams is undefined', () => {
    expect(buildUrlWithSearchParams('/rest/api/3/issue')).toBe('/rest/api/3/issue');
  });

  it('returns the baseUrl unchanged for an empty searchParams object', () => {
    expect(buildUrlWithSearchParams('/rest/api/3/issue', {})).toBe('/rest/api/3/issue');
  });

  it('returns the baseUrl unchanged when all values serialize to undefined', () => {
    expect(buildUrlWithSearchParams('/rest/api/3/issue', { a: undefined, b: null, c: [] })).toBe('/rest/api/3/issue');
  });

  it('joins with ? when the baseUrl has no query', () => {
    expect(buildUrlWithSearchParams('/x', { a: 'b' })).toBe('/x?a=b');
  });

  it('joins with & when the baseUrl already has a query string', () => {
    expect(buildUrlWithSearchParams('/x?existing=y', { a: 'b' })).toBe('/x?existing=y&a=b');
  });

  it('drops nullish entries and keeps serializable ones', () => {
    expect(buildUrlWithSearchParams('/x', { a: 'keep', b: null, c: undefined, d: 5 })).toBe('/x?a=keep&d=5');
  });

  it('URL-encodes keys and values', () => {
    expect(buildUrlWithSearchParams('/x', { 'key space': 'a&b=c' })).toBe('/x?key+space=a%26b%3Dc');
  });

  it('serializes arrays as repeated query params', () => {
    expect(buildUrlWithSearchParams('/x', { ids: ['a', 'b'] })).toBe('/x?ids=a&ids=b');
  });

  it('serializes number arrays as repeated query params', () => {
    expect(buildUrlWithSearchParams('/x', { ids: [1, 2, 3] })).toBe('/x?ids=1&ids=2&ids=3');
  });

  it('serializes mixed-type arrays as repeated query params', () => {
    expect(buildUrlWithSearchParams('/x', { v: [1, 'a'] })).toBe('/x?v=1&v=a');
  });

  it('skips null and undefined items within arrays', () => {
    expect(buildUrlWithSearchParams('/x', { ids: [null, 'a', undefined, 'b'] })).toBe('/x?ids=a&ids=b');
  });
});
