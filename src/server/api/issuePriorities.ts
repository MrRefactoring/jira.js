import { PriorityJsonSchema, type PriorityJson } from '../models/priorityJson';
import type { GetPrioritiesPaginated } from '../parameters/getPrioritiesPaginated';
import type { GetPriority } from '../parameters/getPriority';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all issue priorities */
export async function getPriorities(client: Client): Promise<PriorityJson[]> {
  const config: SendRequestOptions<PriorityJson[]> = {
    url: '/rest/api/2/priority',
    method: 'GET',
    schema: z.array(PriorityJsonSchema),
  };

  return await client.sendRequest(config);
}

/** Returns a page with list of issue priorities whose names (or their translations) match query */
export async function getPrioritiesPaginated(
  client: Client,
  parameters?: GetPrioritiesPaginated,
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
  };

  return await client.sendRequest(config);
}

/** Returns an issue priority */
export async function getPriority(client: Client, parameters: GetPriority): Promise<PriorityJson> {
  const config: SendRequestOptions<PriorityJson> = {
    url: `/rest/api/2/priority/${parameters.id}`,
    method: 'GET',
    schema: PriorityJsonSchema,
  };

  return await client.sendRequest(config);
}
