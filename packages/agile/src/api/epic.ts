import { SearchResultsSchema, type SearchResults } from '#/models/searchResults';
import { EpicSchema, type Epic } from '#/models/epic';
import { type GetIssuesWithoutEpic } from '#/parameters/getIssuesWithoutEpic';
import { type RemoveIssuesFromEpic } from '#/parameters/removeIssuesFromEpic';
import { type GetEpic } from '#/parameters/getEpic';
import { type PartiallyUpdateEpic } from '#/parameters/partiallyUpdateEpic';
import { type GetIssuesForEpic } from '#/parameters/getIssuesForEpic';
import { type MoveIssuesToEpic } from '#/parameters/moveIssuesToEpic';
import { type RankEpics } from '#/parameters/rankEpics';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns all issues that do not belong to any epic. This only includes issues that the user has permission to view.
 * Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default,
 * the returned issues are ordered by rank. **Note:** If you are querying a next-gen project, do not use this operation.
 * Instead, search for issues that don't belong to an epic by using the [Search for issues using
 * JQL](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get) operation in the Jira
 * platform REST API. Build your JQL query using the `parent is empty` clause. For more information on the `parent` JQL
 * field, see [Advanced searching](https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).
 */
export async function getIssuesWithoutEpic(client: Client, parameters?: GetIssuesWithoutEpic): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: '/rest/agile/1.0/epic/none/issue',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      jql: parameters?.jql,
      validateQuery: parameters?.validateQuery,
      fields: parameters?.fields,
      expand: parameters?.expand,
    },
    schema: SearchResultsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes issues from epics. The user needs to have the edit issue permission for all issue they want to remove from
 * epics. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation does not work
 * for epics in next-gen projects. Instead, update the issue using `\{ fields: \{ parent: \{\} \} \}`
 */
export async function removeIssuesFromEpic(client: Client, parameters: RemoveIssuesFromEpic): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/agile/1.0/epic/none/issue',
    method: 'POST',
    body: {
      issues: parameters.issues,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it.
 * **Note:** This operation does not work for epics in next-gen projects.
 */
export async function getEpic(client: Client, parameters: GetEpic): Promise<Epic> {
  const config: SendRequestOptions<Epic> = {
    url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}`,
    method: 'GET',
    schema: EpicSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Performs a partial update of the epic. A partial update means that fields not present in the request JSON will not be
 * updated. Valid values for color are `color_1` to `color_9`. **Note:** This operation does not work for epics in
 * next-gen projects.
 */
export async function partiallyUpdateEpic(client: Client, parameters: PartiallyUpdateEpic): Promise<Epic> {
  const config: SendRequestOptions<Epic> = {
    url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}`,
    method: 'POST',
    body: {
      color: parameters.color,
      done: parameters.done,
      name: parameters.name,
      summary: parameters.summary,
    },
    schema: EpicSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all issues that belong to the epic, for the given epic ID. This only includes issues that the user has
 * permission to view. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and
 * epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a next-gen project, do not
 * use this operation. Instead, search for issues that belong to an epic by using the [Search for issues using
 * JQL](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get) operation in the Jira
 * platform REST API. Build your JQL query using the `parent` clause. For more information on the `parent` JQL field,
 * see [Advanced searching](https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).
 */
export async function getIssuesForEpic(client: Client, parameters: GetIssuesForEpic): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      jql: parameters.jql,
      validateQuery: parameters.validateQuery,
      fields: parameters.fields,
      expand: parameters.expand,
    },
    schema: SearchResultsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Moves issues to an epic, for a given epic id. Issues can be only in a single epic at the same time. That means that
 * already assigned issues to an epic, will not be assigned to the previous epic anymore. The user needs to have the
 * edit issue permission for all issue they want to move and to the epic. The maximum number of issues that can be moved
 * in one operation is 50. **Note:** This operation does not work for epics in next-gen projects.
 */
export async function moveIssuesToEpic(client: Client, parameters: MoveIssuesToEpic): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
    method: 'POST',
    body: {
      issues: parameters.issues,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Moves (ranks) an epic before or after a given epic.
 *
 * If rankCustomFieldId is not defined, the default rank field will be used.
 *
 * **Note:** This operation does not work for epics in next-gen projects.
 */
export async function rankEpics(client: Client, parameters: RankEpics): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}/rank`,
    method: 'PUT',
    body: {
      rankAfterEpic: parameters.rankAfterEpic,
      rankBeforeEpic: parameters.rankBeforeEpic,
      rankCustomFieldId: parameters.rankCustomFieldId,
    },
  };

  return await client.sendRequest(config);
}
