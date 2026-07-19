import { z } from 'zod';
import { apiObject } from '#/core';
/** List of project permissions and the projects and issues those permissions grant access to. */

export const BulkProjectPermissionGrantsSchema = apiObject({
  /** IDs of the issues the user has the permission for. */
  issues: z.array(z.number()),
  /** A project permission, */
  permission: z.string(),
  /** IDs of the projects the user has the permission for. */
  projects: z.array(z.number()),
});

export type BulkProjectPermissionGrants = z.infer<typeof BulkProjectPermissionGrantsSchema>;
