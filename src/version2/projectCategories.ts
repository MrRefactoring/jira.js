import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateProjectCategoryParameters } from './parameters/createProjectCategoryParameters';
import type { RemoveProjectCategoryParameters } from './parameters/removeProjectCategoryParameters';
import type { GetProjectCategoryByIdParameters } from './parameters/getProjectCategoryByIdParameters';
import type { UpdateProjectCategoryParameters } from './parameters/updateProjectCategoryParameters';

export class ProjectCategories {
  constructor(private client: Client) {}
  /**
   * Returns all project categories. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getAllProjectCategories() {
    const request: Request = {
      url: '/rest/api/2/projectCategory',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a project category. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectCategory(parameters: CreateProjectCategoryParameters) {
    const request: Request = {
      url: '/rest/api/2/projectCategory',
      method: 'POST',
      body: {
        description: parameters.description,
        id: parameters.id,
        name: parameters.name,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a project category. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeProjectCategory(parameters: RemoveProjectCategoryParameters) {
    const request: Request = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a project category. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getProjectCategoryById(parameters: GetProjectCategoryByIdParameters) {
    const request: Request = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a project category. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateProjectCategory(parameters: UpdateProjectCategoryParameters) {
    const request: Request = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        id: parameters.id,
        name: parameters.name,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(request);
  }
}
