import { StatusCategoryJsonSchema, type StatusCategoryJson } from '../models/statusCategoryJson';
import type { GetStatusCategories } from '../parameters/getStatusCategories';
import type { GetStatusCategory } from '../parameters/getStatusCategory';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all status categories */
export async function getStatusCategories(
  client: Client,
  parameters?: GetStatusCategories,
): Promise<StatusCategoryJson[]> {
  const config: SendRequestOptions<StatusCategoryJson[]> = {
    url: '/rest/api/2/statuscategory',
    method: 'GET',
    searchParams: {
      request: parameters?.request,
      uriInfo: parameters?.uriInfo,
    },
    schema: z.array(StatusCategoryJsonSchema),
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the StatusCategory having the given id or key */
export async function getStatusCategory(client: Client, parameters: GetStatusCategory): Promise<StatusCategoryJson> {
  const config: SendRequestOptions<StatusCategoryJson> = {
    url: `/rest/api/2/statuscategory/${parameters.idOrKey}`,
    method: 'GET',
    schema: StatusCategoryJsonSchema,
  };

  return await client.sendRequest(config);
}
