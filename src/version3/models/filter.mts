import { FilterSubscriptionsList } from './filterSubscriptionsList.mjs';
import type { SharePermission } from './sharePermission.mjs';
import { User } from './user.mjs';
import { UserList } from './userList.mjs';

/** Details about a filter. */
export interface Filter {
  /** The URL of the filter. */
  self?: string;
  /** The unique identifier for the filter. */
  id?: string;
  /** The name of the filter. Must be unique. */
  name: string;
  /** A description of the filter. */
  description?: string;
  owner?: User;
  /** The Jql query for the filter. For example, _project = SSP AND issuetype = Bug_. */
  jql?: string;
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For example,
   * _https://your-domain.atlassian.net/issues/?filter=10100_.
   */
  viewUrl?: string;
  /**
   * A URL to view the filter results in Jira, using the [Search for issues using
   * Jql](#api-rest-api-3-filter-search-get) operation with the filter's Jql string to return the filter results. For
   * example, _https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug_.
   */
  searchUrl?: string;
  /** Whether the filter is selected as a favorite. */
  favourite?: boolean;
  /** The count of how many users have selected this filter as a favorite, including the filter owner. */
  favouritedCount?: number;
  /** The groups and projects that the filter is shared with. */
  sharePermissions?: SharePermission[];
  /** The groups and projects that can edit the filter. */
  editPermissions?: SharePermission[];
  sharedUsers?: UserList;
  subscriptions?: FilterSubscriptionsList;
}
