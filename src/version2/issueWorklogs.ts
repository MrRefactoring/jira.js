import type { Client } from '../client';
import type { Request } from '../request';
import type { BulkDeleteWorklogsParameters } from './parameters/bulkDeleteWorklogsParameters';
import type { GetIssueWorklogParameters } from './parameters/getIssueWorklogParameters';
import type { AddWorklogParameters } from './parameters/addWorklogParameters';
import type { BulkMoveWorklogsParameters } from './parameters/bulkMoveWorklogsParameters';
import type { DeleteWorklogParameters } from './parameters/deleteWorklogParameters';
import type { GetWorklogParameters } from './parameters/getWorklogParameters';
import type { UpdateWorklogParameters } from './parameters/updateWorklogParameters';
import type { GetIdsOfWorklogsDeletedSinceParameters } from './parameters/getIdsOfWorklogsDeletedSinceParameters';
import type { GetWorklogsForIdsParameters } from './parameters/getWorklogsForIdsParameters';
import type { GetIdsOfWorklogsModifiedSinceParameters } from './parameters/getIdsOfWorklogsModifiedSinceParameters';

export class IssueWorklogs {
  constructor(private client: Client) {}
  /**
   * Deletes a list of worklogs from an issue. This is an experimental API with limitations: *
   *
   * - - You can't delete more than 5000 worklogs at once.
   * - - No notifications will be sent for deleted worklogs.
   * -
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       issue.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - _Delete all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog.
   * - - If any worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async bulkDeleteWorklogs(parameters: BulkDeleteWorklogsParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'DELETE',
      query: {
        adjustEstimate: parameters.adjustEstimate,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      body: {
        ids: parameters.ids,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns worklogs for an issue (ordered by created time), starting from the oldest worklog or from the worklog
   * started on or after a date and time. *
   *
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Workloads are only returned where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getIssueWorklog(parameters: GetIssueWorklogParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        startedAfter: parameters.startedAfter,
        startedBefore: parameters.startedBefore,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds a worklog to an issue. *
   *
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Work on issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *       project that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async addWorklog(parameters: AddWorklogParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'POST',
      query: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        reduceBy: parameters.reduceBy,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      body: {
        author: parameters.author,
        comment: parameters.comment,
        created: parameters.created,
        id: parameters.id,
        issueId: parameters.issueId,
        properties: parameters.properties,
        self: parameters.self,
        started: parameters.started,
        timeSpent: parameters.timeSpent,
        timeSpentSeconds: parameters.timeSpentSeconds,
        updateAuthor: parameters.updateAuthor,
        updated: parameters.updated,
        visibility: parameters.visibility,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Moves a list of worklogs from one issue to another. This is an experimental API with several limitations: *
   *
   * - - You can't move more than 5000 worklogs at once.
   * - - You can't move worklogs containing an attachment.
   * - - You can't move worklogs restricted by project roles.
   * - - No notifications will be sent for moved worklogs.
   * - - No webhooks or events will be sent for moved worklogs.
   * - - No issue history will be recorded for moved worklogs.
   * -
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the projects containing the
   *       source and destination issues.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - _Delete all worklogs_[ and _Edit all worklogs_](https://confluence.atlassian.com/x/yodKLg)[project
   *       permission](https://confluence.atlassian.com/x/yodKLg)
   * - - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async bulkMoveWorklogs(parameters: BulkMoveWorklogsParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/move`,
      method: 'POST',
      query: {
        adjustEstimate: parameters.adjustEstimate,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      body: {
        ids: parameters.ids,
        issueIdOrKey: parameters.issueIdOrKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a worklog from an issue. *
   *
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - _Delete all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or
   *       _Delete own worklogs_ to delete worklogs created by the user,
   * - - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async deleteWorklog(parameters: DeleteWorklogParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'DELETE',
      query: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        increaseBy: parameters.increaseBy,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a worklog. *
   *
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklog(parameters: GetWorklogParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a worklog. *
   *
   * - Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
   *   [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
   *       own worklogs_ to update worklogs created by the user.
   * - - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async updateWorklog(parameters: UpdateWorklogParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'PUT',
      query: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      body: {
        author: parameters.author,
        comment: parameters.comment,
        created: parameters.created,
        id: parameters.id,
        issueId: parameters.issueId,
        properties: parameters.properties,
        self: parameters.self,
        started: parameters.started,
        timeSpent: parameters.timeSpent,
        timeSpentSeconds: parameters.timeSpentSeconds,
        updateAuthor: parameters.updateAuthor,
        updated: parameters.updated,
        visibility: parameters.visibility,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of IDs and delete timestamps for worklogs deleted after a date and time. *
   *
   * - This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to
   *   youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest
   *   item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is
   *   set to true on the last page of worklogs.
   * -
   * - This resource does not return worklogs deleted during the minute preceding the request.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getIdsOfWorklogsDeletedSince(parameters: GetIdsOfWorklogsDeletedSinceParameters) {
    const request: Request = {
      url: '/rest/api/2/worklog/deleted',
      method: 'GET',
      query: {
        since: parameters.since,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns worklog details for a list of worklog IDs. *
   *
   * - The returned list of worklogs is limited to 1000 items.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, worklogs are only returned where either of the following is true:
   * -
   * - - The worklog is set as _Viewable by All Users_.
   * - - The user is a member of a project role or group with permission to view the worklog.
   */
  async getWorklogsForIds(parameters: GetWorklogsForIdsParameters) {
    const request: Request = {
      url: '/rest/api/2/worklog/list',
      method: 'POST',
      query: {
        expand: parameters.expand,
      },
      body: {
        ids: parameters.ids,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of IDs and update timestamps for worklogs updated after a date and time. *
   *
   * - This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to
   *   youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest
   *   item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is
   *   set to true on the last page of worklogs.
   * -
   * - This resource does not return worklogs updated during the minute preceding the request.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, worklogs are only returned where either of the following is true:
   * -
   * - - The worklog is set as _Viewable by All Users_.
   * - - The user is a member of a project role or group with permission to view the worklog.
   */
  async getIdsOfWorklogsModifiedSince(parameters: GetIdsOfWorklogsModifiedSinceParameters) {
    const request: Request = {
      url: '/rest/api/2/worklog/updated',
      method: 'GET',
      query: {
        since: parameters.since,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }
}
