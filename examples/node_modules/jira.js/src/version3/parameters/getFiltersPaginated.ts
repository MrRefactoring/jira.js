export interface GetFiltersPaginated {
  /** String used to perform a case-insensitive partial match with `name`. */
  filterName?: string;
  /**
   * User account ID used to return filters with the matching `owner.accountId`. This parameter cannot be used with
   * `owner`.
   */
  accountId?: string;
  /**
   * As a group's name can change, use of `groupId` is recommended to identify a group. Group name used to returns
   * filters that are shared with a group that matches `sharePermissions.group.groupname`. This parameter cannot be used
   * with the `groupId` parameter.
   */
  groupname?: string;
  /**
   * Group ID used to returns filters that are shared with a group that matches `sharePermissions.group.groupId`. This
   * parameter cannot be used with the `groupname` parameter.
   */
  groupId?: string;
  /** Project ID used to returns filters that are shared with a project that matches `sharePermissions.project.id`. */
  projectId?: number;
  /**
   * The list of filter IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`. Do not exceed 200 filter IDs.
   */
  id?: number[];
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `description` Sorts by filter description. Note that this sorting works independently of whether the expand to
   *   display the description field is in use.
   * - `favourite_count` Sorts by the count of how many users have this filter as a favorite.
   * - `is_favourite` Sorts by whether the filter is marked as a favorite.
   * - `id` Sorts by filter ID.
   * - `name` Sorts by filter name.
   * - `owner` Sorts by the ID of the filter owner.
   * - `is_shared` Sorts by whether the filter is shared.
   */
  orderBy?:
    | 'description'
    | '-description'
    | '+description'
    | 'favourite_count'
    | '-favourite_count'
    | '+favourite_count'
    | 'id'
    | '-id'
    | '+id'
    | 'is_favourite'
    | '-is_favourite'
    | '+is_favourite'
    | 'name'
    | '-name'
    | '+name'
    | 'owner'
    | '-owner'
    | '+owner'
    | 'is_shared'
    | '-is_shared'
    | '+is_shared'
    | string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about filter in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `description` Returns the description of the filter.
   * - `favourite` Returns an indicator of whether the user has set the filter as a favorite.
   * - `favouritedCount` Returns a count of how many users have set this filter as a favorite.
   * - `jql` Returns the JQL query that the filter uses.
   * - `owner` Returns the owner of the filter.
   * - `searchUrl` Returns a URL to perform the filter's JQL query.
   * - `sharePermissions` Returns the share permissions defined for the filter.
   * - `editPermissions` Returns the edit permissions defined for the filter.
   * - `isWritable` Returns whether the current user has permission to edit the filter.
   * - `approximateLastUsed` [Experimental] Returns the approximate date and time when the filter was last evaluated.
   * - `subscriptions` Returns the users that are subscribed to the filter.
   * - `viewUrl` Returns a URL to view the filter.
   */
  expand?:
    | 'description'
    | 'favourite'
    | 'favouritedCount'
    | 'jql'
    | 'owner'
    | 'searchUrl'
    | 'sharePermissions'
    | 'editPermissions'
    | 'isWritable'
    | 'approximateLastUsed'
    | 'subscriptions'
    | 'viewUrl'
    | (
        | 'description'
        | 'favourite'
        | 'favouritedCount'
        | 'jql'
        | 'owner'
        | 'searchUrl'
        | 'sharePermissions'
        | 'editPermissions'
        | 'isWritable'
        | 'approximateLastUsed'
        | 'subscriptions'
        | 'viewUrl'
    )[]
    | string
    | string[];
  /**
   * @experimental EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned.
   * Available to users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideSharePermissions?: boolean;
  /**
   * When `true` this will perform a case-insensitive substring match for the provided `filterName`. When `false` the
   * filter name will be searched using [full text search
   * syntax](https://support.atlassian.com/jira-software-cloud/docs/search-for-issues-using-the-text-field/).
   */
  isSubstringMatch?: boolean;
}
