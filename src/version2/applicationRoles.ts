import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ApplicationRoles {
  constructor(private client: Client) {}

  /**
   * Returns all application roles. In Jira, application roles are managed using the [Application access
   * configuration](https://confluence.atlassian.com/x/3YxjL) page.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllApplicationRoles<T = Models.ApplicationRole[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all application roles. In Jira, application roles are managed using the [Application access
   * configuration](https://confluence.atlassian.com/x/3YxjL) page.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllApplicationRoles<T = Models.ApplicationRole[]>(callback?: never): Promise<T>;
  async getAllApplicationRoles<T = Models.ApplicationRole[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/applicationrole',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an application role.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApplicationRole<T = Models.ApplicationRole>(
    parameters: Parameters.GetApplicationRole | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns an application role.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApplicationRole<T = Models.ApplicationRole>(
    parameters: Parameters.GetApplicationRole | string,
    callback?: never
  ): Promise<T>;
  async getApplicationRole<T = Models.ApplicationRole>(
    parameters: Parameters.GetApplicationRole | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const key = typeof parameters === 'string' ? parameters : parameters.key;

    const config: RequestConfig = {
      url: `/rest/api/2/applicationrole/${key}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
