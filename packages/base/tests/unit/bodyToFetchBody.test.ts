import { describe, expect, it } from 'vitest';
import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from '../../src/bodyToFetchBody';

describe('bodyToFetchBody', () => {
  it('returns FormData unchanged', () => {
    const body = new FormData();
    body.set('a', '1');
    expect(bodyToFetchBody(body)).toBe(body);
  });

  it('returns string bodies unchanged', () => {
    expect(bodyToFetchBody('raw')).toBe('raw');
  });

  it('JSON-serializes plain objects', () => {
    expect(bodyToFetchBody({ a: 1 })).toBe('{"a":1}');
  });

  it('JSON-serializes arrays', () => {
    expect(bodyToFetchBody([1, 2, 3])).toBe('[1,2,3]');
  });

  it('converts Buffer to Uint8Array', () => {
    const buf = Buffer.from('hello');
    const result = bodyToFetchBody(buf);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array(buf));
    expect(result).not.toBe(buf);
  });

  it('passes URLSearchParams through unchanged', () => {
    const params = new URLSearchParams({ a: '1' });
    expect(bodyToFetchBody(params)).toBe(params);
  });

  it('passes Uint8Array through unchanged', () => {
    const arr = new Uint8Array([1, 2, 3]);
    expect(bodyToFetchBody(arr)).toBe(arr);
  });

  it('passes ArrayBuffer through unchanged', () => {
    const buf = new ArrayBuffer(4);
    expect(bodyToFetchBody(buf)).toBe(buf);
  });

  it('passes async iterables through unchanged', () => {
    const asyncIterable = {
      async *[Symbol.asyncIterator]() {
        yield new TextEncoder().encode('chunk');
      },
    };
    expect(bodyToFetchBody(asyncIterable)).toBe(asyncIterable);
  });
});

describe('shouldSetJsonContentType', () => {
  it('returns true for plain objects', () => {
    expect(shouldSetJsonContentType({ a: 1 })).toBe(true);
  });

  it('returns true for arrays', () => {
    expect(shouldSetJsonContentType([1, 2])).toBe(true);
  });

  it('returns false for undefined', () => {
    expect(shouldSetJsonContentType(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(shouldSetJsonContentType(null)).toBe(false);
  });

  it('returns false for strings', () => {
    expect(shouldSetJsonContentType('raw')).toBe(false);
  });

  it('returns false for FormData', () => {
    expect(shouldSetJsonContentType(new FormData())).toBe(false);
  });

  it('returns false for URLSearchParams', () => {
    expect(shouldSetJsonContentType(new URLSearchParams())).toBe(false);
  });

  it('returns false for Buffer', () => {
    expect(shouldSetJsonContentType(Buffer.from('hi'))).toBe(false);
  });

  it('returns false for Uint8Array', () => {
    expect(shouldSetJsonContentType(new Uint8Array([1]))).toBe(false);
  });

  it('returns false for async iterables', () => {
    const asyncIterable = {
      async *[Symbol.asyncIterator]() {
        yield 'chunk';
      },
    };
    expect(shouldSetJsonContentType(asyncIterable)).toBe(false);
  });
});

describe('requiresDuplex', () => {
  it('returns false for plain objects', () => {
    expect(requiresDuplex({ a: 1 })).toBe(false);
  });

  it('returns false for strings', () => {
    expect(requiresDuplex('raw')).toBe(false);
  });

  it('returns false for Uint8Array', () => {
    expect(requiresDuplex(new Uint8Array([1]))).toBe(false);
  });

  it('returns false for FormData', () => {
    expect(requiresDuplex(new FormData())).toBe(false);
  });

  it('returns true for async iterables', () => {
    const asyncIterable = {
      async *[Symbol.asyncIterator]() {
        yield new TextEncoder().encode('chunk');
      },
    };
    expect(requiresDuplex(asyncIterable)).toBe(true);
  });

  it('returns true for ReadableStream', () => {
    const stream = new ReadableStream();
    expect(requiresDuplex(stream)).toBe(true);
  });
});
