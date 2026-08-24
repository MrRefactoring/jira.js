import { z } from 'zod';
import { QueueCreateSchema } from '../models';

export const UpdateQueueSchema = z.object(QueueCreateSchema.shape).extend({
  /** The id of the queue. */
  queueId: z.string(),
  /** The ID of the service project. */
  serviceDeskId: z.string(),
});

export type UpdateQueue = z.input<typeof UpdateQueueSchema>;
