import { readFileSync } from 'node:fs';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createClient, isSchemaMismatchError } from '#/core';
import { createServerClient, getIssueDevelopmentStatusDetail, type ServerClientConfig } from '#/server';
import { DevelopmentStatusDetailSchema, type DevelopmentStatusDetail } from '#/server/models';
import { GetIssueDevelopmentStatusDetailSchema, type GetIssueDevelopmentStatusDetail } from '#/server/parameters';

const parameters: GetIssueDevelopmentStatusDetail = {
  issueId: '9007199254740993',
  applicationType: 'stash',
  dataType: 'pullrequest',
};

const response = {
  errors: [],
  detail: [
    {
      repositories: [
        { name: 'repository', url: 'https://git.example/repository', commits: [{ id: 'abc', vendor: true }] },
      ],
      pullRequests: [{ id: '1', vendor: { state: 'open' } }],
      branches: [{ name: 'feature', vendor: ['extra'] }],
      _instance: { type: 'custom-integration' },
    },
  ],
  integrationMetadata: { enabled: true },
};

function connect(
  body: unknown = response,
  config: Partial<Pick<ServerClientConfig, 'auth' | 'onSchemaMismatch'>> = {},
) {
  const fetch = vi.fn<typeof globalThis.fetch>().mockImplementation(async () => Response.json(body));
  const client = createClient({ host: 'https://jira.example/jira', fetch, ...config });

  return { client, jira: createServerClient(client), fetch };
}

