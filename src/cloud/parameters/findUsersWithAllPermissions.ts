import { z } from 'zod';

export const FindUsersWithAllPermissionsSchema = z.object({
  /**
   * A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant
   * users. The string can match the prefix of the attribute's value. For example, _query=john_ matches a user with a
   * `displayName` of _John Smith_ and a user with an `emailAddress` of _johnson@example.com_. Required, unless
   * `accountId` is specified.
   */
  query: z.string().optional(),
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
  /**
   * A comma separated list of permissions. Permissions can be specified as any:
   *
   * - Permission returned by [Get all
   *   permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions/#api-rest-api-3-permissions-get).
   * - Custom project permission added by Connect apps.
   * - (deprecated) one of the following:
   *
   *   - ASSIGNABLE_USER
   *   - ASSIGN_ISSUE
   *   - ATTACHMENT_DELETE_ALL
   *   - ATTACHMENT_DELETE_OWN
   *   - BROWSE
   *   - CLOSE_ISSUE
   *   - COMMENT_DELETE_ALL
   *   - COMMENT_DELETE_OWN
   *   - COMMENT_EDIT_ALL
   *   - COMMENT_EDIT_OWN
   *   - COMMENT_ISSUE
   *   - CREATE_ATTACHMENT
   *   - CREATE_ISSUE
   *   - DELETE_ISSUE
   *   - EDIT_ISSUE
   *   - LINK_ISSUE
   *   - MANAGE_WATCHER_LIST
   *   - MODIFY_REPORTER
   *   - MOVE_ISSUE
   *   - PROJECT_ADMIN
   *   - RESOLVE_ISSUE
   *   - SCHEDULE_ISSUE
   *   - SET_ISSUE_SECURITY
   *   - TRANSITION_ISSUE
   *   - VIEW_VERSION_CONTROL
   *   - VIEW_VOTERS_AND_WATCHERS
   *   - VIEW_WORKFLOW_READONLY
   *   - WORKLOG_DELETE_ALL
   *   - WORKLOG_DELETE_OWN
   *   - WORKLOG_EDIT_ALL
   *   - WORKLOG_EDIT_OWN
   *   - WORK_ISSUE
   */
  permissions: z.string(),
  /** The issue key for the issue. */
  issueKey: z.string().optional(),
  /** The project key for the project (case sensitive). */
  projectKey: z.string().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type FindUsersWithAllPermissions = z.input<typeof FindUsersWithAllPermissionsSchema>;
