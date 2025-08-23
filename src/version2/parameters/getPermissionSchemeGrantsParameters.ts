import { z } from 'zod';

export const GetPermissionSchemeGrantsParametersSchema = z.object({
  /** The ID of the permission scheme. */
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
});

export type GetPermissionSchemeGrantsParameters = z.infer<typeof GetPermissionSchemeGrantsParametersSchema>;
