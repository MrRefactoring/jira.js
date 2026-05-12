import { PageOfWorklogsSchema, type PageOfWorklogs } from '#/models/pageOfWorklogs';
import { WorklogSchema, type Worklog } from '#/models/worklog';
import { ChangedWorklogsSchema, type ChangedWorklogs } from '#/models/changedWorklogs';
import { type GetIssueWorklog } from '#/parameters/getIssueWorklog';
import { type AddWorklog } from '#/parameters/addWorklog';
import { type GetWorklog } from '#/parameters/getWorklog';
import { type UpdateWorklog } from '#/parameters/updateWorklog';
import { type DeleteWorklog } from '#/parameters/deleteWorklog';
import { type GetIdsOfWorklogsDeletedSince } from '#/parameters/getIdsOfWorklogsDeletedSince';
import { type GetWorklogsForIds } from '#/parameters/getWorklogsForIds';
import { type GetIdsOfWorklogsModifiedSince } from '#/parameters/getIdsOfWorklogsModifiedSince';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns worklogs for an issue (ordered by created time), starting from the oldest worklog or from the worklog started
 * on or after a date and time.
 *
 * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
 * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Workloads
 * are only returned where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getIssueWorklog(client: Client, parameters: GetIssueWorklog): Promise<PageOfWorklogs> {
  const config: SendRequestOptions<PageOfWorklogs> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      startedAfter: parameters.startedAfter,
      startedBefore: parameters.startedBefore,
      expand: parameters.expand,
    },
    schema: PageOfWorklogsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a worklog to an issue.
 *
 * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
 * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Work on issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function addWorklog(client: Client, parameters: AddWorklog): Promise<Worklog> {
  const config: SendRequestOptions<Worklog> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog`,
    method: 'POST',
    searchParams: {
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
    schema: WorklogSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a worklog.
 *
 * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
 * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getWorklog(client: Client, parameters: GetWorklog): Promise<Worklog> {
  const config: SendRequestOptions<Worklog> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: WorklogSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a worklog.
 *
 * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
 * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
 *   own worklogs_ to update worklogs created by the user.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function updateWorklog(client: Client, parameters: UpdateWorklog): Promise<Worklog> {
  const config: SendRequestOptions<Worklog> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
    method: 'PUT',
    searchParams: {
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
    schema: WorklogSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a worklog from an issue.
 *
 * Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see
 * [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - _Delete all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or
 *   _Delete own worklogs_ to delete worklogs created by the user,
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function deleteWorklog(client: Client, parameters: DeleteWorklog): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      notifyUsers: parameters.notifyUsers,
      adjustEstimate: parameters.adjustEstimate,
      newEstimate: parameters.newEstimate,
      increaseBy: parameters.increaseBy,
      overrideEditableFlag: parameters.overrideEditableFlag,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.
 *
 * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest.
 * If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the
 * page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the
 * last page of worklogs.
 *
 * This resource does not return worklogs deleted during the minute preceding the request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getIdsOfWorklogsDeletedSince(
  client: Client,
  parameters?: GetIdsOfWorklogsDeletedSince,
): Promise<ChangedWorklogs> {
  const config: SendRequestOptions<ChangedWorklogs> = {
    url: '/rest/api/3/worklog/deleted',
    method: 'GET',
    searchParams: {
      since: parameters?.since,
    },
    schema: ChangedWorklogsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns worklog details for a list of worklog IDs.
 *
 * The returned list of worklogs is limited to 1000 items.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, worklogs are only returned where either of the following is true:
 *
 * - The worklog is set as _Viewable by All Users_.
 * - The user is a member of a project role or group with permission to view the worklog.
 */
export async function getWorklogsForIds(client: Client, parameters: GetWorklogsForIds): Promise<Worklog[]> {
  const config: SendRequestOptions<Worklog[]> = {
    url: '/rest/api/3/worklog/list',
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      ids: parameters.ids,
    },
    schema: z.array(WorklogSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of IDs and update timestamps for worklogs updated after a date and time.
 *
 * This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest.
 * If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the
 * page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the
 * last page of worklogs.
 *
 * This resource does not return worklogs updated during the minute preceding the request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, worklogs are only returned where either of the following is true:
 *
 * - The worklog is set as _Viewable by All Users_.
 * - The user is a member of a project role or group with permission to view the worklog.
 */
export async function getIdsOfWorklogsModifiedSince(
  client: Client,
  parameters?: GetIdsOfWorklogsModifiedSince,
): Promise<ChangedWorklogs> {
  const config: SendRequestOptions<ChangedWorklogs> = {
    url: '/rest/api/3/worklog/updated',
    method: 'GET',
    searchParams: {
      since: parameters?.since,
      expand: parameters?.expand,
    },
    schema: ChangedWorklogsSchema,
  };

  return await client.sendRequest(config);
}
