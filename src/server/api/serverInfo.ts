import { ServerInfoSchema, type ServerInfo } from '../models/serverInfo';
import type { Client, SendRequestOptions } from '#/core';

/** Returns general information about the current Jira server. */
export async function getServerInfo(client: Client): Promise<ServerInfo> {
  const config: SendRequestOptions<ServerInfo> = {
    url: '/rest/api/2/serverInfo',
    method: 'GET',
    schema: ServerInfoSchema,
  };

  return await client.sendRequest(config);
}
