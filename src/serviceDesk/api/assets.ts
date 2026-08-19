import { PagedAssetsWorkspaceSchema } from '../models/pagedAssetsWorkspace';
import type { Page } from '../models/page';
import type { AssetsWorkspace } from '../models/assetsWorkspace';
import { PagedInsightWorkspaceSchema } from '../models/pagedInsightWorkspace';
import type { InsightWorkspace } from '../models/insightWorkspace';
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
): Promise<Page<AssetsWorkspace>> {
  const config: SendRequestOptions<Page<AssetsWorkspace>> = {
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
): Promise<Page<InsightWorkspace>> {
  const config: SendRequestOptions<Page<InsightWorkspace>> = {
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
