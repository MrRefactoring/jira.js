import { z } from 'zod';

export const GetPermissionSchemeGrantSchema = z.object({
  /** The id of the permission grant. */
  permissionId: z.number(),
  /**
   * Use expand to include full beans in the response. This parameter accepts a comma-separated list of expandable
   * elements. Use 'permissions' to include permissions in the response.
   */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** The id of the permission scheme. */
  schemeId: z.number(),
});

export type GetPermissionSchemeGrant = z.input<typeof GetPermissionSchemeGrantSchema>;
