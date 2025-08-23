import { z } from 'zod';

/** Details of a request to bulk edit shareable entity. */
export const BulkEditShareableEntityRequestSchema = z.object({
  /** Allowed action for bulk edit shareable entity */
  action: z.enum(['changeOwner', 'changePermission', 'addPermission', 'removePermission']),
  /** The details of change owner action. */
  changeOwnerDetails: z.unknown().optional(),
  /** The id list of shareable entities to be changed. */
  entityIds: z.array(z.number().int()),
  /** Whether the actions are executed by users with Administer Jira global permission. */
  extendAdminPermissions: z.boolean().optional(),
  /** The permission details to be changed. */
  permissionDetails: z.unknown().optional(),
});

export type BulkEditShareableEntityRequest = z.infer<typeof BulkEditShareableEntityRequestSchema>;
