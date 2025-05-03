import type { SharePermission } from './sharePermission';
import type { User } from './user';
import type { UserList } from './userList';
import type { FilterSubscriptionsList } from './filterSubscriptionsList';

/** Details about a filter. */
export interface Filter {
  /**
   * @experimental [Experimental] Approximate last used time. Returns the date and time when the filter was last used. Returns `null`
   * if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in
   * real time and therefore may not be exactly accurate.
   */
  approximateLastUsed?: string;
  /** A description of the filter. */
  description?: string;
  /** The groups and projects that can edit the filter. */
  editPermissions?: SharePermission[];
  /** Whether the filter is selected as a favorite. */
  favourite?: boolean;
  /** The count of how many users have selected this filter as a favorite, including the filter owner. */
  favouritedCount?: number;
  /** The unique identifier for the filter. */
  id?: string;
  /** The JQL query for the filter. For example, _project = SSP AND issuetype = Bug_. */
  jql?: string;
  /** The name of the filter. Must be unique. */
  name: string;
  owner?: User;
  /**
   * A URL to view the filter results in Jira, using the [Search for issues using
   * JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string to return the filter results. For
   * example, _https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug_.
   */
  searchUrl?: string;
  /** The URL of the filter. */
  self?: string;
  /** The groups and projects that the filter is shared with. */
  sharePermissions?: SharePermission[];
  sharedUsers?: UserList;
  subscriptions?: FilterSubscriptionsList;
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For example,
   * _https://your-domain.atlassian.net/issues/?filter=10100_.
   */
  viewUrl?: string;
}
