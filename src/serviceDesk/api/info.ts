import { SoftwareInfoSchema, type SoftwareInfo } from '../models/softwareInfo';
import type { Client, SendRequestOptions } from '#/core';

/**
 * This method retrieves information about the Jira Service Management instance such as software version, builds, and
 * related links.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: None, the
 * user does not need to be logged in.
 */
export async function getInfo(client: Client): Promise<SoftwareInfo> {
  const config: SendRequestOptions<SoftwareInfo> = {
    url: '/rest/servicedeskapi/info',
    method: 'GET',
    schema: SoftwareInfoSchema,
  };

  return await client.sendRequest(config);
}
