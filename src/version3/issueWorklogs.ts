import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueWorklogs {
  constructor(private client: Client) { }
  /**
     * Returns worklogs for an issue, starting from the oldest worklog or from the worklog started on or after a date and time.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Workloads are only returned where the user has:
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback: Callback<T>): Promise<void>;
  /**
     * Returns worklogs for an issue, starting from the oldest worklog or from the worklog started on or after a date and time.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Workloads are only returned where the user has:
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback?: never): Promise<T>;
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        startedAfter: parameters.startedAfter,
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIssueWorklog' });
  }
  /**
     * Adds a worklog to an issue.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback: Callback<T>): Promise<void>;
  /**
     * Adds a worklog to an issue.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback?: never): Promise<T>;
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog`,
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
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'addWorklog' });
  }
  /**
     * Returns a worklog.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback: Callback<T>): Promise<void>;
  /**
     * Returns a worklog.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: never): Promise<T>;
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getWorklog' });
  }
  /**
     * Updates a worklog.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  *Edit all worklogs*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or *Edit own worklogs* to update worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback: Callback<T>): Promise<void>;
  /**
     * Updates a worklog.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  *Edit all worklogs*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or *Edit own worklogs* to update worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback?: never): Promise<T>;
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
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
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateWorklog' });
  }
  /**
     * Deletes a worklog from an issue.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  *Delete all worklogs*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user,
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a worklog from an issue.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  *Delete all worklogs*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user,
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback?: never): Promise<T>;
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'DELETE',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        increaseBy: parameters.increaseBy,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'deleteWorklog' });
  }
  /**
     * Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.
     *
     * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.
     *
     * This resource does not return worklogs deleted during the minute preceding the request.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters: Parameters.GetIdsOfWorklogsDeletedSince | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.
     *
     * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.
     *
     * This resource does not return worklogs deleted during the minute preceding the request.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsDeletedSince, callback?: never): Promise<T>;
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsDeletedSince, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/worklog/deleted',
      method: 'GET',
      params: {
        since: parameters?.since,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIdsOfWorklogsDeletedSince' });
  }
  /**
     * Returns worklog details for a list of worklog IDs.
     *
     * The returned list of worklogs is limited to 1000 items.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:
     *
     *  *  the worklog is set as *Viewable by All Users*.
     *  *  the user is a member of a project role or group with permission to view the worklog. */
  async getWorklogsForIds<T = unknown>(parameters: Parameters.GetWorklogsForIds | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns worklog details for a list of worklog IDs.
     *
     * The returned list of worklogs is limited to 1000 items.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:
     *
     *  *  the worklog is set as *Viewable by All Users*.
     *  *  the user is a member of a project role or group with permission to view the worklog. */
  async getWorklogsForIds<T = unknown>(parameters?: Parameters.GetWorklogsForIds, callback?: never): Promise<T>;
  async getWorklogsForIds<T = unknown>(parameters?: Parameters.GetWorklogsForIds, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/worklog/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        ids: parameters?.ids,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getWorklogsForIds' });
  }
  /**
     * Returns a list of IDs and update timestamps for worklogs updated after a date and time.
     *
     * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.
     *
     * This resource does not return worklogs updated during the minute preceding the request.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:
     *
     *  *  the worklog is set as *Viewable by All Users*.
     *  *  the user is a member of a project role or group with permission to view the worklog. */
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters: Parameters.GetIdsOfWorklogsModifiedSince | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a list of IDs and update timestamps for worklogs updated after a date and time.
     *
     * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.
     *
     * This resource does not return worklogs updated during the minute preceding the request.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:
     *
     *  *  the worklog is set as *Viewable by All Users*.
     *  *  the user is a member of a project role or group with permission to view the worklog. */
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: never): Promise<T>;
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/worklog/updated',
      method: 'GET',
      params: {
        since: parameters?.since,
        expand: parameters?.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIdsOfWorklogsModifiedSince' });
  }
}
