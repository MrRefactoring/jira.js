import type { Client } from '../client';
import type { Request } from '../request';
import type { SetDefaultPriorityParameters } from './parameters/setDefaultPriorityParameters';
import type { MovePrioritiesParameters } from './parameters/movePrioritiesParameters';
import type { DeletePriorityParameters } from './parameters/deletePriorityParameters';
import type { GetPriorityParameters } from './parameters/getPriorityParameters';

export class IssuePriorities {
  constructor(private client: Client) {}
  /**
   * Sets default issue priority. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultPriority(parameters: SetDefaultPriorityParameters) {
    const request: Request = {
      url: '/rest/api/2/priority/default',
      method: 'PUT',
      body: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Changes the order of issue priorities. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async movePriorities(parameters: MovePrioritiesParameters) {
    const request: Request = {
      url: '/rest/api/2/priority/move',
      method: 'PUT',
      body: {
        after: parameters.after,
        ids: parameters.ids,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue priority. *
   *
   * - This operation is
   *   [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePriority(parameters: DeletePriorityParameters) {
    const request: Request = {
      url: `/rest/api/2/priority/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an issue priority. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getPriority(parameters: GetPriorityParameters) {
    const request: Request = {
      url: `/rest/api/2/priority/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
