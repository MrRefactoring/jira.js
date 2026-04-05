import { z } from 'zod';

/** Details of a request to bulk edit shareable entity. */
export const BulkEditShareableEntityResponseSchema = z.object({
  /** Allowed action for bulk edit shareable entity */
  action: z.enum(['changeOwner', 'changePermission', 'addPermission', 'removePermission']),
  /** The mapping dashboard id to errors if any. */
  entityErrors: z.record(z.string(), z.any()).optional(),
});

export type BulkEditShareableEntityResponse = z.infer<typeof BulkEditShareableEntityResponseSchema>;
