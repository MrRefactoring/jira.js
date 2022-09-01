export interface GetDashboardsPaginated {
  /** String used to perform a case-insensitive partial match with `name`. */
  dashboardName?: string;
  /**
   * User account ID used to return dashboards with the matching `owner.accountId`. This parameter cannot be used with
   * the `owner` parameter.
   */
  accountId?: string;
  /**
   * @deprecated This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration
   *   guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   *   for details. User name used to return dashboards with the matching `owner.name`. This parameter cannot be used
   *   with the `accountId` parameter.
   */
  owner?: string;
  /**
   * As a group's name can change, use of `groupId` is recommended. Group name used to return dashboards that are shared
   * with a group that matches `sharePermissions.group.name`. This parameter cannot be used with the `groupId`
   * parameter.
   */
  groupname?: string;
  /**
   * Group ID used to return dashboards that are shared with a group that matches `sharePermissions.group.groupId`. This
   * parameter cannot be used with the `groupname` parameter.
   */
  groupId?: string;
  /** Project ID used to returns dashboards that are shared with a project that matches `sharePermissions.project.id`. */
  projectId?: number;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `description` Sorts by dashboard description. Note that this sort works independently of whether the expand to
   *   display the description field is in use.
   * - `favourite_count` Sorts by dashboard popularity.
   * - `id` Sorts by dashboard ID.
   * - `is_favourite` Sorts by whether the dashboard is marked as a favorite.
   * - `name` Sorts by dashboard name.
   * - `owner` Sorts by dashboard owner name.
   */
  orderBy?:
  | 'description'
  | 'favourite_count'
  | 'id'
  | 'is_favourite'
  | 'name'
  | 'owner'
  | '-description'
  | '-favourite_count'
  | '-id'
  | '-is_favourite'
  | '-name'
  | '-owner'
  | '+description'
  | '+favourite_count'
  | '+id'
  | '+is_favourite'
  | '+name'
  | '+owner'
  | string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The status to filter by. It may be active, archived or deleted. */
  status?: 'active' | 'archived' | 'deleted' | string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about dashboard in the response. This parameter accepts a comma-separated list. Expand options
   * include:
   *
   * - `description` Returns the description of the dashboard.
   * - `owner` Returns the owner of the dashboard.
   * - `viewUrl` Returns the URL that is used to view the dashboard.
   * - `favourite` Returns `isFavourite`, an indicator of whether the user has set the dashboard as a favorite.
   * - `favouritedCount` Returns `popularity`, a count of how many users have set this dashboard as a favorite.
   * - `sharePermissions` Returns details of the share permissions defined for the dashboard.
   * - `editPermissions` Returns details of the edit permissions defined for the dashboard.
   * - `isWritable` Returns whether the current user has permission to edit the dashboard.
   */
  expand?:
  | 'description'
  | 'owner'
  | 'viewUrl'
  | 'favourite'
  | 'favouritedCount'
  | 'sharePermissions'
  | 'editPermissions'
  | 'isWritable'
  | (
    | 'description'
    | 'owner'
    | 'viewUrl'
    | 'favourite'
    | 'favouritedCount'
    | 'sharePermissions'
    | 'editPermissions'
    | 'isWritable'
  )[]
  | string
  | string[];
}
