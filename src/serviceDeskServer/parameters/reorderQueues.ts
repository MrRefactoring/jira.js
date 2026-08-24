import { z } from 'zod';

export const ReorderQueuesSchema = z.object({
  /** The ID of the service project. */
  serviceDeskId: z.string(),
  body: z.array(z.number()),
});

export type ReorderQueues = z.input<typeof ReorderQueuesSchema>;
