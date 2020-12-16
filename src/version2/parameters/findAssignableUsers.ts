export interface FindAssignableUsers {
  /** A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `username` or `accountId` is specified. */
  query?: string;
  /** The sessionId of this request. SessionId is the same until the assignee is set. */
  sessionId?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId?: string;
  /** The project ID or project key (case sensitive). Required, unless `issueKey` is specified. */
  project?: string;
  /** The key of the issue. Required, unless `project` is specified. */
  issueKey?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return. This operation may return less than the maximum number of items even if more are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the users that can be assigned to the issue. */
  maxResults?: number;
  /** The ID of the transition. */
  actionDescriptorId?: number;
  recommend?: boolean;
}
