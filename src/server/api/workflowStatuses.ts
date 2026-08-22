import { StatusJsonSchema, type StatusJson } from '../models/statusJson';
import type { GetPaginatedStatuses } from '../parameters/getPaginatedStatuses';
import type { GetStatus } from '../parameters/getStatus';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all statuses */
export async function getStatuses(client: Client, options?: RequestOptions): Promise<StatusJson[]> {
  const config: SendRequestOptions<StatusJson[]> = {
    url: '/rest/api/2/status',
    method: 'GET',
    schema: z.array(StatusJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns paginated list of filtered statuses */
export async function getPaginatedStatuses(
  client: Client,
  parameters?: GetPaginatedStatuses,
  options?: RequestOptions,
): Promise<StatusJson> {
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
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the Status having the given id or name. */
export async function getStatus(client: Client, parameters: GetStatus, options?: RequestOptions): Promise<StatusJson> {
  const config: SendRequestOptions<StatusJson> = {
    url: `/rest/api/2/status/${parameters.idOrName}`,
    method: 'GET',
    schema: StatusJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
