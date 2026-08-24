import { ServerInfoSchema, type ServerInfo } from '../models/serverInfo';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns general information about the current Jira server. */
export async function getServerInfo(client: Client, options?: RequestOptions): Promise<ServerInfo> {
  const config: SendRequestOptions<ServerInfo> = {
    url: '/rest/api/2/serverInfo',
    method: 'GET',
    schema: ServerInfoSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
