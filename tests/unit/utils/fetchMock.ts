import * as sinon from 'sinon';

/** Build a minimal `Response` stand-in for stubbing the global `fetch` in unit tests. */
export const jsonResponse = (
  data: unknown,
  { ok = true, status = ok ? 200 : 400 }: { ok?: boolean; status?: number } = {},
): Response =>
  ({
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: async () => data,
    text: async () => JSON.stringify(data),
  }) as Response;

/** Stub the global `fetch`. Restore with `sinon.restore()`. */
export const stubFetch = (): sinon.SinonStub => sinon.stub(globalThis, 'fetch');

/** Parse the JSON body sent in a stubbed `fetch` call. */
export const requestBody = (call: sinon.SinonSpyCall): Record<string, unknown> =>
  JSON.parse((call.args[1] as RequestInit).body as string);
