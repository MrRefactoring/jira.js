import type { RequestOptions } from './schemas/index.js';

export interface PaginationOptions<TParameters, TPage, TItem> {
  initialParameters: TParameters;
  fetchPage: (parameters: TParameters, options: RequestOptions) => Promise<TPage>;
  getItems: (page: TPage) => Iterable<TItem>;
  getNextParameters: (page: TPage, parameters: TParameters) => TParameters | undefined;
  signal?: AbortSignal;
}

export async function* paginate<TParameters, TPage, TItem>({
  initialParameters,
  fetchPage,
  getItems,
  getNextParameters,
  signal,
}: PaginationOptions<TParameters, TPage, TItem>): AsyncGenerator<TItem, void, unknown> {
  let parameters = initialParameters;

  for (;;) {
    signal?.throwIfAborted();

    const page = await fetchPage(parameters, { signal });

    signal?.throwIfAborted();

    for (const item of getItems(page)) {
      signal?.throwIfAborted();
      yield item;
    }

    signal?.throwIfAborted();

    const next = getNextParameters(page, parameters);

    if (next === undefined) return;

    parameters = next;
  }
}
