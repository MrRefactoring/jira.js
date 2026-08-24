import { z } from 'zod';

export const DeleteDraftByIdSchema = z.object({
  /** The id of the parent scheme. */
  id: z.number(),
});

export type DeleteDraftById = z.input<typeof DeleteDraftByIdSchema>;
