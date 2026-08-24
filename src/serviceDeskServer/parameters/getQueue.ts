import { z } from 'zod';

export const GetQueueSchema = z.object({
  /** The id of the queue. */
  queueId: z.string(),
  /** The ID of the service project. */
  serviceDeskId: z.string(),
  /** Specifies whether to include the issue count of queue in the response. Valid values: true/false. Default: false. */
  includeCount: z.string().optional(),
});

export type GetQueue = z.input<typeof GetQueueSchema>;
