import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns the maximum number of aggregation buckets allowed by the underlying search platform
 *
 * Available since Jira Data Center 11.3.
 */
export async function getMaxAggregationBuckets(client: Client, options?: RequestOptions): Promise<number> {
  const config: SendRequestOptions<number> = {
    url: '/rest/api/2/searchLimits/maxAggregationBuckets',
    method: 'GET',
    schema: z.number(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the maximum number of search results that can be returned by the underlying search platform
 *
 * Available since Jira Data Center 11.3.
 */
export async function getMaxResultWindow(client: Client, options?: RequestOptions): Promise<number> {
  const config: SendRequestOptions<number> = {
    url: '/rest/api/2/searchLimits/maxResultWindow',
    method: 'GET',
    schema: z.number(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
