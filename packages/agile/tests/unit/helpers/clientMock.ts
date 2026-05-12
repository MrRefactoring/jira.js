import { vi } from 'vitest';

export type CapturedRequest = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  searchParams?: Record<string, unknown>;
  body?: unknown;
  schema?: { parse: (input: unknown) => unknown };
};

export type ClientMock = {
  client: { sendRequest: ReturnType<typeof vi.fn> };
  calls: CapturedRequest[];
  lastCall: () => CapturedRequest;
};

export function createClientMock(response: unknown = undefined): ClientMock {
  const calls: CapturedRequest[] = [];

  const sendRequest = vi.fn(async (config: CapturedRequest) => {
    calls.push(config);
    return response;
  });

  return {
    client: { sendRequest },
    calls,
    lastCall: () => {
      const call = calls.at(-1);
      if (!call) throw new Error('No requests were captured');
      return call;
    },
  };
}
