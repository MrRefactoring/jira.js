import {
  PageJqlFunctionPrecomputationSchema,
  type PageJqlFunctionPrecomputation,
} from '#/models/pageJqlFunctionPrecomputation';
import {
  JqlFunctionPrecomputationGetByIdResponseSchema,
  type JqlFunctionPrecomputationGetByIdResponse,
} from '#/models/jqlFunctionPrecomputationGetByIdResponse';
import { type GetPrecomputations } from '#/parameters/getPrecomputations';
import { type UpdatePrecomputations } from '#/parameters/updatePrecomputations';
import { type GetPrecomputationsByID } from '#/parameters/getPrecomputationsByID';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the list of a function's precomputations along with information about when they were created, updated, and
 * last used. Each precomputation has a `value` - the JQL fragment to replace the custom function clause with.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** This API
 * is only accessible to apps and apps can only inspect their own functions.
 *
 * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function getPrecomputations(
  client: Client,
  parameters?: GetPrecomputations,
): Promise<PageJqlFunctionPrecomputation> {
  const config: SendRequestOptions<PageJqlFunctionPrecomputation> = {
    url: '/rest/api/3/jql/function/computation',
    method: 'GET',
    searchParams: {
      functionKey: parameters?.functionKey,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      orderBy: parameters?.orderBy,
    },
    schema: PageJqlFunctionPrecomputationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update the precomputation value of a function created by a Forge/Connect app.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** An API for
 * apps to update their own precomputations.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function updatePrecomputations(client: Client, parameters: UpdatePrecomputations): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/jql/function/computation',
    method: 'POST',
    searchParams: {
      skipNotFoundPrecomputations: parameters.skipNotFoundPrecomputations,
    },
    body: {
      values: parameters.values,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns function precomputations by IDs, along with information about when they were created, updated, and last used.
 * Each precomputation has a `value` - the JQL fragment to replace the custom function clause with.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** This API
 * is only accessible to apps and apps can only inspect their own functions.
 *
 * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function getPrecomputationsByID(
  client: Client,
  parameters: GetPrecomputationsByID,
): Promise<JqlFunctionPrecomputationGetByIdResponse> {
  const config: SendRequestOptions<JqlFunctionPrecomputationGetByIdResponse> = {
    url: '/rest/api/3/jql/function/computation/search',
    method: 'POST',
    searchParams: {
      orderBy: parameters.orderBy,
    },
    body: {
      precomputationIDs: parameters.precomputationIDs,
    },
    schema: JqlFunctionPrecomputationGetByIdResponseSchema,
  };

  return await client.sendRequest(config);
}
