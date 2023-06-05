import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class JqlFunctionsApps {
  constructor(private client: Client) {}

  /**
   * Returns the list of a function's precomputations along with information about when they were created, updated, and
   * last used. Each precomputation has a `value` - the JQL fragment to replace the custom function clause with.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** This
   * API is only accessible to apps and apps can only inspect their own functions.
   */
  async getPrecomputations<T = Models.PageJqlFunctionPrecomputation>(
    parameters: Parameters.GetPrecomputations | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the list of a function's precomputations along with information about when they were created, updated, and
   * last used. Each precomputation has a `value` - the JQL fragment to replace the custom function clause with.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** This
   * API is only accessible to apps and apps can only inspect their own functions.
   */
  async getPrecomputations<T = Models.PageJqlFunctionPrecomputation>(
    parameters?: Parameters.GetPrecomputations,
    callback?: never,
  ): Promise<T>;
  async getPrecomputations<T = Models.PageJqlFunctionPrecomputation>(
    parameters?: Parameters.GetPrecomputations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/function/computation',
      method: 'GET',
      params: {
        functionKey: parameters?.functionKey,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        orderBy: parameters?.orderBy,
        filter: parameters?.filter,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update the precomputation value of a function created by a Forge/Connect app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** An API
   * for apps to update their own precomputations.
   */
  async updatePrecomputations<T = void>(
    parameters: Parameters.UpdatePrecomputations | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update the precomputation value of a function created by a Forge/Connect app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** An API
   * for apps to update their own precomputations.
   */
  async updatePrecomputations<T = void>(parameters?: Parameters.UpdatePrecomputations, callback?: never): Promise<T>;
  async updatePrecomputations<T = void>(
    parameters?: Parameters.UpdatePrecomputations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/function/computation',
      method: 'POST',
      data: {
        values: parameters?.values,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
