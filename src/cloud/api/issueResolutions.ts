import { ResolutionSchema, type Resolution } from '../models/resolution';
import type { GetResolution } from '../parameters/getResolution';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns an issue resolution value.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getResolution(
  client: Client,
  parameters: GetResolution,
  options?: RequestOptions,
): Promise<Resolution> {
  const config: SendRequestOptions<Resolution> = {
    url: `/rest/api/3/resolution/${parameters.id}`,
    method: 'GET',
    schema: ResolutionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
