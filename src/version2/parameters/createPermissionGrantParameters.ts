import { z } from 'zod';

export const CreatePermissionGrantParametersSchema = z.object({
  /** The ID of the permission scheme in which to create a new permission grant. */
  schemeId: z.number().int(),
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note
   * that permissions are always included when you specify any value. Expand options include:
   *
   * - `permissions` Returns all permission grants for each permission scheme.
   * - `user` Returns information about the user who is granted the permission.
   * - `group` Returns information about the group that is granted the permission.
   * - `projectRole` Returns information about the project role granted the permission.
   * - `field` Returns information about the custom field granted the permission.
   * - `all` Returns all expandable information.
   */
  expand: z.string().optional(),
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

export type CreatePermissionGrantParameters = z.infer<typeof CreatePermissionGrantParametersSchema>;
