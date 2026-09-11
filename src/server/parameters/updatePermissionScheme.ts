import { z } from 'zod';
import { PermissionSchemeSchema } from '../models';

export const UpdatePermissionSchemeSchema = z.object({
  /**
   * Use expand to include full beans in the response. This parameter accepts a comma-separated list of expandable
   * elements. Use 'permissions' to include permissions in the response.
   */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** The id of the permission scheme. */
  schemeId: z.number(),
  body: PermissionSchemeSchema.optional(),
});

export type UpdatePermissionScheme = z.input<typeof UpdatePermissionSchemeSchema>;
