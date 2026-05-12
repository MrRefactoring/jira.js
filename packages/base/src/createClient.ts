import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from './bodyToFetchBody';
import type { Auth, ClientConfig, SendRequestOptions } from './schemas';
import type { Client } from './interfaces';
import { ApiError } from './apiError';
import { buildUrlWithSearchParams } from './serializeSearchParams';

function base64Encode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }

  return btoa(unescape(encodeURIComponent(str)));
}

async function getAuthHeaders(auth: Auth): Promise<Record<string, string>> {
  if (auth.type === 'basic') {
    const encoded = base64Encode(`${auth.email}:${auth.apiToken}`);

    return { Authorization: `Basic ${encoded}` };
  }

  if ('getToken' in auth) {
    const token = await auth.getToken();

    return { Authorization: `Bearer ${token}` };
  }

  return { Authorization: `Bearer ${auth.token}` };
}

/**
 * Creates a low-level Jira API client.
 *
 * Prefer `createCloudClient` from `@jira.js/cloud` or `createAgileClient`
 * from `@jira.js/agile` unless you need direct transport control.
 *
 * @stable
 */
export function createClient(config: ClientConfig): Client {
  const { host, auth, headers: configHeaders = {}, getAuthOn401 } = config;

  return {
    async sendRequest<T>(requestConfig: SendRequestOptions<T>): Promise<T> {
      const path = requestConfig.url.startsWith('/') ? requestConfig.url : `/${requestConfig.url}`;
      const normalizedHost = host && (host.endsWith('/') ? host.slice(0, -1) : host);
      const url = normalizedHost ? normalizedHost + path : requestConfig.url;
      const fullUrl = buildUrlWithSearchParams(url, requestConfig.searchParams);

      const rawBody = requestConfig.body;
      const body = rawBody === undefined || rawBody === null ? undefined : bodyToFetchBody(rawBody);

      const doRequest = async (authHeaders: Record<string, string>): Promise<Response> => {
        const headers: Record<string, string> = {
          Accept: 'application/json',
          ...(shouldSetJsonContentType(rawBody) ? { 'Content-Type': 'application/json' } : {}),
          ...authHeaders,
          ...configHeaders,
          ...requestConfig.headers,
        };

        const init: RequestInit & { duplex?: 'half' } = {
          method: requestConfig.method,
          headers: Object.keys(headers).length > 0 ? headers : undefined,
          body: body as BodyInit,
        };

        if (requiresDuplex(rawBody)) {
          init.duplex = 'half';
        }

        return fetch(fullUrl, init);
      };

      let derivedAuthHeaders = auth ? await getAuthHeaders(auth) : {};
      let response = await doRequest(derivedAuthHeaders);

      if (response.status === 401 && getAuthOn401) {
        const newAuth = await getAuthOn401();
        derivedAuthHeaders = await getAuthHeaders(newAuth);
        response = await doRequest(derivedAuthHeaders);
      }

      if (!response.ok) {
        const text = await response.text();
        let detail: unknown = text;
        try {
          detail = JSON.parse(text);
        } catch {
          //
        }
        throw new ApiError(
          `Request failed: ${response.status} ${response.statusText}${text ? ` - ${text}` : ''}`,
          response.status,
          response.statusText,
          detail,
        );
      }

      const contentType = response.headers.get('content-type');

      if (response.status === 204 || (contentType && !contentType.includes('application/json'))) {
        return undefined as T;
      }

      let data: unknown;

      if (contentType?.includes('application/json')) {
        const text = await response.text();

        try {
          data = JSON.parse(text);
        } catch (e) {
          if (e instanceof SyntaxError) {
            // Jira sometimes sends application/json Content-Type with a plain-text body
            data = text || undefined;
          } else {
            throw e;
          }
        }
      } else {
        const text = await response.text();

        data = text || undefined;
      }

      if (requestConfig.schema && data !== undefined) {
        return requestConfig.schema.parse(data) as T;
      }

      return data as T;
    },
  };
}
