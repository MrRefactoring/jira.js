import { describe, expect, it } from 'vitest';
import { buildUrlWithSearchParams, serializeSearchParamValue } from '#/core/serializeSearchParams';

describe('serializeSearchParamValue', () => {
  it.each([
    ['string', 'page', 'page'],
    ['number', 42, '42'],
    ['zero', 0, '0'],
    ['boolean', false, 'false'],
  ])('renders a %s as-is', (_label, input, expected) => {
    expect(serializeSearchParamValue(input)).toBe(expected);
  });

  it.each([
    ['undefined', undefined],
    ['null', null],
    ['an empty array', []],
  ])('drops %s so the key never reaches the query', (_label, input) => {
    expect(serializeSearchParamValue(input)).toBeUndefined();
  });

  it('joins a string array with commas, as Confluence expects', () => {
    expect(serializeSearchParamValue(['a', 'b'])).toBe('a,b');
  });

  it('JSON-encodes a non-string array', () => {
    expect(serializeSearchParamValue([1, 2])).toBe('[1,2]');
  });

  it('JSON-encodes an object', () => {
    expect(serializeSearchParamValue({ a: 1 })).toBe('{"a":1}');
  });
});

describe('buildUrlWithSearchParams', () => {
  const base = 'https://acme.atlassian.net/wiki/api/v2/pages';

  it('returns the url untouched when there are no params', () => {
    expect(buildUrlWithSearchParams(base)).toBe(base);
    expect(buildUrlWithSearchParams(base, {})).toBe(base);
  });

  it('returns the url untouched when every param is empty', () => {
    expect(buildUrlWithSearchParams(base, { a: undefined, b: null })).toBe(base);
  });

  it('appends params with ?', () => {
    expect(buildUrlWithSearchParams(base, { limit: 25 })).toBe(`${base}?limit=25`);
  });

  it('appends with & when the url already carries a query', () => {
    expect(buildUrlWithSearchParams(`${base}?cursor=x`, { limit: 25 })).toBe(`${base}?cursor=x&limit=25`);
  });

  it('repeats the key for each array item rather than joining', () => {
    expect(buildUrlWithSearchParams(base, { 'space-id': [1, 2] })).toBe(`${base}?space-id=1&space-id=2`);
  });

  it('skips empty items inside an array', () => {
    expect(buildUrlWithSearchParams(base, { id: [1, null, 2, undefined] })).toBe(`${base}?id=1&id=2`);
  });

  it('percent-encodes values', () => {
    expect(buildUrlWithSearchParams(base, { cql: 'type = page' })).toBe(`${base}?cql=type+%3D+page`);
  });
});
