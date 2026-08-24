import { StatusCategoryJsonSchema, type StatusCategoryJson } from '../models/statusCategoryJson';
import type { GetStatusCategories } from '../parameters/getStatusCategories';
import type { GetStatusCategory } from '../parameters/getStatusCategory';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all status categories */
export async function getStatusCategories(
  client: Client,
  parameters?: GetStatusCategories,
  options?: RequestOptions,
): Promise<StatusCategoryJson[]> {
  const config: SendRequestOptions<StatusCategoryJson[]> = {
    url: '/rest/api/2/statuscategory',
    method: 'GET',
    searchParams: {
      request: parameters?.request,
      uriInfo: parameters?.uriInfo,
    },
    schema: z.array(StatusCategoryJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the StatusCategory having the given id or key */
export async function getStatusCategory(
  client: Client,
  parameters: GetStatusCategory,
  options?: RequestOptions,
): Promise<StatusCategoryJson> {
  const config: SendRequestOptions<StatusCategoryJson> = {
    url: `/rest/api/2/statuscategory/${parameters.idOrKey}`,
    method: 'GET',
    schema: StatusCategoryJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
