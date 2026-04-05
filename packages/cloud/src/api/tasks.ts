import { TaskProgressObjectSchema, type TaskProgressObject } from '#/models/taskProgressObject';
import { type GetTask } from '#/parameters/getTask';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the status of a [long-running asynchronous
 * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async).
 *
 * When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the
 * operation that created the task for details. Task details are not permanently retained. As of September 2019, details
 * are retained for 14 days although this period may change without notice.
 *
 * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.
 *
 * - `read:jira-work`
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** either of:
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 * - Creator of the task.
 */
export async function getTask(client: Client, parameters: GetTask): Promise<TaskProgressObject> {
  const config: SendRequestOptions<TaskProgressObject> = {
    url: `/rest/api/3/task/${parameters.taskId}`,
    method: 'GET',
    schema: TaskProgressObjectSchema,
  };

  return await client.sendRequest(config);
}
