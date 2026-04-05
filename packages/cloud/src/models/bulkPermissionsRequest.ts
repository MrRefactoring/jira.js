import { z } from 'zod';
import { BulkProjectPermissionsSchema } from '#/models/bulkProjectPermissions';

/** Details of global permissions to look up and project permissions with associated projects and issues to look up. */
export const BulkPermissionsRequestSchema = z.object({
  /** The account ID of a user. */
  accountId: z.string().optional(),
  /** Global permissions to look up. */
  globalPermissions: z.array(z.string()).optional(),
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions: z.array(BulkProjectPermissionsSchema).optional(),
});

export type BulkPermissionsRequest = z.infer<typeof BulkPermissionsRequestSchema>;
