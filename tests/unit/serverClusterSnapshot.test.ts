import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createClient } from '#/core';
import { createServerClient, requestCurrentIndexFromNode, type ServerClientConfig } from '#/server';
import { RequestCurrentIndexFromNodeSchema, type RequestCurrentIndexFromNode } from '#/server/parameters';

function connect(config: Partial<Pick<ServerClientConfig, 'auth'>> = {}) {
  const fetch = vi.fn<typeof globalThis.fetch>().mockImplementation(async () => new Response(null, { status: 200 }));
  const client = createClient({ host: 'https://jira.example/jira', fetch, onSchemaMismatch: 'throw', ...config });

  return { client, jira: createServerClient(client), fetch };
}

describe('Data Center cluster index snapshot', () => {
  it('exports the public parameter schema and free function with an empty response type', async () => {
    const parameters: RequestCurrentIndexFromNode = { nodeId: 'node-2' };
    const { client } = connect();

    expect(RequestCurrentIndexFromNodeSchema.parse(parameters)).toEqual(parameters);
    expect(RequestCurrentIndexFromNodeSchema.safeParse({ nodeId: 2 }).success).toBe(false);
    expect(RequestCurrentIndexFromNodeSchema.safeParse({}).success).toBe(false);

    const result = await requestCurrentIndexFromNode(client, parameters);

    expectTypeOf(result).toEqualTypeOf<void>();
    expect(result).toBeUndefined();
  });

  it.each([200, 204])('accepts an empty HTTP %i response through the bound client', async status => {
    const { jira, fetch } = connect();
    fetch.mockImplementation(async () => new Response(null, { status }));

    await expect(jira.cluster.requestCurrentIndexFromNode({ nodeId: 'node-2' })).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledOnce();
    expect(String(fetch.mock.calls[0]![0])).toBe('https://jira.example/jira/rest/api/2/cluster/index-snapshot/node-2');
    expect(fetch.mock.calls[0]![1]).toMatchObject({ method: 'PUT' });
    expect(fetch.mock.calls[0]![1]?.body).toBeUndefined();
  });

  it('encodes nodeId as one path segment without creating a query or fragment', async () => {
    const { jira, fetch } = connect();

    await jira.cluster.requestCurrentIndexFromNode({ nodeId: 'node/a?query#fragment %é' });

    const url = new URL(String(fetch.mock.calls[0]![0]));

    expect(url.pathname).toBe('/jira/rest/api/2/cluster/index-snapshot/node%2Fa%3Fquery%23fragment%20%25%C3%A9');
    expect(url.search).toBe('');
    expect(url.hash).toBe('');
  });

  it.each([
    [{ type: 'basic', username: 'admin', password: 'password' }, `Basic ${btoa('admin:password')}`],
    [{ type: 'bearer', token: 'token' }, 'Bearer token'],
    [undefined, null],
  ] as const)('uses normal authentication for %j', async (auth, expected) => {
    const { jira, fetch } = connect({ auth });

    await jira.cluster.requestCurrentIndexFromNode({ nodeId: 'node-2' });

    expect(new Headers(fetch.mock.calls[0]![1]?.headers).get('Authorization')).toBe(expected);
  });

  it('forwards cancellation and preserves its transport error', async () => {
    const { jira, fetch } = connect();
    const controller = new AbortController();
    const error = new DOMException('Cancelled', 'AbortError');
    fetch.mockImplementation(async () => {
      controller.abort(error);
      throw error;
    });

    await expect(
      jira.cluster.requestCurrentIndexFromNode({ nodeId: 'node-2' }, { signal: controller.signal }),
    ).rejects.toBe(error);
    expect(fetch.mock.calls[0]![1]?.signal).toBe(controller.signal);
  });

  it.each([400, 401, 403, 404, 405, 429, 500])('preserves ordinary SDK errors for HTTP %i', async status => {
    const { jira, fetch } = connect();
    const body = { errorMessages: ['Index snapshot request is unavailable'], errors: {} };
    fetch.mockImplementation(async () => Response.json(body, { status, headers: { 'Retry-After': '3' } }));

    const reference = await jira.serverInfo.getServerInfo().catch((error: unknown) => error);
    const error = await jira.cluster
      .requestCurrentIndexFromNode({ nodeId: 'missing' })
      .catch((value: unknown) => value);

    expect(error).toBeInstanceOf((reference as Error).constructor);
    expect(error).toMatchObject({ status, body });
  });
});
