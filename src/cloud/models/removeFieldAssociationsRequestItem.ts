import { z } from 'zod';
import { apiObject } from '#/core';
/** Request item for removing field associations. */

export const RemoveFieldAssociationsRequestItemSchema = apiObject({
  /** Set of scheme IDs from which to remove field associations */
  schemeIds: z.array(z.number()),
});

export type RemoveFieldAssociationsRequestItem = z.infer<typeof RemoveFieldAssociationsRequestItemSchema>;
