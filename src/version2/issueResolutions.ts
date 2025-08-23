import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateResolutionParameters } from './parameters/createResolutionParameters';
import type { SetDefaultResolutionParameters } from './parameters/setDefaultResolutionParameters';
import type { MoveResolutionsParameters } from './parameters/moveResolutionsParameters';
import type { SearchResolutionsParameters } from './parameters/searchResolutionsParameters';
import type { DeleteResolutionParameters } from './parameters/deleteResolutionParameters';
import type { GetResolutionParameters } from './parameters/getResolutionParameters';
import type { UpdateResolutionParameters } from './parameters/updateResolutionParameters';

export class IssueResolutions {
  constructor(private client: Client) {}
  /**
   * Creates an issue resolution. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createResolution(parameters: CreateResolutionParameters) {
    const request: Request = {
      url: '/rest/api/2/resolution',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets default issue resolution. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultResolution(parameters: SetDefaultResolutionParameters) {
    const request: Request = {
      url: '/rest/api/2/resolution/default',
      method: 'PUT',
      body: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Changes the order of issue resolutions. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveResolutions(parameters: MoveResolutionsParameters) {
    const request: Request = {
      url: '/rest/api/2/resolution/move',
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
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * resolutions. The list can contain all resolutions or a subset determined by any combination of these criteria: *
   *
   * - - A list of resolutions IDs.
   * - - Whether the field configuration is a default. This returns resolutions from company-managed (classic) projects
   *       only, as there is no concept of default resolutions in team-managed projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async searchResolutions(parameters: SearchResolutionsParameters) {
    const request: Request = {
      url: '/rest/api/2/resolution/search',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        onlyDefault: parameters.onlyDefault,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue resolution. *
   *
   * - This operation is
   *   [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteResolution(parameters: DeleteResolutionParameters) {
    const request: Request = {
      url: `/rest/api/2/resolution/${parameters.id}`,
      method: 'DELETE',
      query: {
        replaceWith: parameters.replaceWith,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an issue resolution value. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getResolution(parameters: GetResolutionParameters) {
    const request: Request = {
      url: `/rest/api/2/resolution/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates an issue resolution. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateResolution(parameters: UpdateResolutionParameters) {
    const request: Request = {
      url: `/rest/api/2/resolution/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }
}
