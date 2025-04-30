import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ProjectKeyAndNameValidation {
  constructor(private client: Client) {}

  /**
   * Validates a project key by confirming the key is a valid string and not in use.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async validateProjectKey<T = Models.ErrorCollection>(
    parameters: Parameters.ValidateProjectKey | string | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Validates a project key by confirming the key is a valid string and not in use.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async validateProjectKey<T = Models.ErrorCollection>(
    parameters?: Parameters.ValidateProjectKey | string,
    callback?: never,
  ): Promise<T>;
  async validateProjectKey<T = Models.ErrorCollection>(
    parameters?: Parameters.ValidateProjectKey | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const key = typeof parameters === 'string' ? parameters : parameters?.key;

    const config: RequestConfig = {
      url: '/rest/api/3/projectvalidate/key',
      method: 'GET',
      params: {
        key,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Validates a project key and, if the key is invalid or in use, generates a valid random string for the project key.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getValidProjectKey<T = string>(
    parameters: Parameters.GetValidProjectKey | string | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Validates a project key and, if the key is invalid or in use, generates a valid random string for the project key.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getValidProjectKey<T = string>(
    parameters?: Parameters.GetValidProjectKey | string,
    callback?: never,
  ): Promise<T>;
  async getValidProjectKey<T = string>(
    parameters?: Parameters.GetValidProjectKey | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const key = typeof parameters === 'string' ? parameters : parameters?.key;

    const config: RequestConfig = {
      url: '/rest/api/3/projectvalidate/validProjectKey',
      method: 'GET',
      params: {
        key,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Checks that a project name isn't in use. If the name isn't in use, the passed string is returned. If the name is in
   * use, this operation attempts to generate a valid project name based on the one supplied, usually by adding a
   * sequence number. If a valid project name cannot be generated, a 404 response is returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getValidProjectName<T = string>(
    parameters: Parameters.GetValidProjectName | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Checks that a project name isn't in use. If the name isn't in use, the passed string is returned. If the name is in
   * use, this operation attempts to generate a valid project name based on the one supplied, usually by adding a
   * sequence number. If a valid project name cannot be generated, a 404 response is returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getValidProjectName<T = string>(
    parameters: Parameters.GetValidProjectName | string,
    callback?: never,
  ): Promise<T>;
  async getValidProjectName<T = string>(
    parameters: Parameters.GetValidProjectName | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const name = typeof parameters === 'string' ? parameters : parameters.name;

    const config: RequestConfig = {
      url: '/rest/api/3/projectvalidate/validProjectName',
      method: 'GET',
      params: {
        name,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
