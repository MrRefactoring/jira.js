import { z } from 'zod';
import { QueueCreateSchema } from '../models';

export const CreateQueueSchema = z.object(QueueCreateSchema.shape).extend({
  /** The ID of the service project. */
  serviceDeskId: z.string(),
});

export type CreateQueue = z.input<typeof CreateQueueSchema>;
