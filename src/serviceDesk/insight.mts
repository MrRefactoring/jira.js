import * as Models from './models/index.mjs';
import * as Parameters from './parameters/index.mjs';
import type { Callback } from '@/callback.mjs';
import type { Client } from '../clients/index.mjs';
import type { RequestConfig } from '@/requestConfig.mjs';

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
