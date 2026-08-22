import { StatusCategorySchema, type StatusCategory } from '../models/statusCategory';
import type { GetStatusCategory } from '../parameters/getStatusCategory';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns a list of all status categories.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getStatusCategories(client: Client, options?: RequestOptions): Promise<StatusCategory[]> {
  const config: SendRequestOptions<StatusCategory[]> = {
    url: '/rest/api/3/statuscategory',
    method: 'GET',
    schema: z.array(StatusCategorySchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a status category. Status categories provided a mechanism for categorizing
 * [statuses](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-rest-api-3-status-idOrName-get).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getStatusCategory(
  client: Client,
  parameters: GetStatusCategory,
  options?: RequestOptions,
): Promise<StatusCategory> {
  const config: SendRequestOptions<StatusCategory> = {
    url: `/rest/api/3/statuscategory/${parameters.idOrKey}`,
    method: 'GET',
    schema: StatusCategorySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
