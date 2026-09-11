import { z } from 'zod';

export const GetReindexRequestProgressSchema = z.object({
  /** The reindex request ID. */
  requestId: z.number(),
});

export type GetReindexRequestProgress = z.input<typeof GetReindexRequestProgressSchema>;
