import { z } from 'zod';
import { DashboardSchema } from './dashboard';

/** A page containing dashboard details. */
export const PageOfDashboardsSchema = z.object({
  /** List of dashboards. */
  dashboards: z.array(DashboardSchema).optional(),
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().int().optional(),
  /** The URL of the next page of results, if any. */
  next: z.string().optional(),
  /** The URL of the previous page of results, if any. */
  prev: z.string().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().int().optional(),
  /** The number of results on the page. */
  total: z.number().int().optional(),
});

export type PageOfDashboards = z.infer<typeof PageOfDashboardsSchema>;
