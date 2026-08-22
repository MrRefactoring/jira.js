import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the maximum number of aggregation buckets allowed by the underlying search platform
 *
 * Available since Jira Data Center 11.3.
 */
export async function getMaxAggregationBuckets(client: Client, options?: RequestOptions): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/searchLimits/maxAggregationBuckets',
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the maximum number of search results that can be returned by the underlying search platform
 *
 * Available since Jira Data Center 11.3.
 */
export async function getMaxResultWindow(client: Client, options?: RequestOptions): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/searchLimits/maxResultWindow',
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
