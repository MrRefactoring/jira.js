import { ServerInformationSchema, type ServerInformation } from '#/models/serverInformation';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns information about the Jira instance.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getServerInfo(client: Client): Promise<ServerInformation> {
  const config: SendRequestOptions<ServerInformation> = {
    url: '/rest/api/3/serverInfo',
    method: 'GET',
    schema: ServerInformationSchema,
  };

  return await client.sendRequest(config);
}
