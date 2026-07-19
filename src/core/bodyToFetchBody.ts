function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  if (value == null) return false;

  return typeof (value as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function';
}

/**
 * Whether the body carries its own encoding and must be handed to `fetch` untouched.
 *
 * A bare string is deliberately *not* one of these. These are JSON APIs, and the endpoints that take a lone string —
 * an account id, a preference value — want it as a JSON string, quoted, under `application/json`. Treating it as a
 * pre-encoded payload shipped it raw as `text/plain` and made those endpoints unreachable. Attachment content never
 * arrives here as a string: the multipart builder normalizes it into `FormData` or a stream first.
 */
function isBinaryBody(body: unknown): boolean {
  if (typeof FormData !== 'undefined' && body instanceof FormData) return true;

  if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) return true;

  if (typeof Blob !== 'undefined' && body instanceof Blob) return true;

  if (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream) return true;

  if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) return true;

  // Covers Node's Buffer too, which is a Uint8Array — naming it here would drag
  // @types/node into the declaration and break browser consumers.
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(body as ArrayBufferView)) return true;

  if (isAsyncIterable(body)) return true;

  return false;
}

export function bodyToFetchBody(body: unknown): BodyInit | AsyncIterable<unknown> {
  if (isBinaryBody(body)) {
    return body as BodyInit | AsyncIterable<unknown>;
  }

  return JSON.stringify(body);
}

/**
 * Whether to declare `application/json` for this request.
 *
 * Sent even when there is no body, for any method that could carry one. Some endpoints reject a bodyless `DELETE`
 * with 415 unless the header is present — Jira's remote-link deletes do — and a `Content-Type` on an empty request is
 * inert everywhere else. Binary and multipart bodies are excluded because they bring their own type, and `fetch` has
 * to be left to set the multipart boundary itself.
 */
export function shouldSetJsonContentType(body: unknown, method?: string): boolean {
  if (isBinaryBody(body)) return false;

  if (body !== undefined && body !== null) return true;

  const verb = (method ?? 'GET').toUpperCase();

  return verb !== 'GET' && verb !== 'HEAD';
}

export function requiresDuplex(body: unknown): boolean {
  if (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream) return true;

  return isAsyncIterable(body);
}
