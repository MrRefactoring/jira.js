import { z } from 'zod';
import { PermissionSchemeSchema } from '../models';

export const CreatePermissionSchemeSchema = z.object({
  /**
   * Use expand to include full beans in the response. This parameter accepts a comma-separated list of expandable
   * elements. Use 'permissions' to include permissions in the response.
   */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  body: PermissionSchemeSchema.optional(),
});

export type CreatePermissionScheme = z.input<typeof CreatePermissionSchemeSchema>;
