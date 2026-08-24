import type { SetEmail } from '../parameters/setEmail';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Sets the specified user's email address. Before using this endpoint, you must [verify the target
 * domain](https://confluence.atlassian.com/x/gjcWN) as the new email address will be considered verified. The
 * permission to make use of this resource is exposed by the `email.set` privilege. This call invalidates all active
 * sessions.
 */
export async function setEmail(client: Client, parameters: SetEmail, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/users/${parameters.accountId}/manage/email`,
    method: 'PUT',
    body: {
      email: parameters.email,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
