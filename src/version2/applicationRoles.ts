import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ApplicationRoles {
  constructor(private client: Client) { }
  /**
     * Returns all application roles. In Jira, application roles are managed using the [Application access configuration](https://confluence.atlassian.com/x/3YxjL) page.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllApplicationRoles<T = unknown>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns all application roles. In Jira, application roles are managed using the [Application access configuration](https://confluence.atlassian.com/x/3YxjL) page.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllApplicationRoles<T = unknown>(callback?: undefined): Promise<T>;
  async getAllApplicationRoles<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/applicationrole',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAllApplicationRoles' });
  }
  /**
     * Returns an application role.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getApplicationRole<T = Models.ApplicationRole>(parameters: Parameters.GetApplicationRole, callback: Callback<T>): Promise<void>;
  /**
     * Returns an application role.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getApplicationRole<T = Models.ApplicationRole>(parameters: Parameters.GetApplicationRole, callback?: undefined): Promise<T>;
  async getApplicationRole<T = Models.ApplicationRole>(parameters: Parameters.GetApplicationRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/applicationrole/${parameters.key}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getApplicationRole' });
  }
}
