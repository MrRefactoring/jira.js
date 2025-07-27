import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { Request } from '../request';

export class ProjectCategories {
  constructor(private client: Client) {}

  /**
   * Returns all project categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAllProjectCategories<T = Models.ProjectCategory[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all project categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAllProjectCategories<T = Models.ProjectCategory[]>(callback?: never): Promise<T>;
  async getAllProjectCategories<T = Models.ProjectCategory[]>(): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/2/projectCategory',
      method: 'GET',
    };

    return this.client.sendRequest(config);
  }

  /**
   * Creates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectCategory<T = Models.ProjectCategory>(
    parameters: Parameters.CreateProjectCategory,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectCategory<T = Models.ProjectCategory>(
    parameters: Parameters.CreateProjectCategory,
    callback?: never,
  ): Promise<T>;
  async createProjectCategory<T = Models.ProjectCategory>(
    parameters: Parameters.CreateProjectCategory,
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/2/projectCategory',
      method: 'POST',
      body: {
        description: parameters.description,
        id: parameters.id,
        name: parameters.name,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Returns a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getProjectCategoryById<T = Models.ProjectCategory>(
    parameters: Parameters.GetProjectCategoryById | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getProjectCategoryById<T = Models.ProjectCategory>(
    parameters: Parameters.GetProjectCategoryById | string,
    callback?: never,
  ): Promise<T>;
  async getProjectCategoryById<T = Models.ProjectCategory>(
    parameters: Parameters.GetProjectCategoryById | string,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: Request = {
      url: `/rest/api/2/projectCategory/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config);
  }

  /**
   * Updates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(
    parameters: Parameters.UpdateProjectCategory,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(
    parameters: Parameters.UpdateProjectCategory,
    callback?: never,
  ): Promise<T>;
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(
    parameters: Parameters.UpdateProjectCategory,
  ): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'PUT',
      body: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Deletes a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeProjectCategory<T = void>(
    parameters: Parameters.RemoveProjectCategory | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeProjectCategory<T = void>(
    parameters: Parameters.RemoveProjectCategory | string,
    callback?: never,
  ): Promise<T>;
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory | string): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: Request = {
      url: `/rest/api/2/projectCategory/${id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config);
  }
}
