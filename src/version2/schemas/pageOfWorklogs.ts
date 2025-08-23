import { z } from 'zod';
import { WorklogSchema } from './worklog';

/** Paginated list of worklog details */
export const PageOfWorklogsSchema = z.object({
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().int().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().int().optional(),
  /** The number of results on the page. */
  total: z.number().int().optional(),
  /** List of worklogs. */
  worklogs: z.array(WorklogSchema).optional(),
});

export type PageOfWorklogs = z.infer<typeof PageOfWorklogsSchema>;
