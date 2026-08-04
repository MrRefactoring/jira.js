import { PagedAssetsWorkspaceSchema, type PagedAssetsWorkspace } from '../models/pagedAssetsWorkspace';
import { PagedInsightWorkspaceSchema, type PagedInsightWorkspace } from '../models/pagedInsightWorkspace';
import type { GetAssetsWorkspaces } from '../parameters/getAssetsWorkspaces';
import type { GetInsightWorkspaces } from '../parameters/getInsightWorkspaces';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns a list of Assets workspace IDs. Include a workspace ID in the path to access the [Assets REST
 * APIs](https://developer.atlassian.com/cloud/assets/rest).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Any
 */
export async function getAssetsWorkspaces(
  client: Client,
  parameters?: GetAssetsWorkspaces,
): Promise<PagedAssetsWorkspace> {
  const config: SendRequestOptions<PagedAssetsWorkspace> = {
    url: '/rest/servicedeskapi/assets/workspace',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedAssetsWorkspaceSchema,
  };

  return await client.sendRequest(config);
}

/** This endpoint is deprecated, please use /assets/workspace/. */
export async function getInsightWorkspaces(
  client: Client,
  parameters?: GetInsightWorkspaces,
): Promise<PagedInsightWorkspace> {
  const config: SendRequestOptions<PagedInsightWorkspace> = {
    url: '/rest/servicedeskapi/insight/workspace',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedInsightWorkspaceSchema,
  };

  return await client.sendRequest(config);
}
