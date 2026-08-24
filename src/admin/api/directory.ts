import {
  MultiDirectoryUserDirectoryPageSchema,
  type MultiDirectoryUserDirectoryPage,
} from '../models/multiDirectoryUserDirectoryPage';
import type { GetDirectoriesForOrg } from '../parameters/getDirectoriesForOrg';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a page of directories in an organization that match the supplied parameters.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:directories:admin`
 */
export async function getDirectoriesForOrg(
  client: Client,
  parameters: GetDirectoriesForOrg,
  options?: RequestOptions,
): Promise<MultiDirectoryUserDirectoryPage> {
  const config: SendRequestOptions<MultiDirectoryUserDirectoryPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories`,
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
      directoryIds: parameters.directoryIds,
      searchTerm: parameters.searchTerm,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: MultiDirectoryUserDirectoryPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
