import type { Client } from '../client';
import type { Request } from '../request';
import type { GetBulkChangelogsParameters } from './parameters/getBulkChangelogsParameters';
import type { CreateIssueParameters } from './parameters/createIssueParameters';
import type { ArchiveIssuesAsyncParameters } from './parameters/archiveIssuesAsyncParameters';
import type { ArchiveIssuesParameters } from './parameters/archiveIssuesParameters';
import type { CreateIssuesParameters } from './parameters/createIssuesParameters';
import type { BulkFetchIssuesParameters } from './parameters/bulkFetchIssuesParameters';
import type { GetCreateIssueMetaIssueTypesParameters } from './parameters/getCreateIssueMetaIssueTypesParameters';
import type { GetCreateIssueMetaIssueTypeIdParameters } from './parameters/getCreateIssueMetaIssueTypeIdParameters';
import type { GetIssueLimitReportParameters } from './parameters/getIssueLimitReportParameters';
import type { UnarchiveIssuesParameters } from './parameters/unarchiveIssuesParameters';
import type { DeleteIssueParameters } from './parameters/deleteIssueParameters';
import type { GetIssueParameters } from './parameters/getIssueParameters';
import type { EditIssueParameters } from './parameters/editIssueParameters';
import type { AssignIssueParameters } from './parameters/assignIssueParameters';
import type { GetChangeLogsParameters } from './parameters/getChangeLogsParameters';
import type { GetChangeLogsByIdsParameters } from './parameters/getChangeLogsByIdsParameters';
import type { GetEditIssueMetaParameters } from './parameters/getEditIssueMetaParameters';
import type { NotifyParameters } from './parameters/notifyParameters';
import type { GetTransitionsParameters } from './parameters/getTransitionsParameters';
import type { DoTransitionParameters } from './parameters/doTransitionParameters';
import type { ExportArchivedIssuesParameters } from './parameters/exportArchivedIssuesParameters';

