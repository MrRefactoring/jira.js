import { z } from 'zod';
import { JiraStatusSchema } from './jiraStatus';

export const PageOfStatusesSchema = z.object({
  /** Whether this is the last page. */
  isLast: z.boolean().optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().int().optional(),
  /** The URL of the next page of results, if any. */
  nextPage: z.string().optional(),
  /** The URL of this page. */
  self: z.string().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().int().optional(),
  /** Number of items that satisfy the search. */
  total: z.number().int().optional(),
  /** The list of items. */
  values: z.array(JiraStatusSchema).optional(),
});

export type PageOfStatuses = z.infer<typeof PageOfStatusesSchema>;
