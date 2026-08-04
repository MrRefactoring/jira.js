import { z } from 'zod';
import { apiObject } from '#/core';
/** Details for changing owners of shareable entities */

export const BulkChangeOwnerDetailsSchema = apiObject({
  /** Whether the name is fixed automatically if it's duplicated after changing owner. */
  autofixName: z.boolean(),
  /** The account id of the new owner. */
  newOwner: z.string(),
});

export type BulkChangeOwnerDetails = z.infer<typeof BulkChangeOwnerDetailsSchema>;
