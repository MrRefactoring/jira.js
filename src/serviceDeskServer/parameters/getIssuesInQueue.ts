import { z } from 'zod';

export const GetIssuesInQueueSchema = z.object({
  /** The id of the queue. */
  queueId: z.string(),
  /** The ID of the service project. */
  serviceDeskId: z.string(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetIssuesInQueue = z.input<typeof GetIssuesInQueueSchema>;
