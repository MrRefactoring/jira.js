import {
  ForgePanelProjectPinAsyncResponseSchema,
  type ForgePanelProjectPinAsyncResponse,
} from '#/models/forgePanelProjectPinAsyncResponse';
import { type BulkPinUnpinProjectsAsync } from '#/parameters/bulkPinUnpinProjectsAsync';
import { type Client, type SendRequestOptions } from '@jira.js/base';

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
): Promise<ForgePanelProjectPinAsyncResponse> {
  const config: SendRequestOptions<ForgePanelProjectPinAsyncResponse> = {
    url: '/rest/api/3/forge/panel/action/bulk/async',
    method: 'POST',
    body: {
      moduleId: parameters.moduleId,
      projectList: parameters.projectList,
    },
    schema: ForgePanelProjectPinAsyncResponseSchema,
  };

  return await client.sendRequest(config);
}
