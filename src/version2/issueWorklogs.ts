import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueWorklogs {
  constructor(private client: Client) {}

  /**
   * Returns worklogs for an issue, starting from the oldest worklog or from the worklog started on or after a date and
   * time.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Workloads are only returned where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getIssueWorklog<T = Models.PageOfWorklogs>(
    parameters: Parameters.GetIssueWorklog | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns worklogs for an issue, starting from the oldest worklog or from the worklog started on or after a date and
   * time.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Workloads are only returned where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getIssueWorklog<T = Models.PageOfWorklogs>(
    parameters: Parameters.GetIssueWorklog | string,
    callback?: never
  ): Promise<T>;
  async getIssueWorklog<T = Models.PageOfWorklogs>(
    parameters: Parameters.GetIssueWorklog | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueIdOrKey = typeof parameters === 'string' ? parameters : parameters.issueIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${issueIdOrKey}/worklog`,
      method: 'GET',
      params: {
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
        startedAfter: typeof parameters !== 'string' && parameters.startedAfter,
        startedBefore: typeof parameters !== 'string' && parameters.startedBefore,
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a worklog to an issue.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Work on issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback: Callback<T>): Promise<void>;
  /**
   * Adds a worklog to an issue.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Work on issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback?: never): Promise<T>;
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'POST',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        reduceBy: parameters.reduceBy,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      data: {
        self: parameters.self,
        author: parameters.author,
        updateAuthor: parameters.updateAuthor,
        comment: parameters.comment,
        created: parameters.created,
        updated: parameters.updated,
        visibility: parameters.visibility,
        started: parameters.started,
        timeSpent: parameters.timeSpent,
        timeSpentSeconds: parameters.timeSpentSeconds,
        id: parameters.id,
        issueId: parameters.issueId,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a worklog.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback: Callback<T>): Promise<void>;
  /**
   * Returns a worklog.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: never): Promise<T>;
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a worklog.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
   *   own worklogs_ to update worklogs created by the user.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback: Callback<T>): Promise<void>;
  /**
   * Updates a worklog.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
   *   own worklogs_ to update worklogs created by the user.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback?: never): Promise<T>;
  async updateWorklog<T = Models.Worklog>(
    parameters: Parameters.UpdateWorklog,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'PUT',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      data: {
        comment: parameters.comment,
        visibility: parameters.visibility,
        started: parameters.started,
        timeSpent: parameters.timeSpent,
        timeSpentSeconds: parameters.timeSpentSeconds,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a worklog from an issue.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Delete all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or
   *   _Delete own worklogs_ to delete worklogs created by the user,
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a worklog from an issue.
   *
   * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Delete all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or
   *   _Delete own worklogs_ to delete worklogs created by the user,
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback?: never): Promise<T>;
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'DELETE',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        increaseBy: parameters.increaseBy,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.
   *
   * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to
   * youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest
   * item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set
   * to true on the last page of worklogs.
   *
   * This resource does not return worklogs deleted during the minute preceding the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(
    parameters: Parameters.GetIdsOfWorklogsDeletedSince | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.
   *
   * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to
   * youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest
   * item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set
   * to true on the last page of worklogs.
   *
   * This resource does not return worklogs deleted during the minute preceding the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(
    parameters?: Parameters.GetIdsOfWorklogsDeletedSince,
    callback?: never
  ): Promise<T>;
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(
    parameters?: Parameters.GetIdsOfWorklogsDeletedSince,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/worklog/deleted',
      method: 'GET',
      params: {
        since: parameters?.since,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns worklog details for a list of worklog IDs.
   *
   * The returned list of worklogs is limited to 1000 items.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, worklogs are only returned where either of the following is true:
   *
   * - The worklog is set as _Viewable by All Users_.
   * - The user is a member of a project role or group with permission to view the worklog.
   */
  async getWorklogsForIds<T = Models.Worklog[]>(
    parameters: Parameters.GetWorklogsForIds | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns worklog details for a list of worklog IDs.
   *
   * The returned list of worklogs is limited to 1000 items.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, worklogs are only returned where either of the following is true:
   *
   * - The worklog is set as _Viewable by All Users_.
   * - The user is a member of a project role or group with permission to view the worklog.
   */
  async getWorklogsForIds<T = Models.Worklog[]>(
    parameters?: Parameters.GetWorklogsForIds,
    callback?: never
  ): Promise<T>;
  async getWorklogsForIds<T = Models.Worklog[]>(
    parameters?: Parameters.GetWorklogsForIds,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/worklog/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        ids: parameters?.ids,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of IDs and update timestamps for worklogs updated after a date and time.
   *
   * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to
   * youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest
   * item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set
   * to true on the last page of worklogs.
   *
   * This resource does not return worklogs updated during the minute preceding the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, worklogs are only returned where either of the following is true:
   *
   * - The worklog is set as _Viewable by All Users_.
   * - The user is a member of a project role or group with permission to view the worklog.
   */
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(
    parameters: Parameters.GetIdsOfWorklogsModifiedSince | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of IDs and update timestamps for worklogs updated after a date and time.
   *
   * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to
   * youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest
   * item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set
   * to true on the last page of worklogs.
   *
   * This resource does not return worklogs updated during the minute preceding the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, worklogs are only returned where either of the following is true:
   *
   * - The worklog is set as _Viewable by All Users_.
   * - The user is a member of a project role or group with permission to view the worklog.
   */
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(
    parameters?: Parameters.GetIdsOfWorklogsModifiedSince,
    callback?: never
  ): Promise<T>;
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(
    parameters?: Parameters.GetIdsOfWorklogsModifiedSince,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/worklog/updated',
      method: 'GET',
      params: {
        since: parameters?.since,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
