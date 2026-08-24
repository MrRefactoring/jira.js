import { z } from 'zod';

export const CreateDraftForParentSchema = z.object({
  /** The id of the parent scheme. */
  id: z.number(),
});

export type CreateDraftForParent = z.input<typeof CreateDraftForParentSchema>;
