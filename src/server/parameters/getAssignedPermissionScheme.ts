import { z } from 'zod';

export const GetAssignedPermissionSchemeSchema = z.object({
  /**
   * Use expand to include additional information about permission schemes in the response. This parameter accepts a
   * comma-separated list of expandable options. Expand options include: all and field.
   */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** Key or id of the project */
  projectKeyOrId: z.string(),
});

export type GetAssignedPermissionScheme = z.input<typeof GetAssignedPermissionSchemeSchema>;
