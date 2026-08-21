import { z } from 'zod';

export const GetDraftByIdSchema = z.object({
  /** The id of the parent scheme. */
  id: z.number(),
});

export type GetDraftById = z.input<typeof GetDraftByIdSchema>;
