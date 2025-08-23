import { z } from 'zod';

/** Details of project permissions and associated issues and projects to look up. */
export const BulkProjectPermissionsSchema = z.object({
  /** List of issue IDs. */
  issues: z.array(z.number().int()).optional(),
  /** List of project permissions. */
  permissions: z.array(z.string()),
  /** List of project IDs. */
  projects: z.array(z.number().int()).optional(),
});

export type BulkProjectPermissions = z.infer<typeof BulkProjectPermissionsSchema>;