describe('Data Center development status detail', () => {
  it('preserves real nonempty Bitbucket pull-request, branch and repository payloads', () => {
    const fixture = (name: string) =>
      JSON.parse(readFileSync(new URL(`../fixtures/development-status/${name}.json`, import.meta.url), 'utf8'));
    const pullRequests = fixture('pullrequest');
    const repositories = fixture('repository');
    const branch = fixture('branch');

    for (const body of [pullRequests, repositories, branch]) {
      expect(DevelopmentStatusDetailSchema.parse(body)).toEqual(body);
    }

    const detail = DevelopmentStatusDetailSchema.parse(pullRequests).detail[0]!;

    expect(detail.pullRequests).toHaveLength(1);
    expect(detail.pullRequests![0]).toMatchObject({
      id: '#1',
      status: 'OPEN',
      source: { branch: 'feature/JMIG-1', repository: { name: 'development-status' } },
      destination: { branch: 'master' },
    });
    expect(detail.branches).toHaveLength(1);
    expect(detail.branches![0]!.name).toBe('feature/JMIG-1');
    expectTypeOf(detail.pullRequests![0]!.source?.branch).toEqualTypeOf<string | undefined>();
    expectTypeOf(detail.branches![0]!.repository?.name).toEqualTypeOf<string | undefined>();
    expect(DevelopmentStatusDetailSchema.parse(repositories).detail[0]!.repositories![0]!.commits).toHaveLength(1);
  });

  it('exports parameter and response schemas alongside the public method', async () => {
    expect(GetIssueDevelopmentStatusDetailSchema.parse(parameters)).toEqual(parameters);
    expect(GetIssueDevelopmentStatusDetailSchema.safeParse({ issueId: '1' }).success).toBe(false);
    expect(GetIssueDevelopmentStatusDetailSchema.safeParse({ ...parameters, issueId: 1 }).success).toBe(false);
    expect(DevelopmentStatusDetailSchema.parse(response)).toEqual(response);

    const { client } = connect();
    const result = await getIssueDevelopmentStatusDetail(client, parameters);

    expectTypeOf(result).toEqualTypeOf<DevelopmentStatusDetail>();
    expectTypeOf(result.integrationMetadata).toEqualTypeOf<unknown>();
    expectTypeOf(result.detail[0]!.repositories![0]!.commits).toEqualTypeOf<unknown[] | undefined>();
    expect(result).toEqual(response);
  });

  it.each([
    ['stash', 'pullrequest'],
    ['bitbucket', 'repository'],
    ['github', 'branch'],
    ['githube', 'repository'],
    ['vendor+custom&key=value', 'future/type'],
  ])('passes %s and %s through the bound client', async (applicationType, dataType) => {
    const { jira, fetch } = connect();

    await expect(
      jira.developmentStatus.getIssueDevelopmentStatusDetail({ ...parameters, applicationType, dataType }),
    ).resolves.toEqual(response);

    expect(fetch).toHaveBeenCalledOnce();
    const [input, init] = fetch.mock.calls[0]!;
    const url = new URL(String(input));

    expect(url.pathname).toBe('/jira/rest/dev-status/1.0/issue/detail');
    expect(Object.fromEntries(url.searchParams)).toEqual({ ...parameters, applicationType, dataType });
    expect(init?.method).toBe('GET');
    expect(init?.body).toBeUndefined();
  });

  it.each([
    [{ type: 'basic', username: 'admin', password: 'password' }, `Basic ${btoa('admin:password')}`],
    [{ type: 'bearer', token: 'token' }, 'Bearer token'],
    [undefined, null],
  ] as const)('uses normal transport authentication for %j', async (auth, expected) => {
    const { jira, fetch } = connect(response, { auth });

    await jira.developmentStatus.getIssueDevelopmentStatusDetail(parameters);

    expect(new Headers(fetch.mock.calls[0]![1]?.headers).get('Authorization')).toBe(expected);
  });

  it('passes cancellation to the shared transport', async () => {
    const { jira, fetch } = connect();
    const controller = new AbortController();

    await jira.developmentStatus.getIssueDevelopmentStatusDetail(parameters, { signal: controller.signal });

    expect(fetch.mock.calls[0]![1]?.signal).toBe(controller.signal);
  });

  it.each([400, 401, 403, 404, 429, 500])('uses the same HTTP %i error as another server endpoint', async status => {
    const body = { errorMessages: ['Development information is unavailable'], errors: {} };
    const { jira, fetch } = connect();
    fetch.mockImplementation(async () => Response.json(body, { status, headers: { 'Retry-After': '3' } }));

    const reference = await jira.serverInfo.getServerInfo().catch((error: unknown) => error);
    const error = await jira.developmentStatus
      .getIssueDevelopmentStatusDetail(parameters)
      .catch((error: unknown) => error);

    expect(error).toBeInstanceOf((reference as Error).constructor);
    expect(error).toMatchObject({ status, body });
  });

  it('returns integration errors and partial detail from HTTP 200', async () => {
    const body = { ...response, errors: ['Integration timed out', { integration: 'other', reason: 'offline' }] };
    const { jira } = connect(body, { onSchemaMismatch: 'throw' });

    await expect(jira.developmentStatus.getIssueDevelopmentStatusDetail(parameters)).resolves.toEqual(body);
  });

  it('reports a schema mismatch and returns the body with the usual nonfatal behavior', async () => {
    const body = { errors: [], detail: 'unexpected' };
    const onSchemaMismatch = vi.fn();
    const { jira } = connect(body, { onSchemaMismatch });

    await expect(jira.developmentStatus.getIssueDevelopmentStatusDetail(parameters)).resolves.toEqual(body);
    expect(onSchemaMismatch).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: 'GET /rest/dev-status/1.0/issue/detail',
        issues: [expect.objectContaining({ path: 'detail', expected: 'array', received: 'string' })],
      }),
    );
  });

  it('honors the shared strict schema mismatch behavior', async () => {
    const { jira } = connect({ errors: [], detail: [null] }, { onSchemaMismatch: 'throw' });
    const error = await jira.developmentStatus
      .getIssueDevelopmentStatusDetail(parameters)
      .catch((error: unknown) => error);

    expect(isSchemaMismatchError(error)).toBe(true);
  });
});
