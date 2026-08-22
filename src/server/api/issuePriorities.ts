import { PriorityJsonSchema, type PriorityJson } from '../models/priorityJson';
import type { GetPrioritiesPaginated } from '../parameters/getPrioritiesPaginated';
import type { GetPriority } from '../parameters/getPriority';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all issue priorities */
export async function getPriorities(client: Client, options?: RequestOptions): Promise<PriorityJson[]> {
  const config: SendRequestOptions<PriorityJson[]> = {
    url: '/rest/api/2/priority',
    method: 'GET',
    schema: z.array(PriorityJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a page with list of issue priorities whose names (or their translations) match query */
export async function getPrioritiesPaginated(
  client: Client,
  parameters?: GetPrioritiesPaginated,
  options?: RequestOptions,
): Promise<PriorityJson> {
  const config: SendRequestOptions<PriorityJson> = {
    url: '/rest/api/2/priority/page',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      projectIds: parameters?.projectIds,
      startAt: parameters?.startAt,
    },
    schema: PriorityJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns an issue priority */
export async function getPriority(
  client: Client,
  parameters: GetPriority,
  options?: RequestOptions,
): Promise<PriorityJson> {
  const config: SendRequestOptions<PriorityJson> = {
    url: `/rest/api/2/priority/${parameters.id}`,
    method: 'GET',
    schema: PriorityJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
