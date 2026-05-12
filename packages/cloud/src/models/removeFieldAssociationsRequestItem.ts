import { z } from 'zod';

/** Request item for removing field associations. */
export const RemoveFieldAssociationsRequestItemSchema = z.object({
  /** Set of scheme IDs from which to remove field associations */
  schemeIds: z.array(z.number()),
});

export type RemoveFieldAssociationsRequestItem = z.infer<typeof RemoveFieldAssociationsRequestItemSchema>;
