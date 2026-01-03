import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(
    parameters: Parameters.GetIssuePickerResource | undefined,
    callback: Callback<T>,
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(
    parameters?: Parameters.GetIssuePickerResource,
    callback?: never,
  ): Promise<T>;
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(
    parameters?: Parameters.GetIssuePickerResource,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issue/picker',
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

    return this.client.sendRequest(config, callback);
  }

  /**
   * Checks whether one or more issues would be returned by one or more JQL queries.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
   * however, issues are only matched against JQL queries where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async matchIssues<T = Models.IssueMatches>(parameters: Parameters.MatchIssues, callback: Callback<T>): Promise<void>;
  /**
   * Checks whether one or more issues would be returned by one or more JQL queries.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
   * however, issues are only matched against JQL queries where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async matchIssues<T = Models.IssueMatches>(parameters: Parameters.MatchIssues, callback?: never): Promise<T>;
  async matchIssues<T = Models.IssueMatches>(
    parameters: Parameters.MatchIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/jql/match',
      method: 'POST',
      data: {
        issueIds: parameters.issueIds,
        jqls: parameters.jqls,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Use {@link searchForIssuesUsingJqlEnhancedSearch} instead. Endpoint is currently being removed. [More
   *   details](https://developer.atlassian.com/changelog/#CHANGE-2046)
   *
   *   Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   *   If the JQL query expression is too large to be encoded as a query parameter, use the
   *   [POST](#api-rest-api-3-search-post) version of this resource.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   *   - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchForIssuesUsingJql<T = Models.SearchResults>(
    parameters: Parameters.SearchForIssuesUsingJql,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated Use {@link searchForIssuesUsingJqlEnhancedSearch} instead. Endpoint is currently being removed. [More
   *   details](https://developer.atlassian.com/changelog/#CHANGE-2046)
   *
   *   Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   *   If the JQL query expression is too large to be encoded as a query parameter, use the
   *   [POST](#api-rest-api-3-search-post) version of this resource.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   *   - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchForIssuesUsingJql<T = Models.SearchResults>(
    parameters: Parameters.SearchForIssuesUsingJql,
    callback?: never,
  ): Promise<T>;
  async searchForIssuesUsingJql<T = Models.SearchResults>(
    parameters: Parameters.SearchForIssuesUsingJql,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/search',
      method: 'GET',
      params: {
        jql: parameters.jql,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
        properties: parameters.properties,
        fieldsByKeys: parameters.fieldsByKeys,
        failFast: parameters.failFast,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Use {@link searchForIssuesUsingJqlEnhancedSearchPost} instead. Endpoint is currently being removed.
   *   [More details](https://developer.atlassian.com/changelog/#CHANGE-2046)
   *
   *   Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   *   There is a [GET](#api-rest-api-3-search-get) version of this resource that can be used for smaller JQL query
   *   expressions.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   *   - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(
    parameters: Parameters.SearchForIssuesUsingJqlPost | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated Use {@link searchForIssuesUsingJqlEnhancedSearchPost} instead. Endpoint is currently being removed.
   *   [More details](https://developer.atlassian.com/changelog/#CHANGE-2046)
   *
   *   Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   *   There is a [GET](#api-rest-api-3-search-get) version of this resource that can be used for smaller JQL query
   *   expressions.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   *   - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(
    parameters?: Parameters.SearchForIssuesUsingJqlPost,
    callback?: never,
  ): Promise<T>;
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(
    parameters?: Parameters.SearchForIssuesUsingJqlPost,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/search',
      method: 'POST',
      data: {
        expand: parameters?.expand,
        fields: parameters?.fields,
        fieldsByKeys: parameters?.fieldsByKeys,
        jql: parameters?.jql,
        maxResults: parameters?.maxResults,
        properties: parameters?.properties,
        startAt: parameters?.startAt,
        validateQuery: parameters?.validateQuery,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Provide an estimated count of the issues that match the [JQL](https://confluence.atlassian.com/x/egORLQ). Recent
   * updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async countIssues<T = Models.JQLCount>(parameters: Parameters.CountIssues, callback: Callback<T>): Promise<void>;
  /**
   * Provide an estimated count of the issues that match the [JQL](https://confluence.atlassian.com/x/egORLQ). Recent
   * updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async countIssues<T = Models.JQLCount>(parameters: Parameters.CountIssues, callback?: never): Promise<T>;
  async countIssues<T = Models.JQLCount>(
    parameters: Parameters.CountIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/search/approximate-count',
      method: 'POST',
      data: {
        jql: parameters.jql,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated This endpoint is no longer supported and may be removed in a future version.
   *
   *   Searches for IDs of issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   *   Use the [Search](#api-rest-api-3-search-post) endpoint if you need to fetch more than just issue IDs. The Search
   *   endpoint returns more information, but may take much longer to respond to requests. This is because it uses a
   *   different mechanism for ordering results than this endpoint and doesn't provide the total number of results for
   *   your query.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   *   - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchForIssuesIds<T = Models.IdSearchResults>(
    parameters: Parameters.SearchForIssuesIds,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This endpoint is no longer supported and may be removed in a future version.
   *
   *   Searches for IDs of issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
   *
   *   Use the [Search](#api-rest-api-3-search-post) endpoint if you need to fetch more than just issue IDs. The Search
   *   endpoint returns more information, but may take much longer to respond to requests. This is because it uses a
   *   different mechanism for ordering results than this endpoint and doesn't provide the total number of results for
   *   your query.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   *   - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchForIssuesIds<T = Models.IdSearchResults>(
    parameters: Parameters.SearchForIssuesIds,
    callback?: never,
  ): Promise<T>;
  async searchForIssuesIds<T = Models.IdSearchResults>(
    parameters: Parameters.SearchForIssuesIds,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/search/id',
      method: 'POST',
      data: {
        jql: parameters.jql,
        maxResults: parameters.maxResults,
        nextPageToken: parameters.nextPageToken,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
   * visible in the returned search results. If you need
   * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
   * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
   * anonymously.
   *
   * If the JQL query expression is too large to be encoded as a query parameter, use the
   * [POST](#api-rest-api-3-search-post) version of this resource.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJqlEnhancedSearch<T = Models.SearchAndReconcileResults>(
    parameters: Parameters.SearchForIssuesUsingJqlEnhancedSearch,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
   * visible in the returned search results. If you need
   * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
   * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
   * anonymously.
   *
   * If the JQL query expression is too large to be encoded as a query parameter, use the
   * [POST](#api-rest-api-3-search-post) version of this resource.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJqlEnhancedSearch<T = Models.SearchAndReconcileResults>(
    parameters: Parameters.SearchForIssuesUsingJqlEnhancedSearch,
    callback?: never,
  ): Promise<T>;
  async searchForIssuesUsingJqlEnhancedSearch<T = Models.SearchAndReconcileResults>(
    parameters: Parameters.SearchForIssuesUsingJqlEnhancedSearch,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/search/jql',
      method: 'GET',
      params: {
        jql: parameters.jql,
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
        fields: parameters.fields,
        expand: parameters.expand,
        properties: parameters.properties,
        fieldsByKeys: parameters.fieldsByKeys,
        failFast: parameters.failFast,
        reconcileIssues: parameters.reconcileIssues,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
   * visible in the returned search results. If you need
   * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
   * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
   * anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJqlEnhancedSearchPost<T = Models.SearchAndReconcileResults>(
    parameters: Parameters.SearchForIssuesUsingJqlEnhancedSearchPost,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
   * visible in the returned search results. If you need
   * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
   * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
   * anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async searchForIssuesUsingJqlEnhancedSearchPost<T = Models.SearchAndReconcileResults>(
    parameters: Parameters.SearchForIssuesUsingJqlEnhancedSearchPost,
    callback?: never,
  ): Promise<T>;
  async searchForIssuesUsingJqlEnhancedSearchPost<T = Models.SearchAndReconcileResults>(
    parameters: Parameters.SearchForIssuesUsingJqlEnhancedSearchPost,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/search/jql',
      method: 'POST',
      data: {
        expand: parameters.expand,
        fields: parameters.fields,
        fieldsByKeys: parameters.fieldsByKeys,
        jql: parameters.jql,
        maxResults: parameters.maxResults,
        nextPageToken: parameters.nextPageToken,
        properties: parameters.properties,
        reconcileIssues: parameters.reconcileIssues,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
