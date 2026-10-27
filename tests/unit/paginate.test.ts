import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createCloudClient, paginate } from '#/index';
import type { Issue } from '#/cloud/models';
import type { SearchIssues } from '#/cloud/parameters';

async function collect<T>(items: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of items) result.push(item);
  return result;
}

const host = 'https://example.atlassian.net';

describe('paginate', () => {
  it('yields offset-paginated labels lazily with inferred item types', async () => {
    const fetch = vi.fn(async (url: string) => {
      const startAt = Number(new URL(url).searchParams.get('startAt'));
      return Response.json({ values: startAt === 0 ? ['first', 'second'] : ['third'], isLast: startAt === 2 });
    });
    const client = createCloudClient({ host, fetch, onSchemaMismatch: 'throw' });
    const iterator = paginate({
      initialParameters: { startAt: 0, maxResults: 2 },
      fetchPage: client.labels.getAllLabels,
      getItems: page => page.values ?? [],
      getNextParameters: (page, parameters) =>
        page.isLast ? undefined : { ...parameters, startAt: parameters.startAt + (page.values?.length ?? 0) },
    });

    expectTypeOf(iterator).toEqualTypeOf<AsyncGenerator<string, void, unknown>>();
    expect(fetch).not.toHaveBeenCalled();
    expect(await iterator.next()).toEqual({ value: 'first', done: false });
    expect(await iterator.next()).toEqual({ value: 'second', done: false });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(await iterator.next()).toEqual({ value: 'third', done: false });
    expect(await iterator.next()).toEqual({ value: undefined, done: true });
    expect(fetch.mock.calls.map(([url]) => new URL(url).searchParams.get('startAt'))).toEqual(['0', '2']);
  });

  it('follows JQL cursor tokens through an empty page without guessing the end', async () => {
    const responses = [
      { issues: [{ id: '1' }], nextPageToken: 'next', isLast: false },
      { issues: [], nextPageToken: 'last', isLast: false },
      { issues: [{ id: '2' }], nextPageToken: null, isLast: true },
    ];
    const fetch = vi.fn(async () => Response.json(responses.shift()));
    const client = createCloudClient({ host, fetch, onSchemaMismatch: 'throw' });
    const initialParameters: SearchIssues = { jql: 'project = EXAMPLE', maxResults: 2 };
    const iterator = paginate({
      initialParameters,
      fetchPage: client.issueSearch.searchIssues,
      getItems: page => page.issues ?? [],
      getNextParameters: (page, parameters) =>
        page.nextPageToken ? { ...parameters, nextPageToken: page.nextPageToken } : undefined,
    });

    expectTypeOf(iterator).toEqualTypeOf<AsyncGenerator<Issue, void, unknown>>();
    expect(await collect(iterator)).toEqual([{ id: '1' }, { id: '2' }]);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(initialParameters).toEqual({ jql: 'project = EXAMPLE', maxResults: 2 });
  });

  it('does not compute or fetch the next page after an early break', async () => {
    const fetchPage = vi.fn(async () => [1, 2]);
    const getNextParameters = vi.fn(() => 1);

    for await (const item of paginate({ initialParameters: 0, fetchPage, getItems: page => page, getNextParameters })) {
      expect(item).toBe(1);
      break;
    }

    expect(fetchPage).toHaveBeenCalledOnce();
    expect(getNextParameters).not.toHaveBeenCalled();
  });

  it('forwards AbortSignal through a generated endpoint', async () => {
    const controller = new AbortController();
    const fetch = vi.fn(async () => Response.json({ values: ['label'], isLast: true }));
    const client = createCloudClient({ host, fetch });

    expect(
      await collect(
        paginate({
          initialParameters: {},
          fetchPage: client.labels.getAllLabels,
          getItems: page => page.values ?? [],
          getNextParameters: () => undefined,
          signal: controller.signal,
        }),
      ),
    ).toEqual(['label']);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ signal: controller.signal }));
  });

  it('stops between items with the original abort reason', async () => {
    const controller = new AbortController();
    const reason = new Error('cancelled');
    const fetchPage = vi.fn(async () => [1, 2]);
    const iterator = paginate({
      initialParameters: 0,
      fetchPage,
      getItems: page => page,
      getNextParameters: () => 1,
      signal: controller.signal,
    });

    expect((await iterator.next()).value).toBe(1);
    controller.abort(reason);
    await expect(iterator.next()).rejects.toBe(reason);
    expect(fetchPage).toHaveBeenCalledOnce();
  });

  it('does not fetch when the signal is already aborted', async () => {
    const controller = new AbortController();
    const reason = new Error('cancelled');
    controller.abort(reason);
    const fetchPage = vi.fn(async () => [1]);

    await expect(
      collect(
        paginate({
          initialParameters: 0,
          fetchPage,
          getItems: page => page,
          getNextParameters: () => undefined,
          signal: controller.signal,
        }),
      ),
    ).rejects.toBe(reason);
    expect(fetchPage).not.toHaveBeenCalled();
  });

  it('checks for cancellation after a fetcher that ignores the signal', async () => {
    const controller = new AbortController();
    const reason = new Error('cancelled');
    const getItems = vi.fn((page: number[]) => page);

    await expect(
      collect(
        paginate({
          initialParameters: 0,
          fetchPage: async () => {
            controller.abort(reason);
            return [1];
          },
          getItems,
          getNextParameters: () => undefined,
          signal: controller.signal,
        }),
      ),
    ).rejects.toBe(reason);
    expect(getItems).not.toHaveBeenCalled();
  });

  it('propagates endpoint and adapter failures unchanged', async () => {
    const reason = new Error('failure');
    await expect(
      collect(
        paginate({
          initialParameters: 0,
          fetchPage: async (): Promise<number[]> => {
            throw reason;
          },
          getItems: page => page,
          getNextParameters: () => undefined,
        }),
      ),
    ).rejects.toBe(reason);
    await expect(
      collect(
        paginate({
          initialParameters: 0,
          fetchPage: async () => [1],
          getItems: () => {
            throw reason;
          },
          getNextParameters: () => undefined,
        }),
      ),
    ).rejects.toBe(reason);
  });
});
