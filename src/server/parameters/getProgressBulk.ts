import { z } from 'zod';

export const GetProgressBulkSchema = z.object({
  /** The reindex request IDs. */
  requestId: z.array(z.number()).optional(),
});

export type GetProgressBulk = z.input<typeof GetProgressBulkSchema>;
