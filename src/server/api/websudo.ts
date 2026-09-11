import type { Release } from '../parameters/release';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** This method invalidates the any current WebSudo session. */
export async function release(client: Client, parameters: Release, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/auth/1/websudo',
    method: 'DELETE',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
