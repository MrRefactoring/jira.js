import { vi, type Mock } from 'vitest';

export type FetchMock = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

export function installFetchMock(): FetchMock {
  const fetchMock = vi.fn() as FetchMock;
  vi.stubGlobal('fetch', fetchMock);

  return fetchMock;
}

export function restoreFetch(): void {
  vi.unstubAllGlobals();
}

export function getRequestUrl(mock: FetchMock, callIndex = 0): string {
  const call = mock.mock.calls[callIndex];

  if (!call) throw new Error(`fetchMock was not called at index ${callIndex}`);
  const [input] = call;

  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

export function getRequestInit(mock: FetchMock, callIndex = 0): RequestInit {
  const call = mock.mock.calls[callIndex];

  if (!call) throw new Error(`fetchMock was not called at index ${callIndex}`);

  return call[1] ?? {};
}

export function getRequestHeaders(mock: FetchMock, callIndex = 0): Record<string, string> {
  const init = getRequestInit(mock, callIndex);
  const headers = init.headers;

  if (!headers) return {};
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key.toLowerCase()] = value;
    });

    return result;
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers.map(([k, v]) => [k.toLowerCase(), v]));
  }

  return Object.fromEntries(Object.entries(headers as Record<string, string>).map(([k, v]) => [k.toLowerCase(), v]));
}
