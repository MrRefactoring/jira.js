import { z } from 'zod';
import { PermissionHolderSchema } from '#/models/permissionHolder';

/** Details about a permission granted to a user or group. */
export const PermissionGrantSchema = z.object({
  holder: PermissionHolderSchema.optional(),
  /** The ID of the permission granted details. */
  id: z.number().optional(),
  /**
   * The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an
   * app. See [Built-in
   * permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#built-in-permissions)
   * in _Get all permission schemes_ for more information about the built-in permissions. See the [project
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation
   * for more information about custom permissions.
   */
  permission: z.string().optional(),
  /** The URL of the permission granted details. */
  self: z.url().optional(),
});

export type PermissionGrant = z.infer<typeof PermissionGrantSchema>;
