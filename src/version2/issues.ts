import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class Issues {
  constructor(private client: Client) {}

  /**
   * Bulk fetch changelogs for multiple issues and filter by fields
   *
   * Returns a paginated list of all changelogs for given issues sorted by changelog date and issue IDs, starting from
   * the oldest changelog and smallest issue ID.
   *
   * Issues are identified by their ID or key, and optionally changelogs can be filtered by their field IDs. You can
   * request the changelogs of up to 1000 issues and can filter them by up to 10 field IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the projects that the issues
   *   are in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issues.
   */
  async getBulkChangelogs<T = Models.BulkChangelog>(
    parameters: Parameters.GetBulkChangelogs,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Bulk fetch changelogs for multiple issues and filter by fields
   *
   * Returns a paginated list of all changelogs for given issues sorted by changelog date and issue IDs, starting from
   * the oldest changelog and smallest issue ID.
   *
   * Issues are identified by their ID or key, and optionally changelogs can be filtered by their field IDs. You can
   * request the changelogs of up to 1000 issues and can filter them by up to 10 field IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the projects that the issues
   *   are in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issues.
   */
  async getBulkChangelogs<T = Models.BulkChangelog>(
    parameters: Parameters.GetBulkChangelogs,
    callback?: never,
  ): Promise<T>;
  async getBulkChangelogs<T = Models.BulkChangelog>(
    parameters: Parameters.GetBulkChangelogs,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/changelog/bulkfetch',
      method: 'POST',
      data: {
        fieldIds: parameters.fieldIds,
        issueIdsOrKeys: parameters.issueIdsOrKeys,
        maxResults: parameters.maxResults,
        nextPageToken: parameters.nextPageToken,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all issue events.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getEvents<T = Models.IssueEvent[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all issue events.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getEvents<T = Models.IssueEvent[]>(callback?: never): Promise<T>;
  async getEvents<T = Models.IssueEvent[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/events',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be
   * applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties
   * set.
   *
   * The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue
   * or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These are
   * the same fields that appear on the issue's create screen.
   *
   * Creating a subtask differs from creating an issue as follows:
   *
   * - `issueType` must be set to a subtask issue type (use [ Get create issue
   *   metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   * - `parent` must contain the ID or key of the parent issue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
   * which the issue or subtask is created.
   */
  async createIssue<T = Models.CreatedIssue>(parameters: Parameters.CreateIssue, callback: Callback<T>): Promise<void>;
  /**
   * Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be
   * applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties
   * set.
   *
   * The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue
   * or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These are
   * the same fields that appear on the issue's create screen.
   *
   * Creating a subtask differs from creating an issue as follows:
   *
   * - `issueType` must be set to a subtask issue type (use [ Get create issue
   *   metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   * - `parent` must contain the ID or key of the parent issue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
   * which the issue or subtask is created.
   */
  async createIssue<T = Models.CreatedIssue>(parameters: Parameters.CreateIssue, callback?: never): Promise<T>;
  async createIssue<T = Models.CreatedIssue>(
    parameters: Parameters.CreateIssue,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue',
      method: 'POST',
      params: {
        updateHistory: parameters.updateHistory,
      },
      data: {
        fields: parameters.fields,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
        transition: parameters.transition,
        update: parameters.update,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Enables admins to archive up to 100,000 issues in a single request using JQL, returning the URL to check the status
   * of the submitted request.
   *
   * You can use the [get
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-tasks/#api-rest-api-2-task-taskid-get)
   * and [cancel
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-tasks/#api-rest-api-2-task-taskid-cancel-post)
   * APIs to manage the request.
   *
   * **Note that:**
   *
   * - You can't archive subtasks directly, only through their parent issues
   * - You can only archive issues from software, service management, and business projects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   *
   * **Rate limiting:** Only a single request per jira instance can be active at any given time.
   */
  async archiveIssuesAsync<T = string>(parameters: Parameters.ArchiveIssuesAsync, callback: Callback<T>): Promise<void>;
  /**
   * Enables admins to archive up to 100,000 issues in a single request using JQL, returning the URL to check the status
   * of the submitted request.
   *
   * You can use the [get
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-tasks/#api-rest-api-2-task-taskid-get)
   * and [cancel
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-tasks/#api-rest-api-2-task-taskid-cancel-post)
   * APIs to manage the request.
   *
   * **Note that:**
   *
   * - You can't archive subtasks directly, only through their parent issues
   * - You can only archive issues from software, service management, and business projects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   *
   * **Rate limiting:** Only a single request per jira instance can be active at any given time.
   */
  async archiveIssuesAsync<T = string>(parameters: Parameters.ArchiveIssuesAsync, callback?: never): Promise<T>;
  async archiveIssuesAsync<T = string>(
    parameters: Parameters.ArchiveIssuesAsync,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/archive',
      method: 'POST',
      data: {
        jql: parameters.jql,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Enables admins to archive up to 1000 issues in a single request using issue ID/key, returning details of the
   * issue(s) archived in the process and the errors encountered, if any.
   *
   * **Note that:**
   *
   * - You can't archive subtasks directly, only through their parent issues
   * - You can only archive issues from software, service management, and business projects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   */
  async archiveIssues<T = Models.IssueArchivalSync>(
    parameters: Parameters.ArchiveIssues,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Enables admins to archive up to 1000 issues in a single request using issue ID/key, returning details of the
   * issue(s) archived in the process and the errors encountered, if any.
   *
   * **Note that:**
   *
   * - You can't archive subtasks directly, only through their parent issues
   * - You can only archive issues from software, service management, and business projects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   */
  async archiveIssues<T = Models.IssueArchivalSync>(parameters: Parameters.ArchiveIssues, callback?: never): Promise<T>;
  async archiveIssues<T = Models.IssueArchivalSync>(
    parameters: Parameters.ArchiveIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/archive',
      method: 'PUT',
      data: {
        issueIdsOrKeys: parameters.issueIdsOrKeys,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may
   * be applied, to move the issues or subtasks to a workflow step other than the default start step, and issue
   * properties set.
   *
   * The content of each issue or subtask is defined using `update` and `fields`. The fields that can be set in the
   * issue or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These
   * are the same fields that appear on the issues' create screens.
   *
   * Creating a subtask differs from creating an issue as follows:
   *
   * - `issueType` must be set to a subtask issue type (use [ Get create issue
   *   metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   * - `parent` the must contain the ID or key of the parent issue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
   * which each issue or subtask is created.
   */
  async createIssues<T = Models.CreatedIssues>(
    parameters: Parameters.CreateIssues | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may
   * be applied, to move the issues or subtasks to a workflow step other than the default start step, and issue
   * properties set.
   *
   * The content of each issue or subtask is defined using `update` and `fields`. The fields that can be set in the
   * issue or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These
   * are the same fields that appear on the issues' create screens.
   *
   * Creating a subtask differs from creating an issue as follows:
   *
   * - `issueType` must be set to a subtask issue type (use [ Get create issue
   *   metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   * - `parent` the must contain the ID or key of the parent issue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
   * which each issue or subtask is created.
   */
  async createIssues<T = Models.CreatedIssues>(parameters?: Parameters.CreateIssues, callback?: never): Promise<T>;
  async createIssues<T = Models.CreatedIssues>(
    parameters?: Parameters.CreateIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/bulk',
      method: 'POST',
      data: {
        issueUpdates: parameters?.issueUpdates,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the details for a set of requested issues. You can request up to 100 issues.
   *
   * Each issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
   * search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or
   * other redirect is **not** returned.
   *
   * Issues will be returned in ascending `id` order. If there are errors, Jira will return a list of issues which
   * couldn't be fetched along with error messages.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async bulkFetchIssues<T = Models.BulkIssue>(
    parameters: Parameters.BulkFetchIssues,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the details for a set of requested issues. You can request up to 100 issues.
   *
   * Each issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
   * search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or
   * other redirect is **not** returned.
   *
   * Issues will be returned in ascending `id` order. If there are errors, Jira will return a list of issues which
   * couldn't be fetched along with error messages.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   * are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async bulkFetchIssues<T = Models.BulkIssue>(parameters: Parameters.BulkFetchIssues, callback?: never): Promise<T>;
  async bulkFetchIssues<T = Models.BulkIssue>(
    parameters: Parameters.BulkFetchIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/bulkfetch',
      method: 'POST',
      data: {
        expand: parameters.expand,
        fields: parameters.fields,
        fieldsByKeys: parameters.fieldsByKeys,
        issueIdsOrKeys: parameters.issueIdsOrKeys,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Returns details of projects, issue types within projects, and, when requested, the create screen fields
   *   for each issue type for the user. Use the information to populate the requests in [ Create
   *   issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   *   Deprecated, see [Create Issue Meta Endpoint Deprecation
   *   Notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1304).
   *
   *   The request can be restricted to specific projects or issue types using the query parameters. The response will
   *   contain information for the valid projects, issue types, or project and issue type combinations requested. Note
   *   that invalid project, issue type, or project and issue type combinations do not generate errors.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   *   issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMeta<T = Models.IssueCreateMetadata>(
    parameters: Parameters.GetCreateIssueMeta | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated Returns details of projects, issue types within projects, and, when requested, the create screen fields
   *   for each issue type for the user. Use the information to populate the requests in [ Create
   *   issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   *   Deprecated, see [Create Issue Meta Endpoint Deprecation
   *   Notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1304).
   *
   *   The request can be restricted to specific projects or issue types using the query parameters. The response will
   *   contain information for the valid projects, issue types, or project and issue type combinations requested. Note
   *   that invalid project, issue type, or project and issue type combinations do not generate errors.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   *   issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMeta<T = Models.IssueCreateMetadata>(
    parameters?: Parameters.GetCreateIssueMeta,
    callback?: never,
  ): Promise<T>;
  async getCreateIssueMeta<T = Models.IssueCreateMetadata>(
    parameters?: Parameters.GetCreateIssueMeta,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/createmeta',
      method: 'GET',
      params: {
        projectIds: parameters?.projectIds,
        projectKeys: parameters?.projectKeys,
        issuetypeIds: parameters?.issuetypeIds,
        issuetypeNames: parameters?.issuetypeNames,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a page of issue type metadata for a specified project. Use the information to populate the requests in [
   * Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   * issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMetaIssueTypes<T = Models.PageOfCreateMetaIssueTypes>(
    parameters: Parameters.GetCreateIssueMetaIssueTypes,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a page of issue type metadata for a specified project. Use the information to populate the requests in [
   * Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   * issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMetaIssueTypes<T = Models.PageOfCreateMetaIssueTypes>(
    parameters: Parameters.GetCreateIssueMetaIssueTypes,
    callback?: never,
  ): Promise<T>;
  async getCreateIssueMetaIssueTypes<T = Models.PageOfCreateMetaIssueTypes>(
    parameters: Parameters.GetCreateIssueMetaIssueTypes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/createmeta/${parameters.projectIdOrKey}/issuetypes`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the
   * requests in [ Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   * issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMetaIssueTypeId<T = Models.PageOfCreateMetaIssueTypeWithField>(
    parameters: Parameters.GetCreateIssueMetaIssueTypeId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the
   * requests in [ Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   * issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMetaIssueTypeId<T = Models.PageOfCreateMetaIssueTypeWithField>(
    parameters: Parameters.GetCreateIssueMetaIssueTypeId,
    callback?: never,
  ): Promise<T>;
  async getCreateIssueMetaIssueTypeId<T = Models.PageOfCreateMetaIssueTypeWithField>(
    parameters: Parameters.GetCreateIssueMetaIssueTypeId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/createmeta/${parameters.projectIdOrKey}/issuetypes/${parameters.issueTypeId}`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all issues breaching and approaching per-issue limits.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) is required for the project the
   *   issues are in. Results may be incomplete otherwise
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueLimitReport<T = Models.IssueLimitReport>(
    parameters: Parameters.GetIssueLimitReport | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all issues breaching and approaching per-issue limits.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) is required for the project the
   *   issues are in. Results may be incomplete otherwise
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueLimitReport<T = Models.IssueLimitReport>(
    parameters?: Parameters.GetIssueLimitReport,
    callback?: never,
  ): Promise<T>;
  async getIssueLimitReport<T = Models.IssueLimitReport>(
    parameters?: Parameters.GetIssueLimitReport,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/limit/report',
      method: 'GET',
      params: {
        isReturningKeys: parameters?.isReturningKeys,
      },
      data: {
        issuesApproachingLimitParams: parameters?.issuesApproachingLimitParams,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Enables admins to unarchive up to 1000 issues in a single request using issue ID/key, returning details of the
   * issue(s) unarchived in the process and the errors encountered, if any.
   *
   * **Note that:**
   *
   * - You can't unarchive subtasks directly, only through their parent issues
   * - You can only unarchive issues from software, service management, and business projects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   */
  async unarchiveIssues<T = Models.IssueArchivalSync>(
    parameters: Parameters.UnarchiveIssues,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Enables admins to unarchive up to 1000 issues in a single request using issue ID/key, returning details of the
   * issue(s) unarchived in the process and the errors encountered, if any.
   *
   * **Note that:**
   *
   * - You can't unarchive subtasks directly, only through their parent issues
   * - You can only unarchive issues from software, service management, and business projects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   */
  async unarchiveIssues<T = Models.IssueArchivalSync>(
    parameters: Parameters.UnarchiveIssues,
    callback?: never,
  ): Promise<T>;
  async unarchiveIssues<T = Models.IssueArchivalSync>(
    parameters: Parameters.UnarchiveIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issue/unarchive',
      method: 'PUT',
      data: {
        issueIdsOrKeys: parameters.issueIdsOrKeys,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the details for an issue.
   *
   * The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
   * search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or
   * other redirect is **not** returned. The issue key returned in the response is the key of the issue found.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getIssue<T = Models.Issue>(parameters: Parameters.GetIssue | string, callback: Callback<T>): Promise<void>;
  /**
   * Returns the details for an issue.
   *
   * The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
   * search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or
   * other redirect is **not** returned. The issue key returned in the response is the key of the issue found.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getIssue<T = Models.Issue>(parameters: Parameters.GetIssue | string, callback?: never): Promise<T>;
  async getIssue<T = Models.Issue>(
    parameters: Parameters.GetIssue | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueIdOrKey = typeof parameters === 'string' ? parameters : parameters.issueIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${issueIdOrKey}`,
      method: 'GET',
      params: {
        fields: typeof parameters !== 'string' ? parameters.fields : undefined,
        fieldsByKeys: typeof parameters !== 'string' ? parameters.fieldsByKeys : undefined,
        expand: typeof parameters !== 'string' ? parameters.expand : undefined,
        properties: typeof parameters !== 'string' ? parameters.properties : undefined,
        updateHistory: typeof parameters !== 'string' ? parameters.updateHistory : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not
   * supported and is ignored here. To transition an issue, please use [Transition
   * issue](#api-rest-api-2-issue-issueIdOrKey-transitions-post).
   *
   * The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are
   * determined using [ Get edit issue metadata](#api-rest-api-2-issue-issueIdOrKey-editmeta-get).
   *
   * The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting
   * `update.parent.set.none` to _true_.
   *
   * Connect apps having an app user with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can override the screen security
   * configuration using `overrideScreenSecurity` and `overrideEditableFlag`.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async editIssue<T = void>(parameters: Parameters.EditIssue, callback: Callback<T>): Promise<void>;
  /**
   * Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not
   * supported and is ignored here. To transition an issue, please use [Transition
   * issue](#api-rest-api-2-issue-issueIdOrKey-transitions-post).
   *
   * The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are
   * determined using [ Get edit issue metadata](#api-rest-api-2-issue-issueIdOrKey-editmeta-get).
   *
   * The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting
   * `update.parent.set.none` to _true_.
   *
   * Connect apps having an app user with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can override the screen security
   * configuration using `overrideScreenSecurity` and `overrideEditableFlag`.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async editIssue<T = void>(parameters: Parameters.EditIssue, callback?: never): Promise<T>;
  async editIssue<T = void>(parameters: Parameters.EditIssue, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'PUT',
      params: {
        notifyUsers: parameters.notifyUsers,
        overrideScreenSecurity: parameters.overrideScreenSecurity,
        overrideEditableFlag: parameters.overrideEditableFlag,
        returnIssue: parameters.returnIssue,
        expand: parameters.expand,
      },
      data: {
        fields: parameters.fields,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
        transition: parameters.transition,
        update: parameters.update,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue.
   *
   * An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`.
   * This causes the issue's subtasks to be deleted with the issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Delete issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async deleteIssue<T = void>(parameters: Parameters.DeleteIssue | string, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue.
   *
   * An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`.
   * This causes the issue's subtasks to be deleted with the issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Delete issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async deleteIssue<T = void>(parameters: Parameters.DeleteIssue | string, callback?: never): Promise<T>;
  async deleteIssue<T = void>(parameters: Parameters.DeleteIssue | string, callback?: Callback<T>): Promise<void | T> {
    const issueIdOrKey = typeof parameters === 'string' ? parameters : parameters.issueIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${issueIdOrKey}`,
      method: 'DELETE',
      params: {
        deleteSubtasks: typeof parameters !== 'string' ? parameters.deleteSubtasks : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Assigns an issue to a user. Use this operation when the calling user does not have the _Edit Issues_ permission but
   * has the _Assign issue_ permission for the project that the issue is in.
   *
   * If `name` or `accountId` is set to:
   *
   * - `"-1"`, the issue is assigned to the default assignee for the project.
   * - `null`, the issue is set to unassigned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse Projects_ and _Assign Issues_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async assignIssue<T = void>(parameters: Parameters.AssignIssue, callback: Callback<T>): Promise<void>;
  /**
   * Assigns an issue to a user. Use this operation when the calling user does not have the _Edit Issues_ permission but
   * has the _Assign issue_ permission for the project that the issue is in.
   *
   * If `name` or `accountId` is set to:
   *
   * - `"-1"`, the issue is assigned to the default assignee for the project.
   * - `null`, the issue is set to unassigned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse Projects_ and _Assign Issues_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async assignIssue<T = void>(parameters: Parameters.AssignIssue, callback?: never): Promise<T>;
  async assignIssue<T = void>(parameters: Parameters.AssignIssue, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/assignee`,
      method: 'PUT',
      data: {
        accountId: parameters.accountId,
        accountType: parameters.accountType,
        active: parameters.active,
        applicationRoles: parameters.applicationRoles,
        avatarUrls: parameters.avatarUrls,
        displayName: parameters.displayName,
        emailAddress: parameters.emailAddress,
        expand: parameters.expand,
        groups: parameters.groups,
        key: parameters.key,
        locale: parameters.locale,
        name: parameters.name,
        self: parameters.self,
        timeZone: parameters.timeZone,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * changelogs for an issue sorted by date, starting from the oldest.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getChangeLogs<T = Models.PageChangelog>(
    parameters: Parameters.GetChangeLogs | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * changelogs for an issue sorted by date, starting from the oldest.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getChangeLogs<T = Models.PageChangelog>(
    parameters: Parameters.GetChangeLogs | string,
    callback?: never,
  ): Promise<T>;
  async getChangeLogs<T = Models.PageChangelog>(
    parameters: Parameters.GetChangeLogs | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueIdOrKey = typeof parameters === 'string' ? parameters : parameters.issueIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${issueIdOrKey}/changelog`,
      method: 'GET',
      params: {
        startAt: typeof parameters !== 'string' ? parameters.startAt : undefined,
        maxResults: typeof parameters !== 'string' ? parameters.maxResults : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns changelogs for an issue specified by a list of changelog IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getChangeLogsByIds<T = Models.PageOfChangelogs>(
    parameters: Parameters.GetChangeLogsByIds,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns changelogs for an issue specified by a list of changelog IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getChangeLogsByIds<T = Models.PageOfChangelogs>(
    parameters: Parameters.GetChangeLogsByIds,
    callback?: never,
  ): Promise<T>;
  async getChangeLogsByIds<T = Models.PageOfChangelogs>(
    parameters: Parameters.GetChangeLogsByIds,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/changelog/list`,
      method: 'POST',
      data: {
        changelogIds: parameters.changelogIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to
   * populate the requests in [Edit issue](#api-rest-api-2-issue-issueIdOrKey-put).
   *
   * This endpoint will check for these conditions:
   *
   * 1. Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type
   *    scheme configuration. `overrideScreenSecurity=true` skips this condition.
   * 2. Field is visible in the [field
   *    configuration](https://support.atlassian.com/jira-cloud-administration/docs/change-a-field-configuration/).
   *    `overrideScreenSecurity=true` skips this condition.
   * 3. Field is shown on the issue: each field has different conditions here. For example: Attachment field only shows if
   *    attachments are enabled. Assignee only shows if user has permissions to assign the issue.
   * 4. If a field is custom then it must have valid custom field context, applicable for its project and issue type. All
   *    system fields are assumed to have context in all projects and all issue types.
   * 5. Issue has a project, issue type, and status defined.
   * 6. Issue is assigned to a valid workflow, and the current status has assigned a workflow step.
   *    `overrideEditableFlag=true` skips this condition.
   * 7. The current workflow step is editable. This is true by default, but [can be disabled by
   *    setting](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) the
   *    `jira.issue.editable` property to `false`. `overrideEditableFlag=true` skips this condition.
   * 8. User has [Edit issues
   *    permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/).
   * 9. Workflow permissions allow editing a field. This is true by default but [can be
   *    modified](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) using
   *    `jira.permission.*` workflow properties.
   *
   * Fields hidden using [Issue layout settings
   * page](https://support.atlassian.com/jira-software-cloud/docs/configure-field-layout-in-the-issue-view/) remain
   * editable.
   *
   * Connect apps having an app user with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can return additional details using:
   *
   * - `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available
   *   through screens, and field configuration (conditions 1. and 2. from the list above).
   * - `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if
   *   the current step is editable (conditions 6. and 7. from the list above).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   *
   * Note: For any fields to be editable the user must have the _Edit issues_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the issue.
   */
  async getEditIssueMeta<T = Models.IssueUpdateMetadata>(
    parameters: Parameters.GetEditIssueMeta | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to
   * populate the requests in [Edit issue](#api-rest-api-2-issue-issueIdOrKey-put).
   *
   * This endpoint will check for these conditions:
   *
   * 1. Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type
   *    scheme configuration. `overrideScreenSecurity=true` skips this condition.
   * 2. Field is visible in the [field
   *    configuration](https://support.atlassian.com/jira-cloud-administration/docs/change-a-field-configuration/).
   *    `overrideScreenSecurity=true` skips this condition.
   * 3. Field is shown on the issue: each field has different conditions here. For example: Attachment field only shows if
   *    attachments are enabled. Assignee only shows if user has permissions to assign the issue.
   * 4. If a field is custom then it must have valid custom field context, applicable for its project and issue type. All
   *    system fields are assumed to have context in all projects and all issue types.
   * 5. Issue has a project, issue type, and status defined.
   * 6. Issue is assigned to a valid workflow, and the current status has assigned a workflow step.
   *    `overrideEditableFlag=true` skips this condition.
   * 7. The current workflow step is editable. This is true by default, but [can be disabled by
   *    setting](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) the
   *    `jira.issue.editable` property to `false`. `overrideEditableFlag=true` skips this condition.
   * 8. User has [Edit issues
   *    permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/).
   * 9. Workflow permissions allow editing a field. This is true by default but [can be
   *    modified](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) using
   *    `jira.permission.*` workflow properties.
   *
   * Fields hidden using [Issue layout settings
   * page](https://support.atlassian.com/jira-software-cloud/docs/configure-field-layout-in-the-issue-view/) remain
   * editable.
   *
   * Connect apps having an app user with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can return additional details using:
   *
   * - `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available
   *   through screens, and field configuration (conditions 1. and 2. from the list above).
   * - `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if
   *   the current step is editable (conditions 6. and 7. from the list above).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   *
   * Note: For any fields to be editable the user must have the _Edit issues_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the issue.
   */
  async getEditIssueMeta<T = Models.IssueUpdateMetadata>(
    parameters: Parameters.GetEditIssueMeta | string,
    callback?: never,
  ): Promise<T>;
  async getEditIssueMeta<T = Models.IssueUpdateMetadata>(
    parameters: Parameters.GetEditIssueMeta | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueIdOrKey = typeof parameters === 'string' ? parameters : parameters.issueIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${issueIdOrKey}/editmeta`,
      method: 'GET',
      params: {
        overrideScreenSecurity: typeof parameters !== 'string' ? parameters.overrideScreenSecurity : undefined,
        overrideEditableFlag: typeof parameters !== 'string' ? parameters.overrideEditableFlag : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an email notification for an issue and adds it to the mail queue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async notify<T = void>(parameters: Parameters.Notify, callback: Callback<T>): Promise<void>;
  /**
   * Creates an email notification for an issue and adds it to the mail queue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async notify<T = void>(parameters: Parameters.Notify, callback?: never): Promise<T>;
  async notify<T = void>(parameters: Parameters.Notify, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/notify`,
      method: 'POST',
      data: {
        htmlBody: parameters.htmlBody,
        restrict: parameters.restrict,
        subject: parameters.subject,
        textBody: parameters.textBody,
        to: parameters.to,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's
   * status.
   *
   * Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its
   * status, the response will return any empty transitions list.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required: A list or
   * transition is returned only when the user has:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   *
   * However, if the user does not have the _Transition issues_ [ project
   * permission](https://confluence.atlassian.com/x/yodKLg) the response will not list any transitions.
   */
  async getTransitions<T = Models.Transitions>(
    parameters: Parameters.GetTransitions | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's
   * status.
   *
   * Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its
   * status, the response will return any empty transitions list.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required: A list or
   * transition is returned only when the user has:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   *
   * However, if the user does not have the _Transition issues_ [ project
   * permission](https://confluence.atlassian.com/x/yodKLg) the response will not list any transitions.
   */
  async getTransitions<T = Models.Transitions>(
    parameters: Parameters.GetTransitions | string,
    callback?: never,
  ): Promise<T>;
  async getTransitions<T = Models.Transitions>(
    parameters: Parameters.GetTransitions | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueIdOrKey = typeof parameters === 'string' ? parameters : parameters.issueIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${issueIdOrKey}/transitions`,
      method: 'GET',
      params: {
        expand: typeof parameters !== 'string' ? parameters.expand : undefined,
        transitionId: typeof parameters !== 'string' ? parameters.transitionId : undefined,
        skipRemoteOnlyCondition: typeof parameters !== 'string' ? parameters.skipRemoteOnlyCondition : undefined,
        includeUnavailableTransitions:
          typeof parameters !== 'string' ? parameters.includeUnavailableTransitions : undefined,
        sortByOpsBarAndStatus: typeof parameters !== 'string' ? parameters.sortByOpsBarAndStatus : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.
   *
   * SortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update`
   * parameters in the request body. Get details about the fields using [ Get
   * transitions](#api-rest-api-2-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Transition issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async doTransition<T = void>(parameters: Parameters.DoTransition, callback: Callback<T>): Promise<void>;
  /**
   * Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.
   *
   * SortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update`
   * parameters in the request body. Get details about the fields using [ Get
   * transitions](#api-rest-api-2-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Transition issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async doTransition<T = void>(parameters: Parameters.DoTransition, callback?: never): Promise<T>;
  async doTransition<T = void>(parameters: Parameters.DoTransition, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'POST',
      data: {
        fields: parameters.fields,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
        transition: parameters.transition,
        update: parameters.update,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Enables admins to retrieve details of all archived issues. Upon a successful request, the admin who submitted it
   * will receive an email with a link to download a CSV file with the issue details.
   *
   * Note that this API only exports the values of system fields and archival-specific fields (`ArchivedBy` and
   * `ArchivedDate`). Custom fields aren't supported.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   *
   * **Rate limiting:** Only a single request can be active at any given time.
   */
  async exportArchivedIssues<T = Models.ExportArchivedIssuesTaskProgress>(
    parameters: Parameters.ExportArchivedIssues,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Enables admins to retrieve details of all archived issues. Upon a successful request, the admin who submitted it
   * will receive an email with a link to download a CSV file with the issue details.
   *
   * Note that this API only exports the values of system fields and archival-specific fields (`ArchivedBy` and
   * `ArchivedDate`). Custom fields aren't supported.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   * admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   *
   * **License required:** Premium or Enterprise
   *
   * **Signed-in users only:** This API can't be accessed anonymously.
   *
   * **Rate limiting:** Only a single request can be active at any given time.
   */
  async exportArchivedIssues<T = Models.ExportArchivedIssuesTaskProgress>(
    parameters: Parameters.ExportArchivedIssues,
    callback?: never,
  ): Promise<T>;
  async exportArchivedIssues<T = Models.ExportArchivedIssuesTaskProgress>(
    parameters: Parameters.ExportArchivedIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issues/archive/export',
      method: 'PUT',
      data: {
        archivedBy: parameters.archivedBy,
        archivedDateRange: parameters.archivedDateRange,
        issueTypes: parameters.issueTypes,
        projects: parameters.projects,
        reporters: parameters.reporters,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
