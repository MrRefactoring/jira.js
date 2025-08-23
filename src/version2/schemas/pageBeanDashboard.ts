import { z } from 'zod';
import { DashboardSchema } from './dashboard';

/** A page of items. */
export const PageBeanDashboardSchema = z.object({
  /** Whether this is the last page. */
  isLast: z.boolean().optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().int().optional(),
  /** If there is another page of results, the URL of the next page. */
  nextPage: z.string().optional(),
  /** The URL of the page. */
  self: z.string().optional(),
  /** The index of the first item returned. */
  startAt: z.number().int().optional(),
  /** The number of items returned. */
  total: z.number().int().optional(),
  /** The list of items. */
  values: z.array(DashboardSchema).optional(),
});

export type PageBeanDashboard = z.infer<typeof PageBeanDashboardSchema>;
