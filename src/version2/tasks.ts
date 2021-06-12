import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Tasks {
  constructor(private client: Client) {}

  /**
   * Returns the status of a [long-running asynchronous task](#async).
   *
   * When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the
   * operation that created the task for details. Task details are not permanently retained. As of September 2019,
   * details are retained for 14 days although this period may change without notice.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either of:
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - Creator of the task.
   */
  async getTask<T = Models.TaskProgressBeanObject>(
    parameters: Parameters.GetTask,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the status of a [long-running asynchronous task](#async).
   *
   * When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the
   * operation that created the task for details. Task details are not permanently retained. As of September 2019,
   * details are retained for 14 days although this period may change without notice.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either of:
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - Creator of the task.
   */
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback?: never): Promise<T>;
  async getTask<T = Models.TaskProgressBeanObject>(
    parameters: Parameters.GetTask,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/task/${parameters.taskId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.tasks.getTask' });
  }

  /**
   * Cancels a task.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either of:
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - Creator of the task.
   */
  async cancelTask<T = unknown>(parameters: Parameters.CancelTask, callback: Callback<T>): Promise<void>;
  /**
   * Cancels a task.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either of:
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - Creator of the task.
   */
  async cancelTask<T = unknown>(parameters: Parameters.CancelTask, callback?: never): Promise<T>;
  async cancelTask<T = unknown>(parameters: Parameters.CancelTask, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/task/${parameters.taskId}/cancel`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.tasks.cancelTask' });
  }
}
