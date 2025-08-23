import { z } from 'zod';
import { BulkProjectPermissionsSchema } from './bulkProjectPermissions';

export const GetBulkPermissionsParametersSchema = z.object({
  /** The account ID of a user. */
  accountId: z.string().optional(),
  /** Global permissions to look up. */
  globalPermissions: z.array(z.string()).optional(),
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions: z.array(BulkProjectPermissionsSchema).optional(),
});

export type GetBulkPermissionsParameters = z.infer<typeof GetBulkPermissionsParametersSchema>;
