import type { Release } from '../parameters/release';
import type { Client, SendRequestOptions } from '#/core';

/** This method invalidates the any current WebSudo session. */
export async function release(client: Client, parameters: Release): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/auth/1/websudo',
    method: 'DELETE',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}
