import { z } from 'zod';

export const DeleteDraftDefaultSchema = z.object({
  /** The id of the parent scheme. */
  id: z.number(),
});

export type DeleteDraftDefault = z.input<typeof DeleteDraftDefaultSchema>;
