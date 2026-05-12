function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  if (value == null) return false;

  return typeof (value as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function';
}

function isBinaryBody(body: unknown): boolean {
  if (typeof body === 'string') return true;

  if (typeof FormData !== 'undefined' && body instanceof FormData) return true;

  if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) return true;

  if (typeof Blob !== 'undefined' && body instanceof Blob) return true;

  if (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream) return true;

  if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) return true;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(body as ArrayBufferView)) return true;

  if (typeof Buffer !== 'undefined' && body instanceof Buffer) return true;

  if (isAsyncIterable(body)) return true;

  return false;
}

export function bodyToFetchBody(body: unknown): BodyInit | AsyncIterable<unknown> {
  if (typeof Buffer !== 'undefined' && body instanceof Buffer) {
    return new Uint8Array(body);
  }

  if (isBinaryBody(body)) {
    return body as BodyInit | AsyncIterable<unknown>;
  }

  return JSON.stringify(body);
}

export function shouldSetJsonContentType(body: unknown): boolean {
  return body !== undefined && body !== null && !isBinaryBody(body);
}

export function requiresDuplex(body: unknown): boolean {
  if (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream) return true;

  return isAsyncIterable(body);
}
