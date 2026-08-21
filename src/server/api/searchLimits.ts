import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the maximum number of aggregation buckets allowed by the underlying search platform
 *
 * Available since Jira Data Center 11.3.
 */
export async function getMaxAggregationBuckets(client: Client): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/searchLimits/maxAggregationBuckets',
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the maximum number of search results that can be returned by the underlying search platform
 *
 * Available since Jira Data Center 11.3.
 */
export async function getMaxResultWindow(client: Client): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/searchLimits/maxResultWindow',
    method: 'GET',
  };

  return await client.sendRequest(config);
}
