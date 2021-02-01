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
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getAllProjectCategories<T = any>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns all project categories.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getAllProjectCategories<T = any>(callback?: undefined): Promise<T>;
  async getAllProjectCategories<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/projectCategory',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAllProjectCategories' });
  }
  /**
     * Creates a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createProjectCategory<T = Models.ProjectCategory>(parameters?: Parameters.CreateProjectCategory, callback?: Callback<T>): Promise<void>;
  /**
     * Creates a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createProjectCategory<T = Models.ProjectCategory>(parameters?: Parameters.CreateProjectCategory, callback?: undefined): Promise<T>;
  async createProjectCategory<T = Models.ProjectCategory>(parameters?: Parameters.CreateProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/projectCategory',
      method: 'POST',
      data: {
        self: parameters?.self,
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'createProjectCategory' });
  }
  /**
     * Returns a project category.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback: Callback<T>): Promise<void>;
  /**
     * Returns a project category.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback?: undefined): Promise<T>;
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getProjectCategoryById' });
  }
  /**
     * Updates a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback: Callback<T>): Promise<void>;
  /**
     * Updates a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback?: undefined): Promise<T>;
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'updateProjectCategory' });
  }
  /**
     * Deletes a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback?: undefined): Promise<T>;
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'removeProjectCategory' });
  }
}
