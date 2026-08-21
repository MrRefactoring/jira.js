import { SoftwareInfoSchema, type SoftwareInfo } from '../models/softwareInfo';
import type { Client, SendRequestOptions } from '#/core';

/** Returns runtime information about Jira Service Management. You do not need to be logged in to use this method. */
export async function getInfo(client: Client): Promise<SoftwareInfo> {
  const config: SendRequestOptions<SoftwareInfo> = {
    url: '/rest/servicedeskapi/info',
    method: 'GET',
    schema: SoftwareInfoSchema,
  };

  return await client.sendRequest(config);
}
