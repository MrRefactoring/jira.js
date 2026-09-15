import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { BulkEditActionErrorSchema } from './bulkEditActionError';

/** Details of a request to bulk edit shareable entity. */
export const BulkEditShareableEntityResponseSchema = apiObject({
  /** Allowed action for bulk edit shareable entity */
  action: openEnum(['changeOwner', 'changePermission', 'addPermission', 'removePermission']),
  /** The mapping dashboard id to errors if any. */
  entityErrors: z.record(z.string(), BulkEditActionErrorSchema).optional(),
});

export type BulkEditShareableEntityResponse = z.infer<typeof BulkEditShareableEntityResponseSchema>;
