import { BulkWorklogKeyResponseSchema, type BulkWorklogKeyResponse } from '#/models/bulkWorklogKeyResponse';
import { type GetWorklogsByIssueIdAndWorklogId } from '#/parameters/getWorklogsByIssueIdAndWorklogId';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns worklog details for a list of issue ID and worklog ID pairs.
 *
 * This is an internal API for bulk fetching worklogs by their issue and worklog IDs. Worklogs that don't exist will be
 * filtered out from the response.
 *
 * The returned list of worklogs is limited to 1000 items.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** This is an
 * internal service-to-service API that requires ASAP authentication. No user permission checks are performed as this
 * bypasses normal user context.
 */
export async function getWorklogsByIssueIdAndWorklogId(
  client: Client,
  parameters: GetWorklogsByIssueIdAndWorklogId,
): Promise<BulkWorklogKeyResponse> {
  const config: SendRequestOptions<BulkWorklogKeyResponse> = {
    url: '/rest/internal/api/latest/worklog/bulk',
    method: 'POST',
    body: {
      requests: parameters.requests,
    },
    schema: BulkWorklogKeyResponseSchema,
  };

  return await client.sendRequest(config);
}
