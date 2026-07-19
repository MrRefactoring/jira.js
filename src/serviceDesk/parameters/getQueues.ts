import { z } from 'zod';

export const GetQueuesSchema = z.object({
  /**
   * ID of the service desk whose queues will be returned. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  /** Specifies whether to include each queue's customer request (issue) count in the response. */
  includeCount: z.boolean().optional(),
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of items to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
});

export type GetQueues = z.input<typeof GetQueuesSchema>;
