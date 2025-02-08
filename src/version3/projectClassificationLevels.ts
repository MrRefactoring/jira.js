import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectClassificationLevels {
  constructor(private client: Client) {}

  /**
   * Returns the default data classification for a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultProjectClassification<T = unknown>(
    parameters: Parameters.GetDefaultProjectClassification,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the default data classification for a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultProjectClassification<T = unknown>(
    parameters: Parameters.GetDefaultProjectClassification,
    callback?: never,
  ): Promise<T>;
  async getDefaultProjectClassification<T = unknown>(
    parameters: Parameters.GetDefaultProjectClassification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/classification-level/default`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the default data classification level for a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultProjectClassification<T = void>(
    parameters: Parameters.UpdateDefaultProjectClassification,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the default data classification level for a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultProjectClassification<T = void>(
    parameters: Parameters.UpdateDefaultProjectClassification,
    callback?: never,
  ): Promise<T>;
  async updateDefaultProjectClassification<T = void>(
    parameters: Parameters.UpdateDefaultProjectClassification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/classification-level/default`,
      method: 'PUT',
      data: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Remove the default data classification level for a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeDefaultProjectClassification<T = void>(
    parameters: Parameters.RemoveDefaultProjectClassification,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Remove the default data classification level for a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeDefaultProjectClassification<T = void>(
    parameters: Parameters.RemoveDefaultProjectClassification,
    callback?: never,
  ): Promise<T>;
  async removeDefaultProjectClassification<T = void>(
    parameters: Parameters.RemoveDefaultProjectClassification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/classification-level/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
