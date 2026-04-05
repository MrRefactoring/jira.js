import { z } from 'zod';

export const GetDashboardItemPropertyKeysSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.string(),
  /** The ID of the dashboard item. */
  itemId: z.string(),
});

export type GetDashboardItemPropertyKeys = z.input<typeof GetDashboardItemPropertyKeysSchema>;
