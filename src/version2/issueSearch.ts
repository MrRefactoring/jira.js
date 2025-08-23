import type { Client } from '../client';
import type { Request } from '../request';
import type { GetIssuePickerResourceParameters } from './parameters/getIssuePickerResourceParameters';
import type { MatchIssuesParameters } from './parameters/matchIssuesParameters';
import type { CountIssuesParameters } from './parameters/countIssuesParameters';
import type { SearchAndReconsileIssuesUsingJqlParameters } from './parameters/searchAndReconsileIssuesUsingJqlParameters';
import type { SearchAndReconsileIssuesUsingJqlPostParameters } from './parameters/searchAndReconsileIssuesUsingJqlPostParameters';

export class IssueSearch {
  constructor(private client: Client) {}
  /**
   * Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the
   * user is looking for an issue using a word or string. *
   *
   * - This operation returns two lists:
   * -
   * - - `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain
   *       the string in the `query` parameter.
   * - - `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the
   *       `query` parameter.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssuePickerResource(parameters: GetIssuePickerResourceParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/picker',
      method: 'GET',
      query: {
        query: parameters.query,
        currentJQL: parameters.currentJQL,
        currentIssueKey: parameters.currentIssueKey,
        currentProjectId: parameters.currentProjectId,
        showSubTasks: parameters.showSubTasks,
        showSubTaskParent: parameters.showSubTaskParent,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Checks whether one or more issues would be returned by one or more JQL queries. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, issues are only matched against JQL queries where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async matchIssues(parameters: MatchIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/match',
      method: 'POST',
      body: {
        issueIds: parameters.issueIds,
        jqls: parameters.jqls,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Provide an estimated count of the issues that match the [JQL](https://confluence.atlassian.com/x/egORLQ). Recent
   * updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async countIssues(parameters: CountIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/search/approximate-count',
      method: 'POST',
      body: {
        jql: parameters.jql,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
   * visible in the returned search results. If you need
   * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
   * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
   * anonymously. *
   *
   * - If the JQL query expression is too large to be encoded as a query parameter, use the
   *   [POST](#api-rest-api-2-search-post) version of this resource.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchAndReconsileIssuesUsingJql(parameters: SearchAndReconsileIssuesUsingJqlParameters) {
    const request: Request = {
      url: '/rest/api/2/search/jql',
      method: 'GET',
      query: {
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

    return this.client.sendRequest(request);
  }

  /**
   * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately
   * visible in the returned search results. If you need
   * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can
   * utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed
   * anonymously. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async searchAndReconsileIssuesUsingJqlPost(parameters: SearchAndReconsileIssuesUsingJqlPostParameters) {
    const request: Request = {
      url: '/rest/api/2/search/jql',
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
    };

    return this.client.sendRequest(request);
  }
}
