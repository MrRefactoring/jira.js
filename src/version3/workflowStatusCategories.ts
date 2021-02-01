import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatusCategories {
  constructor(private client: Client) { }
  /**
     * Returns a list of all status categories.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getStatusCategories<T = any>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns a list of all status categories.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getStatusCategories<T = any>(callback?: undefined): Promise<T>;
  async getStatusCategories<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/statuscategory',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getStatusCategories' });
  }
  /**
     * Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-3-status-idOrName-get).
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback: Callback<T>): Promise<void>;
  /**
     * Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-3-status-idOrName-get).
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: undefined): Promise<T>;
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/statuscategory/${parameters.idOrKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getStatusCategory' });
  }
}
