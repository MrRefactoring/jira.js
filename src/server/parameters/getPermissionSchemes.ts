import { z } from 'zod';

export const GetPermissionSchemesSchema = z.object({
  /**
   * Use expand to include full beans in the response. This parameter accepts a comma-separated list of expandable
   * elements. Use 'permissions' to include permissions in the response.
   */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
});

export type GetPermissionSchemes = z.input<typeof GetPermissionSchemesSchema>;
