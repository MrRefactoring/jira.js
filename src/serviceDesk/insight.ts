import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class Insight {
  constructor(private client: Client) {}

  /**
   * Returns a list of Insight workspace IDs. Include a workspace ID in the path to access the [Insight REST
   * APIs](https://developer.atlassian.com/cloud/insight/rest).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   */
  async getInsightWorkspaces<T = Models.PagedInsightWorkspace>(
    parameters: Parameters.GetInsightWorkspaces | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of Insight workspace IDs. Include a workspace ID in the path to access the [Insight REST
   * APIs](https://developer.atlassian.com/cloud/insight/rest).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   */
  async getInsightWorkspaces<T = Models.PagedInsightWorkspace>(
    parameters?: Parameters.GetInsightWorkspaces,
    callback?: never,
  ): Promise<T>;
  async getInsightWorkspaces<T = Models.PagedInsightWorkspace>(
    parameters?: Parameters.GetInsightWorkspaces,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/insight/workspace',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
