import { BulkChangelogResponseSchema, type BulkChangelogResponse } from '#/models/bulkChangelogResponse';
import { CreatedIssueSchema, type CreatedIssue } from '#/models/createdIssue';
import { CreatedIssuesSchema, type CreatedIssues } from '#/models/createdIssues';
import { BulkIssueResultsSchema, type BulkIssueResults } from '#/models/bulkIssueResults';
import { PageOfCreateMetaIssueTypesSchema, type PageOfCreateMetaIssueTypes } from '#/models/pageOfCreateMetaIssueTypes';
import {
  PageOfCreateMetaIssueTypeWithFieldSchema,
  type PageOfCreateMetaIssueTypeWithField,
} from '#/models/pageOfCreateMetaIssueTypeWithField';
import { IssueSchema, type Issue } from '#/models/issue';
import { PageChangelogSchema, type PageChangelog } from '#/models/pageChangelog';
import { PageOfChangelogsSchema, type PageOfChangelogs } from '#/models/pageOfChangelogs';
import { IssueUpdateMetadataSchema, type IssueUpdateMetadata } from '#/models/issueUpdateMetadata';
import { TransitionsSchema, type Transitions } from '#/models/transitions';
import { type GetBulkChangelogs } from '#/parameters/getBulkChangelogs';
import { type CreateIssue } from '#/parameters/createIssue';
import { type CreateIssues } from '#/parameters/createIssues';
import { type BulkFetchIssues } from '#/parameters/bulkFetchIssues';
import { type GetCreateIssueMetaIssueTypes } from '#/parameters/getCreateIssueMetaIssueTypes';
import { type GetCreateIssueMetaIssueTypeId } from '#/parameters/getCreateIssueMetaIssueTypeId';
import { type GetIssue } from '#/parameters/getIssue';
import { type EditIssue } from '#/parameters/editIssue';
import { type DeleteIssue } from '#/parameters/deleteIssue';
import { type AssignIssue } from '#/parameters/assignIssue';
import { type GetChangeLogs } from '#/parameters/getChangeLogs';
import { type GetChangeLogsByIds } from '#/parameters/getChangeLogsByIds';
import { type GetEditIssueMeta } from '#/parameters/getEditIssueMeta';
import { type Notify } from '#/parameters/notify';
import { type GetTransitions } from '#/parameters/getTransitions';
import { type DoTransition } from '#/parameters/doTransition';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Bulk fetch changelogs for multiple issues and filter by fields
 *
 * Returns a paginated list of all changelogs for given issues sorted by changelog date and issue IDs, starting from the
 * oldest changelog and smallest issue ID.
 *
 * Issues are identified by their ID or key, and optionally changelogs can be filtered by their field IDs. You can
 * request the changelogs of up to 1000 issues and can filter them by up to 10 field IDs.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the projects that the issues
 *   are in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issues.
 */