export class Issues {
  constructor(private client: Client) {}
  /**
   * Bulk fetch changelogs for multiple issues and filter by fields *
   *
   * - Returns a paginated list of all changelogs for given issues sorted by changelog date and issue IDs, starting from
   *   the oldest changelog and smallest issue ID.
   * -
   * - Issues are identified by their ID or key, and optionally changelogs can be filtered by their field IDs. You can
   *   request the changelogs of up to 1000 issues and can filter them by up to 10 field IDs.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the projects that the issues
   *       are in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issues.
   */
  async getBulkChangelogs(parameters: GetBulkChangelogsParameters) {
    const request: Request = {
      url: '/rest/api/2/changelog/bulkfetch',
      method: 'POST',
      body: {
        fieldIds: parameters.fieldIds,
        issueIdsOrKeys: parameters.issueIdsOrKeys,
        maxResults: parameters.maxResults,
        nextPageToken: parameters.nextPageToken,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all issue events. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getEvents() {
    const request: Request = {
      url: '/rest/api/2/events',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be
   * applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties
   * set. *
   *
   * - The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue
   *   or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These are
   *   the same fields that appear on the issue's create screen.
   * -
   * - Creating a subtask differs from creating an issue as follows:
   * -
   * - - `issueType` must be set to a subtask issue type (use [ Get create issue
   *       metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   * - - `parent` must contain the ID or key of the parent issue.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
   *   which the issue or subtask is created.
   */
  async createIssue(parameters: CreateIssueParameters) {
    const request: Request = {
      url: '/rest/api/2/issue',
      method: 'POST',
      query: {
        updateHistory: parameters.updateHistory,
      },
      body: {
        fields: parameters.fields,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
        transition: parameters.transition,
        update: parameters.update,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Enables admins to archive up to 100,000 issues in a single request using JQL, returning the URL to check the status
   * of the submitted request. *
   *
   * - You can use the [get
   *   task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-rest-api-3-task-taskid-get)
   *   and [cancel
   *   task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-rest-api-3-task-taskid-cancel-post)
   *   APIs to manage the request.
   * -
   * - **Note that:**
   * -
   * - - You can't archive subtasks directly, only through their parent issues
   * - - You can only archive issues from software, service management, and business projects
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   *   admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   * -
   * - **License required:** Premium or Enterprise
   * -
   * - **Signed-in users only:** This API can't be accessed anonymously.
   * -
   * - **Rate limiting:** Only a single request per jira instance can be active at any given time.
   * -
   * -
   * -
   */
  async archiveIssuesAsync(parameters: ArchiveIssuesAsyncParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/archive',
      method: 'POST',
      body: {
        jql: parameters.jql,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Enables admins to archive up to 1000 issues in a single request using issue ID/key, returning details of the
   * issue(s) archived in the process and the errors encountered, if any. *
   *
   * - **Note that:**
   * -
   * - - You can't archive subtasks directly, only through their parent issues
   * - - You can only archive issues from software, service management, and business projects
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   *   admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   * -
   * - **License required:** Premium or Enterprise
   * -
   * - **Signed-in users only:** This API can't be accessed anonymously.
   * -
   * -
   * -
   */
  async archiveIssues(parameters: ArchiveIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/archive',
      method: 'PUT',
      body: {
        issueIdsOrKeys: parameters.issueIdsOrKeys,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may
   * be applied, to move the issues or subtasks to a workflow step other than the default start step, and issue
   * properties set. *
   *
   * - The content of each issue or subtask is defined using `update` and `fields`. The fields that can be set in the
   *   issue or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get).
   *   These are the same fields that appear on the issues' create screens.
   * -
   * - Creating a subtask differs from creating an issue as follows:
   * -
   * - - `issueType` must be set to a subtask issue type (use [ Get create issue
   *       metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   * - - `parent` the must contain the ID or key of the parent issue.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ and _Create issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in
   *   which each issue or subtask is created.
   */
  async createIssues(parameters: CreateIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/bulk',
      method: 'POST',
      body: {
        issueUpdates: parameters.issueUpdates,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the details for a set of requested issues. You can request up to 100 issues. *
   *
   * - Each issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
   *   search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or
   *   other redirect is **not** returned.
   * -
   * - Issues will be returned in ascending `id` order. If there are errors, Jira will return a list of issues which
   *   couldn't be fetched along with error messages.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issues
   *   are included in the response where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async bulkFetchIssues(parameters: BulkFetchIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/bulkfetch',
      method: 'POST',
      body: {
        expand: parameters.expand,
        fields: parameters.fields,
        fieldsByKeys: parameters.fieldsByKeys,
        issueIdsOrKeys: parameters.issueIdsOrKeys,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a page of issue type metadata for a specified project. Use the information to populate the requests in [
   * Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post). *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   *   issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMetaIssueTypes(parameters: GetCreateIssueMetaIssueTypesParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/createmeta/${parameters.projectIdOrKey}/issuetypes`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the
   * requests in [ Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post). *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Create
   *   issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.
   */
  async getCreateIssueMetaIssueTypeId(parameters: GetCreateIssueMetaIssueTypeIdParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/createmeta/${parameters.projectIdOrKey}/issuetypes/${parameters.issueTypeId}`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all issues breaching and approaching per-issue limits. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) is required for the project the
   *       issues are in. Results may be incomplete otherwise
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueLimitReport(parameters: GetIssueLimitReportParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/limit/report',
      method: 'GET',
      query: {
        isReturningKeys: parameters.isReturningKeys,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Enables admins to unarchive up to 1000 issues in a single request using issue ID/key, returning details of the
   * issue(s) unarchived in the process and the errors encountered, if any. *
   *
   * - **Note that:**
   * -
   * - - You can't unarchive subtasks directly, only through their parent issues
   * - - You can only unarchive issues from software, service management, and business projects
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   *   admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   * -
   * - **License required:** Premium or Enterprise
   * -
   * - **Signed-in users only:** This API can't be accessed anonymously.
   * -
   * -
   * -
   */
  async unarchiveIssues(parameters: UnarchiveIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/issue/unarchive',
      method: 'PUT',
      body: {
        issueIdsOrKeys: parameters.issueIdsOrKeys,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue. *
   *
   * - An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`.
   *   This causes the issue's subtasks to be deleted with the issue.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Delete issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *       project containing the issue.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async deleteIssue(parameters: DeleteIssueParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'DELETE',
      query: {
        deleteSubtasks: parameters.deleteSubtasks,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the details for an issue. *
   *
   * - The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive
   *   search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or
   *   other redirect is **not** returned. The issue key returned in the response is the key of the issue found.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async getIssue(parameters: GetIssueParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'GET',
      query: {
        fields: parameters.fields,
        fieldsByKeys: parameters.fieldsByKeys,
        expand: parameters.expand,
        properties: parameters.properties,
        updateHistory: parameters.updateHistory,
        failFast: parameters.failFast,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not
   * supported and is ignored here. To transition an issue, please use [Transition
   * issue](#api-rest-api-2-issue-issueIdOrKey-transitions-post). *
   *
   * - The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are
   *   determined using [ Get edit issue metadata](#api-rest-api-2-issue-issueIdOrKey-editmeta-get).
   * -
   * - The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting
   *   `update.parent.set.none` to _true_.
   * -
   * - Connect apps having an app user with _Administer Jira_ [global
   *   permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
   *   Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can override the screen security
   *   configuration using `overrideScreenSecurity` and `overrideEditableFlag`.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *       that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async editIssue(parameters: EditIssueParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'PUT',
      query: {
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

    return this.client.sendRequest(request);
  }

  /**
   * Assigns an issue to a user. Use this operation when the calling user does not have the _Edit Issues_ permission but
   * has the _Assign issue_ permission for the project that the issue is in. *
   *
   * - If `name` or `accountId` is set to:
   * -
   * - - `"-1"`, the issue is assigned to the default assignee for the project.
   * - - `null`, the issue is set to unassigned.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse Projects_ and _Assign Issues_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *       project that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async assignIssue(parameters: AssignIssueParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/assignee`,
      method: 'PUT',
      body: {
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

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * changelogs for an issue sorted by date, starting from the oldest. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async getChangeLogs(parameters: GetChangeLogsParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/changelog`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns changelogs for an issue specified by a list of changelog IDs. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async getChangeLogsByIds(parameters: GetChangeLogsByIdsParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/changelog/list`,
      method: 'POST',
      body: {
        changelogIds: parameters.changelogIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to
   * populate the requests in [Edit issue](#api-rest-api-2-issue-issueIdOrKey-put). *
   *
   * - This endpoint will check for these conditions:
   * -
   * - 1. Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type
   *        scheme configuration. `overrideScreenSecurity=true` skips this condition.
   * - 2. Field is visible in the [field
   *        configuration](https://support.atlassian.com/jira-cloud-administration/docs/change-a-field-configuration/).
   *        `overrideScreenSecurity=true` skips this condition.
   * - 3. Field is shown on the issue: each field has different conditions here. For example: Attachment field only shows if
   *        attachments are enabled. Assignee only shows if user has permissions to assign the issue.
   * - 4. If a field is custom then it must have valid custom field context, applicable for its project and issue type. All
   *        system fields are assumed to have context in all projects and all issue types.
   * - 5. Issue has a project, issue type, and status defined.
   * - 6. Issue is assigned to a valid workflow, and the current status has assigned a workflow step.
   *        `overrideEditableFlag=true` skips this condition.
   * - 7. The current workflow step is editable. This is true by default, but [can be disabled by
   *        setting](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) the
   *        `jira.issue.editable` property to `false`. `overrideEditableFlag=true` skips this condition.
   * - 8. User has [Edit issues
   *        permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/).
   * - 9. Workflow permissions allow editing a field. This is true by default but [can be
   *        modified](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) using
   *        `jira.permission.*` workflow properties.
   * -
   * - Fields hidden using [Issue layout settings
   *   page](https://support.atlassian.com/jira-software-cloud/docs/configure-field-layout-in-the-issue-view/) remain
   *   editable.
   * -
   * - Connect apps having an app user with _Administer Jira_ [global
   *   permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with _Administer
   *   Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), can return additional details using:
   * -
   * - - `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available
   *       through screens, and field configuration (conditions 1. and 2. from the list above).
   * - - `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if
   *       the current step is editable (conditions 6. and 7. from the list above).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * -
   * - Note: For any fields to be editable the user must have the _Edit issues_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the issue.
   */
  async getEditIssueMeta(parameters: GetEditIssueMetaParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/editmeta`,
      method: 'GET',
      query: {
        overrideScreenSecurity: parameters.overrideScreenSecurity,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates an email notification for an issue and adds it to the mail queue. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async notify(parameters: NotifyParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/notify`,
      method: 'POST',
      body: {
        htmlBody: parameters.htmlBody,
        restrict: parameters.restrict,
        subject: parameters.subject,
        textBody: parameters.textBody,
        to: parameters.to,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's
   * status. *
   *
   * - Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its
   *   status, the response will return any empty transitions list.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required: A list or
   *   transition is returned only when the user has:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * -
   * - However, if the user does not have the _Transition issues_ [ project
   *   permission](https://confluence.atlassian.com/x/yodKLg) the response will not list any transitions.
   */
  async getTransitions(parameters: GetTransitionsParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'GET',
      query: {
        expand: parameters.expand,
        transitionId: parameters.transitionId,
        skipRemoteOnlyCondition: parameters.skipRemoteOnlyCondition,
        includeUnavailableTransitions: parameters.includeUnavailableTransitions,
        sortByOpsBarAndStatus: parameters.sortByOpsBarAndStatus,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen. *
   *
   * - SortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update`
   *   parameters in the request body. Get details about the fields using [ Get
   *   transitions](#api-rest-api-2-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Transition issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *       project that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async doTransition(parameters: DoTransitionParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'POST',
      body: {
        fields: parameters.fields,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
        transition: parameters.transition,
        update: parameters.update,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Enables admins to retrieve details of all archived issues. Upon a successful request, the admin who submitted it
   * will receive an email with a link to download a CSV file with the issue details. *
   *
   * - Note that this API only exports the values of system fields and archival-specific fields (`ArchivedBy` and
   *   `ArchivedDate`). Custom fields aren't supported.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Jira
   *   admin or site admin: [global permission](https://confluence.atlassian.com/x/x4dKLg)
   * -
   * - **License required:** Premium or Enterprise
   * -
   * - **Signed-in users only:** This API can't be accessed anonymously.
   * -
   * - **Rate limiting:** Only a single request can be active at any given time.
   * -
   * -
   * -
   */
  async exportArchivedIssues(parameters: ExportArchivedIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/issues/archive/export',
      method: 'PUT',
      body: {
        archivedBy: parameters.archivedBy,
        archivedDateRange: parameters.archivedDateRange,
        issueTypes: parameters.issueTypes,
        projects: parameters.projects,
        reporters: parameters.reporters,
      },
    };

    return this.client.sendRequest(request);
  }
}
