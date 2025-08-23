import { z } from 'zod';

export const GetPermissionSchemeParametersSchema = z.object({
  /** The ID of the permission scheme to return. */
  schemeId: z.number().int(),
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note
   * that permissions are included when you specify any value. Expand options include:
   *
   * - `all` Returns all expandable information.
   * - `field` Returns information about the custom field granted the permission.
   * - `group` Returns information about the group that is granted the permission.
   * - `permissions` Returns all permission grants for each permission scheme.
   * - `projectRole` Returns information about the project role granted the permission.
   * - `user` Returns information about the user who is granted the permission.
   */
  expand: z.string().optional(),
});

export type GetPermissionSchemeParameters = z.infer<typeof GetPermissionSchemeParametersSchema>;
