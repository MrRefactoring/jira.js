import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from './bodyToFetchBody.js';
import { createApiError, SchemaMismatchError, toNetworkError } from './errors/index.js';
import type { SendRequestOptions } from './schemas/index.js';
import { buildUrlWithSearchParams } from './serializeSearchParams.js';

export async function sendRequest<T = unknown>(options: SendRequestOptions<T>): Promise<T> {
  const { url, method = 'GET', headers = {}, body, searchParams, schema } = options;
  const fullUrl = buildUrlWithSearchParams(url, searchParams);
  const init: RequestInit = {
    method,
    headers: {
      ...(shouldSetJsonContentType(body) ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  };

  if (body !== undefined && method !== 'GET') {
    init.body = bodyToFetchBody(body) as BodyInit;

    if (requiresDuplex(body)) {
      (init as RequestInit & { duplex?: 'half' }).duplex = 'half';
    }
  }

  let response: Response;

  try {
    response = await fetch(fullUrl, init);
  } catch (err) {
    throw toNetworkError(err, fullUrl);
  }

  if (!response.ok) {
    const text = await response.text();
    let detail: unknown = text;
    try {
      detail = JSON.parse(text);
    } catch {
      //
    }
    throw createApiError(
      `Request failed: ${response.status} ${response.statusText}${text ? ` - ${text}` : ''}`,
      response.status,
      response.statusText,
      detail,
      response.headers,
    );
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      if (e instanceof SyntaxError) {
        return undefined as T;
      }

      throw e;
    }

    if (schema && json !== undefined) {
      return schema.parse(json) as T;
    }

    return json as T;
  }

  const text = await response.text();

  if (schema) {
    // Not an HTTP failure — the response was a 2xx that simply is not what the
    // endpoint's schema describes, so it gets its own error rather than a
    // fabricated status.
    throw new SchemaMismatchError(
      `Expected a JSON response to validate against the schema, got ${contentType ?? 'no content type'}`,
      text,
    );
  }

  return text as T;
}
