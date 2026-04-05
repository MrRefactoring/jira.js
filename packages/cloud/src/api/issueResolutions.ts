import { ResolutionSchema, type Resolution } from '#/models/resolution';
import { type GetResolution } from '#/parameters/getResolution';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns an issue resolution value.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getResolution(client: Client, parameters: GetResolution): Promise<Resolution> {
  const config: SendRequestOptions<Resolution> = {
    url: `/rest/api/3/resolution/${parameters.id}`,
    method: 'GET',
    schema: ResolutionSchema,
  };

  return await client.sendRequest(config);
}
