import { z } from 'zod';

/** Details about a permission granted to a user or group. */
export const PermissionGrantSchema = z.object({
  /**
   * The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a
   * type-dependent `value`. See [Holder object](../api-group-permission-schemes/#holder-object) in _Get all permission
   * schemes_ for more information.
   */
  holder: z.unknown().optional(),
  /** The ID of the permission granted details. */
  id: z.number().int().optional(),
  /**
   * The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an
   * app. See [Built-in permissions](../api-group-permission-schemes/#built-in-permissions) in _Get all permission
   * schemes_ for more information about the built-in permissions. See the [project
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation
   * for more information about custom permissions.
   */
  permission: z.string().optional(),
  /** The URL of the permission granted details. */
  self: z.string().optional(),
});

export type PermissionGrant = z.infer<typeof PermissionGrantSchema>;
