import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from './bodyToFetchBody';
import { ApiError } from './apiError';
import type { SendRequestOptions } from './schemas';
import { buildUrlWithSearchParams } from './serializeSearchParams';

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

  const response = await fetch(fullUrl, init);

  if (!response.ok) {
    const text = await response.text();
    let detail: unknown = text;
    try {
      detail = JSON.parse(text);
    } catch {
      //
    }
    throw new ApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText,
      detail,
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
    throw new ApiError('Schema provided but response is not JSON', 0, '', text);
  }

  return text as T;
}
