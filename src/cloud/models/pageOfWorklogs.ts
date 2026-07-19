import { z } from 'zod';
import { apiObject } from '#/core';
import { WorklogSchema } from './worklog';
/** Paginated list of worklog details */

export const PageOfWorklogsSchema = apiObject({
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().optional(),
  /** The number of results on the page. */
  total: z.number().optional(),
  /** List of worklogs. */
  worklogs: z.array(WorklogSchema).optional(),
});

export type PageOfWorklogs = z.infer<typeof PageOfWorklogsSchema>;
