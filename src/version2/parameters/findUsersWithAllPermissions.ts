export interface FindUsersWithAllPermissions {
  /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
  query?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId?: string;
  /** A comma separated list of permissions. Permissions can be specified as any:

   *  permission returned by [Get all permissions](#api-rest-api-2-permissions-get).
   *  custom project permission added by Connect apps.
   *  (deprecated) one of the following:

   *  ASSIGNABLE\_USER
   *  ASSIGN\_ISSUE
   *  ATTACHMENT\_DELETE\_ALL
   *  ATTACHMENT\_DELETE\_OWN
   *  BROWSE
   *  CLOSE\_ISSUE
   *  COMMENT\_DELETE\_ALL
   *  COMMENT\_DELETE\_OWN
   *  COMMENT\_EDIT\_ALL
   *  COMMENT\_EDIT\_OWN
   *  COMMENT\_ISSUE
   *  CREATE\_ATTACHMENT
   *  CREATE\_ISSUE
   *  DELETE\_ISSUE
   *  EDIT\_ISSUE
   *  LINK\_ISSUE
   *  MANAGE\_WATCHER\_LIST
   *  MODIFY\_REPORTER
   *  MOVE\_ISSUE
   *  PROJECT\_ADMIN
   *  RESOLVE\_ISSUE
   *  SCHEDULE\_ISSUE
   *  SET\_ISSUE\_SECURITY
   *  TRANSITION\_ISSUE
   *  VIEW\_VERSION\_CONTROL
   *  VIEW\_VOTERS\_AND\_WATCHERS
   *  VIEW\_WORKFLOW\_READONLY
   *  WORKLOG\_DELETE\_ALL
   *  WORKLOG\_DELETE\_OWN
   *  WORKLOG\_EDIT\_ALL
   *  WORKLOG\_EDIT\_OWN
   *  WORK\_ISSUE */
  permissions: string;
  /** The issue key for the issue. */
  issueKey?: string;
  /** The project key for the project (case sensitive). */
  projectKey?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
