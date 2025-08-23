import { z } from 'zod';
import { BulkProjectPermissionGrantsSchema } from './bulkProjectPermissionGrants';

/** Details of global and project permissions granted to the user. */
export const BulkPermissionGrantsSchema = z.object({
  /** List of permissions granted to the user. */
  globalPermissions: z.array(z.string()),
  /** List of project permissions and the projects and issues those permissions provide access to. */
  projectPermissions: z.array(BulkProjectPermissionGrantsSchema),
});

export type BulkPermissionGrants = z.infer<typeof BulkPermissionGrantsSchema>;
