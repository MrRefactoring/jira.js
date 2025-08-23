import { z } from 'zod';

/** List of project permissions and the projects and issues those permissions grant access to. */
export const BulkProjectPermissionGrantsSchema = z.object({
  /** IDs of the issues the user has the permission for. */
  issues: z.array(z.number().int()),
  /** A project permission, */
  permission: z.string(),
  /** IDs of the projects the user has the permission for. */
  projects: z.array(z.number().int()),
});

export type BulkProjectPermissionGrants = z.infer<typeof BulkProjectPermissionGrantsSchema>;
