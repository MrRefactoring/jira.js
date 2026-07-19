import { z } from 'zod';

export const GetQueueSchema = z.object({
  /**
   * ID of the service desk whose queues will be returned. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  /** ID of the required queue. */
  queueId: z.number(),
  /** Specifies whether to include each queue's customer request (issue) count in the response. */
  includeCount: z.boolean().optional(),
});

export type GetQueue = z.input<typeof GetQueueSchema>;
