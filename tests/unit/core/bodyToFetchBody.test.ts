import { describe, expect, it } from 'vitest';
import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from '#/core/bodyToFetchBody';

describe('bodyToFetchBody', () => {
  it('serializes a plain object', () => {
    expect(bodyToFetchBody({ title: 'Page' })).toBe('{"title":"Page"}');
  });

  it('serializes an array', () => {
    expect(bodyToFetchBody([1, 2])).toBe('[1,2]');
  });

  it('passes a string through unserialized, so a pre-built payload is not double-encoded', () => {
    expect(bodyToFetchBody('{"already":"json"}')).toBe('{"already":"json"}');
  });

  it('passes a Buffer through untouched — fetch accepts one, pooled byteOffset and all', () => {
    // Verified against a real server: undici sends a Buffer, including a
    // subarray with a non-zero byteOffset, byte for byte. Copying it into a
    // fresh Uint8Array only duplicated the payload, and naming Buffer here
    // would have pulled @types/node into the shipped declarations.
    const buffer = Buffer.from('bytes');

    expect(bodyToFetchBody(buffer)).toBe(buffer);
  });

  it('treats a pooled Buffer subarray as binary rather than JSON-serializing it', () => {
    const pooled = Buffer.from('xxxxxxxxxx').subarray(2, 7);

    expect(bodyToFetchBody(pooled)).toBe(pooled);
    expect(shouldSetJsonContentType(pooled)).toBe(false);
  });

  it.each([
    ['FormData', new FormData()],
    ['URLSearchParams', new URLSearchParams({ a: 'b' })],
    ['Blob', new Blob(['x'])],
    ['ArrayBuffer', new ArrayBuffer(4)],
    ['Uint8Array', new Uint8Array([1])],
  ])('passes %s through untouched', (_label, input) => {
    expect(bodyToFetchBody(input)).toBe(input);
  });
});

describe('shouldSetJsonContentType', () => {
  it.each([
    ['an object', { a: 1 }],
    ['an array', [1]],
    ['a number', 5],
  ])('is true for %s', (_label, input) => {
    expect(shouldSetJsonContentType(input)).toBe(true);
  });

  it.each([
    ['undefined', undefined],
    ['null', null],
  ])('is false for %s — there is no body to label', (_label, input) => {
    expect(shouldSetJsonContentType(input)).toBe(false);
  });

  it('is false for FormData, so fetch can set its own multipart boundary', () => {
    expect(shouldSetJsonContentType(new FormData())).toBe(false);
  });

  it('is false for a Buffer', () => {
    expect(shouldSetJsonContentType(Buffer.from('x'))).toBe(false);
  });
});

describe('requiresDuplex', () => {
  it('is true for a ReadableStream', () => {
    expect(requiresDuplex(new ReadableStream())).toBe(true);
  });

  it('is true for an async iterable', () => {
    async function* gen(): AsyncGenerator<string> {
      yield 'chunk';
    }

    expect(requiresDuplex(gen())).toBe(true);
  });

  it.each([
    ['an object', { a: 1 }],
    ['a string', 'text'],
    ['undefined', undefined],
    ['null', null],
  ])('is false for %s', (_label, input) => {
    expect(requiresDuplex(input)).toBe(false);
  });
});
