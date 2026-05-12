import { z } from 'zod';
import { BulkChangeOwnerDetailsSchema } from '#/models/bulkChangeOwnerDetails';
import { PermissionDetailsSchema } from '#/models/permissionDetails';

/** Details of a request to bulk edit shareable entity. */
export const BulkEditShareableEntityRequestSchema = z.object({
  /** Allowed action for bulk edit shareable entity */
  action: z.enum(['changeOwner', 'changePermission', 'addPermission', 'removePermission']),
  changeOwnerDetails: BulkChangeOwnerDetailsSchema.optional(),
  /** The id list of shareable entities to be changed. */
  entityIds: z.array(z.number()),
  /** Whether the actions are executed by users with Administer Jira global permission. */
  extendAdminPermissions: z.boolean().optional(),
  permissionDetails: PermissionDetailsSchema.optional(),
});

export type BulkEditShareableEntityRequest = z.infer<typeof BulkEditShareableEntityRequestSchema>;
