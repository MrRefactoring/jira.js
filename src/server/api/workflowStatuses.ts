import { StatusJsonSchema, type StatusJson } from '../models/statusJson';
import type { GetPaginatedStatuses } from '../parameters/getPaginatedStatuses';
import type { GetStatus } from '../parameters/getStatus';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all statuses */
export async function getStatuses(client: Client): Promise<StatusJson[]> {
  const config: SendRequestOptions<StatusJson[]> = {
    url: '/rest/api/2/status',
    method: 'GET',
    schema: z.array(StatusJsonSchema),
  };

  return await client.sendRequest(config);
}

/** Returns paginated list of filtered statuses */
export async function getPaginatedStatuses(client: Client, parameters?: GetPaginatedStatuses): Promise<StatusJson> {
  const config: SendRequestOptions<StatusJson> = {
    url: '/rest/api/2/status/page',
    method: 'GET',
    searchParams: {
      issueTypeIds: parameters?.issueTypeIds,
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      projectIds: parameters?.projectIds,
      startAt: parameters?.startAt,
    },
    schema: StatusJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the Status having the given id or name. */
export async function getStatus(client: Client, parameters: GetStatus): Promise<StatusJson> {
  const config: SendRequestOptions<StatusJson> = {
    url: `/rest/api/2/status/${parameters.idOrName}`,
    method: 'GET',
    schema: StatusJsonSchema,
  };

  return await client.sendRequest(config);
}
