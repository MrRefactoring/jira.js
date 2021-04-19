import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectCategories {
  constructor(private client: Client) { }
  /**
     * Returns all project categories.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getAllProjectCategories<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
     * Returns all project categories.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getAllProjectCategories<T = unknown>(callback?: never): Promise<T>;
  async getAllProjectCategories<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/projectCategory',
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getAllProjectCategories' });
  }
  /**
     * Creates a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createProjectCategory<T = Models.ProjectCategory>(parameters: Parameters.CreateProjectCategory | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Creates a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createProjectCategory<T = Models.ProjectCategory>(parameters?: Parameters.CreateProjectCategory, callback?: never): Promise<T>;
  async createProjectCategory<T = Models.ProjectCategory>(parameters?: Parameters.CreateProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/projectCategory',
      method: 'POST',
      data: {
        self: parameters?.self,
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createProjectCategory' });
  }
  /**
     * Returns a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback: Callback<T>): Promise<void>;
  /**
     * Returns a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback?: never): Promise<T>;
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getProjectCategoryById' });
  }
  /**
     * Updates a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback: Callback<T>): Promise<void>;
  /**
     * Updates a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback?: never): Promise<T>;
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateProjectCategory' });
  }
  /**
     * Deletes a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a project category.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback?: never): Promise<T>;
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'removeProjectCategory' });
  }
}
