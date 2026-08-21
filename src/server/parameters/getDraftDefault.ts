import { z } from 'zod';

export const GetDraftDefaultSchema = z.object({
  /** The id of the parent scheme. */
  id: z.number(),
});

export type GetDraftDefault = z.input<typeof GetDraftDefaultSchema>;
