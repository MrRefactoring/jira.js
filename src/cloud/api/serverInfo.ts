import { ServerInformationSchema, type ServerInformation } from '../models/serverInformation';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns information about the Jira instance.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getServerInfo(client: Client, options?: RequestOptions): Promise<ServerInformation> {
  const config: SendRequestOptions<ServerInformation> = {
    url: '/rest/api/3/serverInfo',
    method: 'GET',
    schema: ServerInformationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
