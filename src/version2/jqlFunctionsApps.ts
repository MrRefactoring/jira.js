import type { Client } from '../client';
import type { Request } from '../request';
import type { GetPrecomputationsParameters } from './parameters/getPrecomputationsParameters';
import type { UpdatePrecomputationsParameters } from './parameters/updatePrecomputationsParameters';
import type { GetPrecomputationsByIDParameters } from './parameters/getPrecomputationsByIDParameters';

export class JQLFunctionsApps {
  constructor(private client: Client) {}
  /**
   * Returns the list of a function's precomputations along with information about when they were created, updated, and
   * last used. Each precomputation has a `value` - the JQL fragment to replace the custom function clause with. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** This
   *   API is only accessible to apps and apps can only inspect their own functions.
   * -
   * - The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async getPrecomputations(parameters: GetPrecomputationsParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/function/computation',
      method: 'GET',
      query: {
        functionKey: parameters.functionKey,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Update the precomputation value of a function created by a Forge/Connect app. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** An API
   *   for apps to update their own precomputations.
   * -
   * - The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updatePrecomputations(parameters: UpdatePrecomputationsParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/function/computation',
      method: 'POST',
      query: {
        skipNotFoundPrecomputations: parameters.skipNotFoundPrecomputations,
      },
      body: {
        values: parameters.values,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns function precomputations by IDs, along with information about when they were created, updated, and last
   * used. Each precomputation has a `value` - the JQL fragment to replace the custom function clause with. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** This
   *   API is only accessible to apps and apps can only inspect their own functions.
   * -
   * - The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async getPrecomputationsByID(parameters: GetPrecomputationsByIDParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/function/computation/search',
      method: 'POST',
      query: {
        orderBy: parameters.orderBy,
      },
      body: {
        precomputationIDs: parameters.precomputationIDs,
      },
    };

    return this.client.sendRequest(request);
  }
}
