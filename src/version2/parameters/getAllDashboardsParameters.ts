import { z } from 'zod';

export const GetAllDashboardsParametersSchema = z.object({
  /**
   * The filter applied to the list of dashboards. Valid values are:
   *
   * - `favourite` Returns dashboards the user has marked as favorite.
   * - `my` Returns dashboards owned by the user.
   */
  filter: z.enum(['my', 'favourite']).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetAllDashboardsParameters = z.infer<typeof GetAllDashboardsParametersSchema>;
