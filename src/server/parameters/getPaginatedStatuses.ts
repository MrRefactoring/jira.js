import { z } from 'zod';

export const GetPaginatedStatusesSchema = z.object({
  /** The list of issue type ids to filter statuses. */
  issueTypeIds: z.array(z.string()).optional(),
  /** The maximum number of statuses to return. */
  maxResults: z.number().optional(),
  /** The string that status names will be matched with. */
  query: z.string().optional(),
  /** The list of project ids to filter statuses. */
  projectIds: z.array(z.number()).optional(),
  /** The index of the first status to return. */
  startAt: z.number().optional(),
});

export type GetPaginatedStatuses = z.input<typeof GetPaginatedStatusesSchema>;
