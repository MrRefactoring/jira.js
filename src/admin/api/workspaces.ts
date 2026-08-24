import { PageDataResponseV2Schema, type PageDataResponseV2 } from '../models/pageDataResponseV2';
import type { QueryWorkspaces } from '../parameters/queryWorkspaces';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * A workspace refers to a specific instance of an Atlassian product that is accessed through a unique URL. Whenever a
 * user initiates or adds a new product instance, it results in the creation of a distinct workspace.
 *
 * This API will:
 *
 * - Return a paginated list of workspaces in a given org
 * - Return more details about an organization's products (including product URL).
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:workspaces:admin`
 */
export async function queryWorkspaces(
  client: Client,
  parameters: QueryWorkspaces,
  options?: RequestOptions,
): Promise<PageDataResponseV2> {
  const config: SendRequestOptions<PageDataResponseV2> = {
    url: `/admin/v2/orgs/${parameters.orgId}/workspaces`,
    method: 'POST',
    body: {
      query: parameters.query,
      limit: parameters.limit,
      sort: parameters.sort,
      cursor: parameters.cursor,
    },
    schema: PageDataResponseV2Schema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
