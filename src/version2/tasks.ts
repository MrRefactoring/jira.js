import type { Client } from '../client';
import type { Request } from '../request';
import type { GetTaskParameters } from './parameters/getTaskParameters';
import type { CancelTaskParameters } from './parameters/cancelTaskParameters';

export class Tasks {
  constructor(private client: Client) {}
  /**
   * Returns the status of a [long-running asynchronous
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). *
   *
   * - When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the
   *   operation that created the task for details. Task details are not permanently retained. As of September 2019,
   *   details are retained for 14 days although this period may change without notice.
   * -
   * - **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.
   * -
   * - - `read:jira-work`
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either
   *   of:
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - - Creator of the task.
   */
  async getTask(parameters: GetTaskParameters) {
    const request: Request = {
      url: `/rest/api/2/task/${parameters.taskId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Cancels a task. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either
   *   of:
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - - Creator of the task.
   */
  async cancelTask(parameters: CancelTaskParameters) {
    const request: Request = {
      url: `/rest/api/2/task/${parameters.taskId}/cancel`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }
}
