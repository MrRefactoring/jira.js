import { z } from 'zod';
import { PermissionGrantSchema } from './permissionGrant';

export const UpdatePermissionSchemeParametersSchema = z.object({
  /** The ID of the permission scheme to update. */
  schemeId: z.number().int(),
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note
   * that permissions are always included when you specify any value. Expand options include:
   *
   * - `all` Returns all expandable information.
   * - `field` Returns information about the custom field granted the permission.
   * - `group` Returns information about the group that is granted the permission.
   * - `permissions` Returns all permission grants for each permission scheme.
   * - `projectRole` Returns information about the project role granted the permission.
   * - `user` Returns information about the user who is granted the permission.
   */
  expand: z.string().optional(),
  /** A description for the permission scheme. */
  description: z.string().optional(),
  /** The expand options available for the permission scheme. */
  expand: z.string().optional(),
  /** The ID of the permission scheme. */
  id: z.number().int().optional(),
  /** The name of the permission scheme. Must be unique. */
  name: z.string(),
  /**
   * The permission scheme to create or update. See [About permission schemes and
   * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information.
   */
  permissions: z.array(PermissionGrantSchema).optional(),
  /** The scope of the permission scheme. */
  scope: z.unknown().optional(),
  /** The URL of the permission scheme. */
  self: z.string().optional(),
});

export type UpdatePermissionSchemeParameters = z.infer<typeof UpdatePermissionSchemeParametersSchema>;
