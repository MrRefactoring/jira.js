import { z } from 'zod';

export const FindObjectHistorySchema = z.object({
  /** Should the history be retrieved in ascending order */
  asc: z.boolean().optional(),
  /** The object id to operate on */
  id: z.string(),
});

export type FindObjectHistory = z.input<typeof FindObjectHistorySchema>;