export async function getBulkChangelogs(client: Client, parameters: GetBulkChangelogs): Promise<BulkChangelogResponse> {
  const config: SendRequestOptions<BulkChangelogResponse> = {
    url: '/rest/api/3/changelog/bulkfetch',
    method: 'POST',
    body: {
      fieldIds: parameters.fieldIds,
      issueIdsOrKeys: parameters.issueIdsOrKeys,
      maxResults: parameters.maxResults,
      nextPageToken: parameters.nextPageToken,
    },
    schema: BulkChangelogResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be applied,
 * to move the issue or subtask to a workflow step other than the default start step, and issue properties set.
 *
 * The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue
 * or subtask are determined using the [ Get create issue
 * metadata](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-createmeta-get).
 * These are the same fields that appear on the issue's create screen. Note that the `description`, `environment`, and
 * any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom
 * fields (`textfield`) accept a string and don't handle Atlassian Document Format content.
 *
 * Creating a subtask differs from creating an issue as follows:
 *
 * - `issueType` must be set to a subtask issue type (use [ Get create issue
 *   metadata](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-createmeta-get)
 *   to find subtask issue types).
 * - `parent` must contain the ID or key of the parent issue.
 *
 * In a next-gen project any issue may be made a child providing that the parent and child are members of the same
 * project.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
 * which the issue or subtask is created.
 */
export async function createIssue(client: Client, parameters: CreateIssue): Promise<CreatedIssue> {
  const config: SendRequestOptions<CreatedIssue> = {
    url: '/rest/api/3/issue',
    method: 'POST',
    searchParams: {
      updateHistory: parameters.updateHistory,
    },
    body: {
      fields: parameters.fields,
      historyMetadata: parameters.historyMetadata,
      properties: parameters.properties,
      transition: parameters.transition,
      update: parameters.update,
    },
    schema: CreatedIssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may be
 * applied, to move the issues or subtasks to a workflow step other than the default start step, and issue properties
 * set.
 *
 * The content of each issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue
 * or subtask are determined using the [ Get create issue
 * metadata](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-createmeta-get).
 * These are the same fields that appear on the issues' create screens. Note that the `description`, `environment`, and
 * any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom
 * fields (`textfield`) accept a string and don't handle Atlassian Document Format content.
 *
 * Creating a subtask differs from creating an issue as follows:
 *
 * - `issueType` must be set to a subtask issue type (use [ Get create issue
 *   metadata](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-createmeta-get)
 *   to find subtask issue types).
 * - `parent` the must contain the ID or key of the parent issue.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
 * which each issue or subtask is created.
 */
export async function createIssues(client: Client, parameters: CreateIssues): Promise<CreatedIssues> {
  const config: SendRequestOptions<CreatedIssues> = {
    url: '/rest/api/3/issue/bulk',
    method: 'POST',
    body: {
      issueUpdates: parameters.issueUpdates,
    },
    schema: CreatedIssuesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the details for a set of requested issues. You can request up to 100 issues.
 *
 * Each issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
 * search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other
 * redirect is **not** returned.
 *
 * Issues will be returned in ascending `id` order. If there are errors, Jira will return a list of issues which
 * couldn't be fetched along with error messages.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Issues are
 * included in the response where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function bulkFetchIssues(client: Client, parameters: BulkFetchIssues): Promise<BulkIssueResults> {
  const config: SendRequestOptions<BulkIssueResults> = {
    url: '/rest/api/3/issue/bulkfetch',
    method: 'POST',
    body: {
      expand: parameters.expand,
      fields: parameters.fields,
      fieldsByKeys: parameters.fieldsByKeys,
      issueIdsOrKeys: parameters.issueIdsOrKeys,
      properties: parameters.properties,
    },
    schema: BulkIssueResultsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a page of issue type metadata for a specified project. Use the information to populate the requests in [
 * Create
 * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post) and
 * [Create
 * issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-bulk-post).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Create
 * issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
 */
export async function getCreateIssueMetaIssueTypes(
  client: Client,
  parameters: GetCreateIssueMetaIssueTypes,
): Promise<PageOfCreateMetaIssueTypes> {
  const config: SendRequestOptions<PageOfCreateMetaIssueTypes> = {
    url: `/rest/api/3/issue/createmeta/${parameters.projectIdOrKey}/issuetypes`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageOfCreateMetaIssueTypesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the
 * requests in [ Create
 * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post) and
 * [Create
 * issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-bulk-post).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Create
 * issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
 */
export async function getCreateIssueMetaIssueTypeId(
  client: Client,
  parameters: GetCreateIssueMetaIssueTypeId,
): Promise<PageOfCreateMetaIssueTypeWithField> {
  const config: SendRequestOptions<PageOfCreateMetaIssueTypeWithField> = {
    url: `/rest/api/3/issue/createmeta/${parameters.projectIdOrKey}/issuetypes/${parameters.issueTypeId}`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageOfCreateMetaIssueTypeWithFieldSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the details for an issue.
 *
 * The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
 * search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other
 * redirect is **not** returned. The issue key returned in the response is the key of the issue found.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getIssue(client: Client, parameters: GetIssue): Promise<Issue> {
  const config: SendRequestOptions<Issue> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}`,
    method: 'GET',
    searchParams: {
      fields: parameters.fields,
      fieldsByKeys: parameters.fieldsByKeys,
      expand: parameters.expand,
      properties: parameters.properties,
      updateHistory: parameters.updateHistory,
      failFast: parameters.failFast,
    },
    schema: IssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not
 * supported and is ignored here. To transition an issue, please use [Transition
 * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueIdOrKey-transitions-post).
 *
 * The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are determined
 * using [ Get edit issue
 * metadata](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueIdOrKey-editmeta-get).
 *
 * The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting
 * `update.parent.set.none` to _true_. Note that the `description`, `environment`, and any `textarea` type custom fields
 * (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a
 * string and don't handle Atlassian Document Format content.
 *
 * Connect apps having an app user with _Administer Jira_ [global
 * permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
 * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can override the screen security configuration
 * using `overrideScreenSecurity` and `overrideEditableFlag`.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
 *   that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function editIssue(client: Client, parameters: EditIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}`,
    method: 'PUT',
    searchParams: {
      notifyUsers: parameters.notifyUsers,
      overrideScreenSecurity: parameters.overrideScreenSecurity,
      overrideEditableFlag: parameters.overrideEditableFlag,
      returnIssue: parameters.returnIssue,
      expand: parameters.expand,
    },
    body: {
      fields: parameters.fields,
      historyMetadata: parameters.historyMetadata,
      properties: parameters.properties,
      transition: parameters.transition,
      update: parameters.update,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue.
 *
 * An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`.
 * This causes the issue's subtasks to be deleted with the issue.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Delete issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
 *   containing the issue.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function deleteIssue(client: Client, parameters: DeleteIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}`,
    method: 'DELETE',
    searchParams: {
      deleteSubtasks: parameters.deleteSubtasks,
    },
  };

  return await client.sendRequest(config);
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
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse Projects_ and _Assign Issues_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function assignIssue(client: Client, parameters: AssignIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/assignee`,
    method: 'PUT',
    body: {
      accountId: parameters.accountId,
      active: parameters.active,
      avatarUrls: parameters.avatarUrls,
      displayName: parameters.displayName,
      self: parameters.self,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * changelogs for an issue sorted by date, starting from the oldest.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getChangeLogs(client: Client, parameters: GetChangeLogs): Promise<PageChangelog> {
  const config: SendRequestOptions<PageChangelog> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/changelog`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageChangelogSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns changelogs for an issue specified by a list of changelog IDs.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getChangeLogsByIds(client: Client, parameters: GetChangeLogsByIds): Promise<PageOfChangelogs> {
  const config: SendRequestOptions<PageOfChangelogs> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/changelog/list`,
    method: 'POST',
    body: {
      changelogIds: parameters.changelogIds,
    },
    schema: PageOfChangelogsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to
 * populate the requests in [Edit
 * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueIdOrKey-put).
 *
 * This endpoint will check for these conditions:
 *
 * 1. Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type scheme
 *    configuration. `overrideScreenSecurity=true` skips this condition.
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
 * - `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available through
 *   screens, and field configuration (conditions 1. and 2. from the list above).
 * - `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if the
 *   current step is editable (conditions 6. and 7. from the list above).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 *
 * Note: For any fields to be editable the user must have the _Edit issues_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the issue.
 */
export async function getEditIssueMeta(client: Client, parameters: GetEditIssueMeta): Promise<IssueUpdateMetadata> {
  const config: SendRequestOptions<IssueUpdateMetadata> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/editmeta`,
    method: 'GET',
    searchParams: {
      overrideScreenSecurity: parameters.overrideScreenSecurity,
      overrideEditableFlag: parameters.overrideEditableFlag,
    },
    schema: IssueUpdateMetadataSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an email notification for an issue and adds it to the mail queue.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function notify(client: Client, parameters: Notify): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/notify`,
    method: 'POST',
    body: {
      htmlBody: parameters.htmlBody,
      restrict: parameters.restrict,
      subject: parameters.subject,
      textBody: parameters.textBody,
      to: parameters.to,
    },
  };

  return await client.sendRequest(config);
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
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required: A list or
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
export async function getTransitions(client: Client, parameters: GetTransitions): Promise<Transitions> {
  const config: SendRequestOptions<Transitions> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/transitions`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      transitionId: parameters.transitionId,
      skipRemoteOnlyCondition: parameters.skipRemoteOnlyCondition,
      includeUnavailableTransitions: parameters.includeUnavailableTransitions,
      sortByOpsBarAndStatus: parameters.sortByOpsBarAndStatus,
    },
    schema: TransitionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.
 *
 * SortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update`
 * parameters in the request body. Get details about the fields using [ Get
 * transitions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueIdOrKey-transitions-get)
 * with the `transitions.fields` expand.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Transition issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function doTransition(client: Client, parameters: DoTransition): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/transitions`,
    method: 'POST',
    body: {
      fields: parameters.fields,
      historyMetadata: parameters.historyMetadata,
      properties: parameters.properties,
      transition: parameters.transition,
      update: parameters.update,
    },
  };

  return await client.sendRequest(config);
}
