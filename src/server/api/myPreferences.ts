import type { GetPreference } from '../parameters/getPreference';
import type { SetPreference } from '../parameters/setPreference';
import type { RemovePreference } from '../parameters/removePreference';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns preference of the currently logged in user. Preference key must be provided as input parameter (key). The
 * value is returned exactly as it is. If key parameter is not provided or wrong - status code 404. If value is found -
 * status code 200.
 */
export async function getPreference(
  client: Client,
  parameters?: GetPreference,
  options?: RequestOptions,
): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: '/rest/api/2/mypreferences',
    method: 'GET',
    searchParams: {
      key: parameters?.key,
    },
    schema: z.string(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets preference of the currently logged in user. Preference key must be provided as input parameters (key). Value
 * must be provided as post body. If key or value parameter is not provided - status code 404. If preference is set -
 * status code 204.
 */
export async function setPreference(
  client: Client,
  parameters: SetPreference,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/mypreferences',
    method: 'PUT',
    searchParams: {
      key: parameters.key,
    },
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes preference of the currently logged in user. Preference key must be provided as input parameters (key). If key
 * parameter is not provided or wrong - status code 404. If preference is unset - status code 204.
 */
export async function removePreference(
  client: Client,
  parameters: RemovePreference,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/mypreferences',
    method: 'DELETE',
    searchParams: {
      key: parameters.key,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
