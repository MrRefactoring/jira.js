import { z } from 'zod';

export const DeleteQueueSchema = z.object({
  /** The id of the queue. */
  queueId: z.string(),
  /** The ID of the service project. */
  serviceDeskId: z.string(),
});

export type DeleteQueue = z.input<typeof DeleteQueueSchema>;
