import type { Client } from '../client';
import type { Request } from '../request';
import type { GetStatusParameters } from './parameters/getStatusParameters';

export class WorkflowStatuses {
  constructor(private client: Client) {}
  /**
   * Returns a list of all statuses associated with active workflows. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - [Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required: _Browse
   *   projects_ [project
   *   permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the
   *   project.
   */
  async getStatuses() {
    const request: Request = {
      url: '/rest/api/2/status',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a status. The status must be associated with an active workflow to be returned. *
   *
   * - If a name is used on more than one status, only the status found first is returned. Therefore, identifying the
   *   status by its ID may be preferable.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - [Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required: _Browse
   *   projects_ [project
   *   permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the
   *   project.
   */
  async getStatus(parameters: GetStatusParameters) {
    const request: Request = {
      url: `/rest/api/2/status/${parameters.idOrName}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
