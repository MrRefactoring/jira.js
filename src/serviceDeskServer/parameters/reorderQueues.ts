import { z } from 'zod';

export const ReorderQueuesSchema = z.object({
  /** The ID of the service project. */
  serviceDeskId: z.string(),
  body: z.string().optional(),
});

export type ReorderQueues = z.input<typeof ReorderQueuesSchema>;
