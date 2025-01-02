import * as Models from './models/index.mjs';
import * as Parameters from './parameters/index.mjs';
import type { Callback } from '@/callback.mjs';
import type { Client } from '../clients/index.mjs';
import type { RequestConfig } from '@/requestConfig.mjs';

export class WorkflowStatusCategories {
  constructor(private client: Client) {}

  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategories<T = Models.StatusCategory[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategories<T = Models.StatusCategory[]>(callback?: never): Promise<T>;
  async getStatusCategories<T = Models.StatusCategory[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/statuscategory',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a status category. Status categories provided a mechanism for categorizing
   * [statuses](#api-rest-api-2-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategory<T = Models.StatusCategory>(
    parameters: Parameters.GetStatusCategory | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a status category. Status categories provided a mechanism for categorizing
   * [statuses](#api-rest-api-2-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getStatusCategory<T = Models.StatusCategory>(
    parameters: Parameters.GetStatusCategory | string,
    callback?: never,
  ): Promise<T>;
  async getStatusCategory<T = Models.StatusCategory>(
    parameters: Parameters.GetStatusCategory | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const idOrKey = typeof parameters === 'string' ? parameters : parameters.idOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/statuscategory/${idOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
