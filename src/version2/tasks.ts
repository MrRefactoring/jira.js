import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Tasks {
  constructor(private client: Client) { }
  /**
     * Returns the status of a [long-running asynchronous task](#async).
     *
     * When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the operation that created the task for details. Task details are not permanently retained. As of September 2019, details are retained for 14 days although this period may change without notice.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  Creator of the task. */
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback: Callback<T>): Promise<void>;
  /**
     * Returns the status of a [long-running asynchronous task](#async).
     *
     * When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the operation that created the task for details. Task details are not permanently retained. As of September 2019, details are retained for 14 days although this period may change without notice.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  Creator of the task. */
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback?: undefined): Promise<T>;
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/task/${parameters.taskId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getTask' });
  }
  /**
     * Cancels a task.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  Creator of the task. */
  async cancelTask<T = any>(parameters: Parameters.CancelTask, callback: Callback<T>): Promise<void>;
  /**
     * Cancels a task.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  Creator of the task. */
  async cancelTask<T = any>(parameters: Parameters.CancelTask, callback?: undefined): Promise<T>;
  async cancelTask<T = any>(parameters: Parameters.CancelTask, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/task/${parameters.taskId}/cancel`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'cancelTask' });
  }
}
