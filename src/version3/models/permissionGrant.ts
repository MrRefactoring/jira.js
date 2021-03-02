import { PermissionHolder } from './permissionHolder';

/**
 * Details about a permission granted to a user or group. */
export interface PermissionGrant {
  /** The ID of the permission granted details. */
  id?: number;
  /** The URL of the permission granted details. */
  self?: string;
  /** The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See [Holder object](#holder-object) in *Get all permission schemes* for more information. */
  holder?: PermissionHolder[];
  /** The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See [Built-in permissions](#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions. */
  permission?: string;
}
