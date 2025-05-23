import type { Id } from '../models';

export interface AssignPermissionScheme extends Id {
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Note that permissions are included when
   * you specify any value. Expand options include:
   *
   * - `all` Returns all expandable information.
   * - `field` Returns information about the custom field granted the permission.
   * - `group` Returns information about the group that is granted the permission.
   * - `permissions` Returns all permission grants for each permission scheme.
   * - `projectRole` Returns information about the project role granted the permission.
   * - `user` Returns information about the user who is granted the permission.
   */
  expand?:
    | 'all'
    | 'field'
    | 'group'
    | 'permissions'
    | 'projectRole'
    | 'user'
    | ('all' | 'field' | 'group' | 'permissions' | 'projectRole' | 'user')[]
    | string
    | string[];
}
