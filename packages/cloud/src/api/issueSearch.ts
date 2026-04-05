import { IssuePickerSuggestionsSchema, type IssuePickerSuggestions } from '#/models/issuePickerSuggestions';
import { IssueMatchesSchema, type IssueMatches } from '#/models/issueMatches';
import { JQLCountResultsSchema, type JQLCountResults } from '#/models/jQLCountResults';
import { SearchAndReconcileResultsSchema, type SearchAndReconcileResults } from '#/models/searchAndReconcileResults';
import { type GetIssuePickerResource } from '#/parameters/getIssuePickerResource';
import { type MatchIssues } from '#/parameters/matchIssues';
import { type CountIssues } from '#/parameters/countIssues';
import { type SearchAndReconsileIssuesUsingJql } from '#/parameters/searchAndReconsileIssuesUsingJql';
import { type SearchAndReconsileIssuesUsingJqlPost } from '#/parameters/searchAndReconsileIssuesUsingJqlPost';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the
 * user is looking for an issue using a word or string.
 *
 * This operation returns two lists:
 *
 * - `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain the
 *   string in the `query` parameter.
 * - `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the
 *   `query` parameter.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getIssuePickerResource(
  client: Client,
  parameters?: GetIssuePickerResource,
): Promise<IssuePickerSuggestions> {
  const config: SendRequestOptions<IssuePickerSuggestions> = {
    url: '/rest/api/3/issue/picker',
    method: 'GET',
    searchParams: {
      query: parameters?.query,
      currentJQL: parameters?.currentJQL,
      currentIssueKey: parameters?.currentIssueKey,
      currentProjectId: parameters?.currentProjectId,
      showSubTasks: parameters?.showSubTasks,
      showSubTaskParent: parameters?.showSubTaskParent,
    },
    schema: IssuePickerSuggestionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Checks whether one or more issues would be returned by one or more JQL queries.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None,
 * however, issues are only matched against JQL queries where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function matchIssues(client: Client, parameters: MatchIssues): Promise<IssueMatches> {
  const config: SendRequestOptions<IssueMatches> = {
    url: '/rest/api/3/jql/match',
    method: 'POST',
    body: {
      issueIds: parameters.issueIds,
      jqls: parameters.jqls,
    },
    schema: IssueMatchesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Provide an estimated count of the issues that match the [JQL](https://confluence.atlassian.com/x/egORLQ). Recent
 * updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Issues are
 * included in the response where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 *   issue.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function countIssues(client: Client, parameters: CountIssues): Promise<JQLCountResults> {
  const config: SendRequestOptions<JQLCountResults> = {
    url: '/rest/api/3/search/approximate-count',
    method: 'POST',
    body: {
      jql: parameters.jql,
    },
    schema: JQLCountResultsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
 * visible in the returned search results. If you need
 * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
 * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
 * anonymously.
 *
 * If the JQL query expression is too large to be encoded as a query parameter, use the
 * [POST](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-search/#api-rest-api-3-search-post)
 * version of this resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Issues are
 * included in the response where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 *   issue.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function searchAndReconcileIssuesUsingJql(
  client: Client,
  parameters?: SearchAndReconsileIssuesUsingJql,
): Promise<SearchAndReconcileResults> {
  const config: SendRequestOptions<SearchAndReconcileResults> = {
    url: '/rest/api/3/search/jql',
    method: 'GET',
    searchParams: {
      jql: parameters?.jql,
      nextPageToken: parameters?.nextPageToken,
      maxResults: parameters?.maxResults,
      fields: parameters?.fields,
      expand: parameters?.expand,
      properties: parameters?.properties,
      fieldsByKeys: parameters?.fieldsByKeys,
      failFast: parameters?.failFast,
      reconcileIssues: parameters?.reconcileIssues,
    },
    schema: SearchAndReconcileResultsSchema,
  };

  return await client.sendRequest(config);
}

/** @deprecated Typo in original name. Use `searchAndReconcileIssuesUsingJql` instead. Will be removed in v1.0.0. */
export const searchAndReconsileIssuesUsingJql = searchAndReconcileIssuesUsingJql;

/**
 * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
 * visible in the returned search results. If you need
 * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
 * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
 * anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Issues are
 * included in the response where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 *   issue.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function searchAndReconcileIssuesUsingJqlPost(
  client: Client,
  parameters: SearchAndReconsileIssuesUsingJqlPost,
): Promise<SearchAndReconcileResults> {
  const config: SendRequestOptions<SearchAndReconcileResults> = {
    url: '/rest/api/3/search/jql',
    method: 'POST',
    body: {
      expand: parameters.expand,
      fields: parameters.fields,
      fieldsByKeys: parameters.fieldsByKeys,
      jql: parameters.jql,
      maxResults: parameters.maxResults,
      nextPageToken: parameters.nextPageToken,
      properties: parameters.properties,
      reconcileIssues: parameters.reconcileIssues,
    },
    schema: SearchAndReconcileResultsSchema,
  };

  return await client.sendRequest(config);
}

/** @deprecated Typo in original name. Use `searchAndReconcileIssuesUsingJqlPost` instead. Will be removed in v1.0.0. */
export const searchAndReconsileIssuesUsingJqlPost = searchAndReconcileIssuesUsingJqlPost;
