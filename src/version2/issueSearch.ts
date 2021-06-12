import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueSearch {
  constructor(private client: Client) {}

  /**
   * Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the
   * user is looking for an issue using a word or string.
   *
   * This operation returns two lists:
   *
   * - `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain
   *   the string in the `query` parameter.
   * - `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the
   *   `query` parameter.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(
    parameters: Parameters.GetIssuePickerResource | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the
   * user is looking for an issue using a word or string.
   *
   * This operation returns two lists:
   *
   * - `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain
   *   the string in the `query` parameter.
   * - `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the
   *   `query` parameter.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(
    parameters?: Parameters.GetIssuePickerResource,
    callback?: never
  ): Promise<T>;
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(
    parameters?: Parameters.GetIssuePickerResource,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/picker',
      method: 'GET',
      params: {
        query: parameters?.query,
        currentJQL: parameters?.currentJQL,
        currentIssueKey: parameters?.currentIssueKey,
        currentProjectId: parameters?.currentProjectId,
        showSubTasks: parameters?.showSubTasks,
        showSubTaskParent: parameters?.showSubTaskParent,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueSearch.getIssuePickerResource' });
  }

  /**
   * Checks whether one or more issues would be returned by one or more JQL queries.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, issues are only matched against JQL queries where the user has:
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async matchIssues<T = Models.IssueMatches>(
    parameters: Parameters.MatchIssues | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Checks whether one or more issues would be returned by one or more JQL queries.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, issues are only matched against JQL queries where the user has:
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async matchIssues<T = Models.IssueMatches>(parameters?: Parameters.MatchIssues, callback?: never): Promise<T>;
  async matchIssues<T = Models.IssueMatches>(
    parameters?: Parameters.MatchIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/match',
      method: 'POST',
      data: {
        jqls: parameters?.jqls,
        issueIds: parameters?.issueIds,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueSearch.matchIssues' });
  }

  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   * If the JQL query expression is too large to be encoded as a query parameter, use the
   * [POST](#api-rest-api-2-search-post) version of this resource.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJql<T = Models.SearchResults>(
    parameters: Parameters.SearchForIssuesUsingJql | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   * If the JQL query expression is too large to be encoded as a query parameter, use the
   * [POST](#api-rest-api-2-search-post) version of this resource.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJql<T = Models.SearchResults>(
    parameters?: Parameters.SearchForIssuesUsingJql,
    callback?: never
  ): Promise<T>;
  async searchForIssuesUsingJql<T = Models.SearchResults>(
    parameters?: Parameters.SearchForIssuesUsingJql,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/search',
      method: 'GET',
      params: {
        jql: parameters?.jql,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        validateQuery: parameters?.validateQuery,
        fields: parameters?.fields,
        expand: parameters?.expand,
        properties: parameters?.properties,
        fieldsByKeys: parameters?.fieldsByKeys,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueSearch.searchForIssuesUsingJql' });
  }

  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   * There is a [GET](#api-rest-api-2-search-get) version of this resource that can be used for smaller JQL query expressions.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(
    parameters: Parameters.SearchForIssuesUsingJqlPost | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   * There is a [GET](#api-rest-api-2-search-get) version of this resource that can be used for smaller JQL query expressions.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(
    parameters?: Parameters.SearchForIssuesUsingJqlPost,
    callback?: never
  ): Promise<T>;
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(
    parameters?: Parameters.SearchForIssuesUsingJqlPost,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/search',
      method: 'POST',
      data: {
        jql: parameters?.jql,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        fields: parameters?.fields,
        validateQuery: parameters?.validateQuery,
        expand: parameters?.expand,
        properties: parameters?.properties,
        fieldsByKeys: parameters?.fieldsByKeys,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueSearch.searchForIssuesUsingJqlPost',
    });
  }
}
