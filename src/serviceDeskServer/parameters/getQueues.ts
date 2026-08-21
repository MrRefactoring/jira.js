import { z } from 'zod';

export const GetQueuesSchema = z.object({
  /** The ID of the service project. */
  serviceDeskId: z.string(),
  /**
   * Specifies whether to include the issue count of each queue in the response. Valid values: true/false. Default:
   * false.
   */
  includeCount: z.string().optional(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetQueues = z.input<typeof GetQueuesSchema>;
