import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { Request } from '../request';

export class WorkflowStatusCategories {
  constructor(private client: Client) {}

  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategories<T = Models.StatusCategory[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategories<T = Models.StatusCategory[]>(callback?: never): Promise<T>;
  async getStatusCategories<T = Models.StatusCategory[]>(): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/statuscategory',
      method: 'GET',
    };

    return this.client.sendRequest(config);
  }

  /**
   * Returns a status category. Status categories provided a mechanism for categorizing
   * [statuses](#api-rest-api-3-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategory<T = Models.StatusCategory>(
    parameters: Parameters.GetStatusCategory | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a status category. Status categories provided a mechanism for categorizing
   * [statuses](#api-rest-api-3-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategory<T = Models.StatusCategory>(
    parameters: Parameters.GetStatusCategory | string,
    callback?: never,
  ): Promise<T>;
  async getStatusCategory<T = Models.StatusCategory>(
    parameters: Parameters.GetStatusCategory | string,
  ): Promise<void | T> {
    const idOrKey = typeof parameters === 'string' ? parameters : parameters.idOrKey;

    const config: Request = {
      url: `/rest/api/3/statuscategory/${idOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config);
  }
}
