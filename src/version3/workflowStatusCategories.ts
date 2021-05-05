import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatusCategories {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategories<T = Models.StatusCategory[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategories<T = Models.StatusCategory[]>(callback?: never): Promise<T>;
  async getStatusCategories<T = Models.StatusCategory[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuscategory',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowStatusCategories.getStatusCategories' });
  }

  /**
   * Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-3-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback: Callback<T>): Promise<void>;
  /**
   * Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-3-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: never): Promise<T>;
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/statuscategory/${parameters.idOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowStatusCategories.getStatusCategory' });
  }
}
