import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ProjectTypes {
  constructor(private client: Client) {}

  /**
   * Returns all [project types](https://confluence.atlassian.com/x/Var1Nw), whether or not the instance has a valid
   * license for each type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllProjectTypes<T = Models.ProjectType[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all [project types](https://confluence.atlassian.com/x/Var1Nw), whether or not the instance has a valid
   * license for each type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllProjectTypes<T = Models.ProjectType[]>(callback?: never): Promise<T>;
  async getAllProjectTypes<T = Models.ProjectType[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/project/type',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a valid license. */
  async getAllAccessibleProjectTypes<T = Models.ProjectType[]>(callback: Callback<T>): Promise<void>;
  /** Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a valid license. */
  async getAllAccessibleProjectTypes<T = Models.ProjectType[]>(callback?: never): Promise<T>;
  async getAllAccessibleProjectTypes<T = Models.ProjectType[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/project/type/accessible',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getProjectTypeByKey<T = Models.ProjectType>(
    parameters: Parameters.GetProjectTypeByKey | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getProjectTypeByKey<T = Models.ProjectType>(
    parameters: Parameters.GetProjectTypeByKey | string,
    callback?: never,
  ): Promise<T>;
  async getProjectTypeByKey<T = Models.ProjectType>(
    parameters: Parameters.GetProjectTypeByKey | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectTypeKey = typeof parameters === 'string' ? parameters : parameters.projectTypeKey;

    const config: RequestConfig = {
      url: `/rest/api/3/project/type/${projectTypeKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw) if it is accessible to the user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAccessibleProjectTypeByKey<T = Models.ProjectType>(
    parameters: Parameters.GetAccessibleProjectTypeByKey | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw) if it is accessible to the user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAccessibleProjectTypeByKey<T = Models.ProjectType>(
    parameters: Parameters.GetAccessibleProjectTypeByKey | string,
    callback?: never,
  ): Promise<T>;
  async getAccessibleProjectTypeByKey<T = Models.ProjectType>(
    parameters: Parameters.GetAccessibleProjectTypeByKey | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectTypeKey = typeof parameters === 'string' ? parameters : parameters.projectTypeKey;

    const config: RequestConfig = {
      url: `/rest/api/3/project/type/${projectTypeKey}/accessible`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
