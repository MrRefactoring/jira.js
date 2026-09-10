import { GetManagementPermissionsSchema, type GetManagementPermissions } from '../models/getManagementPermissions';
import type { GetManagementPermissions as GetManagementPermissionsParameters } from '../parameters/getManagementPermissions';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns the set of permissions you have for managing the specified Atlassian account */
export async function getManagementPermissions(
  client: Client,
  parameters: GetManagementPermissionsParameters,
  options?: RequestOptions,
): Promise<GetManagementPermissions> {
  const config: SendRequestOptions<GetManagementPermissions> = {
    url: `/users/${parameters.accountId}/manage`,
    method: 'GET',
    searchParams: {
      privileges: parameters.privileges,
    },
    schema: GetManagementPermissionsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
