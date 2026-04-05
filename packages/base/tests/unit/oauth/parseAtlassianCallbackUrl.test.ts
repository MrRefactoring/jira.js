import { describe, expect, it } from 'vitest';
import { parseAtlassianCallbackUrl } from '../../../src/oauth/parseAtlassianCallbackUrl';

describe('parseAtlassianCallbackUrl', () => {
  it('returns { code, state } when both are present', () => {
    const result = parseAtlassianCallbackUrl('http://localhost:8080/cb?code=abc&state=xyz');

    expect(result).toEqual({ code: 'abc', state: 'xyz' });
  });

  it('returns null when code is missing', () => {
    expect(parseAtlassianCallbackUrl('http://localhost:8080/cb?state=xyz')).toBeNull();
  });

  it('returns null when state is missing', () => {
    expect(parseAtlassianCallbackUrl('http://localhost:8080/cb?code=abc')).toBeNull();
  });

  it('returns null when both are missing', () => {
    expect(parseAtlassianCallbackUrl('http://localhost:8080/cb')).toBeNull();
  });

  it('returns null when both params are empty strings', () => {
    expect(parseAtlassianCallbackUrl('http://localhost:8080/cb?code=&state=')).toBeNull();
  });

  it('ignores additional query params', () => {
    const result = parseAtlassianCallbackUrl('http://localhost:8080/cb?code=abc&state=xyz&extra=foo');

    expect(result).toEqual({ code: 'abc', state: 'xyz' });
  });

  it('throws on a malformed URL', () => {
    expect(() => parseAtlassianCallbackUrl('not a url')).toThrow();
  });
});
