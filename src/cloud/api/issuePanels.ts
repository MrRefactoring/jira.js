import {
  ForgePanelProjectPinAsyncResponseSchema,
  type ForgePanelProjectPinAsyncResponse,
} from '../models/forgePanelProjectPinAsyncResponse';
import {
  ForgePanelProjectPinStatusResponseSchema,
  type ForgePanelProjectPinStatusResponse,
} from '../models/forgePanelProjectPinStatusResponse';
import type { BulkPinUnpinProjectsAsync } from '../parameters/bulkPinUnpinProjectsAsync';
import type { GetBulkPinStatus } from '../parameters/getBulkPinStatus';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Bulk pin or unpin an issue panel (added by a Forge app) to or from multiple projects.
 *
 * The operation runs asynchronously. The response includes a task ID - use the [Get
 * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-task/#api-rest-api-3-task-taskId-get)
 * endpoint to check progress.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function bulkPinUnpinProjectsAsync(
  client: Client,
  parameters: BulkPinUnpinProjectsAsync,
  options?: RequestOptions,
): Promise<ForgePanelProjectPinAsyncResponse> {
  const config: SendRequestOptions<ForgePanelProjectPinAsyncResponse> = {
    url: '/rest/api/3/forge/panel/action/bulk/async',
    method: 'POST',
    body: {
      moduleId: parameters.moduleId,
      projectList: parameters.projectList,
    },
    schema: ForgePanelProjectPinAsyncResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get the pin status of an issue panel (added by a Forge app) for multiple projects.
 *
 * The operation is read-only and runs synchronously. Projects that do not exist, or that you do not have permission to
 * access, are returned in the response with the panel reported as not pinned and the reason in the `error` field; the
 * request itself still succeeds.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getBulkPinStatus(
  client: Client,
  parameters: GetBulkPinStatus,
  options?: RequestOptions,
): Promise<ForgePanelProjectPinStatusResponse> {
  const config: SendRequestOptions<ForgePanelProjectPinStatusResponse> = {
    url: '/rest/api/3/forge/panel/action/bulk/status',
    method: 'POST',
    body: {
      moduleId: parameters.moduleId,
      projectList: parameters.projectList,
    },
    schema: ForgePanelProjectPinStatusResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
