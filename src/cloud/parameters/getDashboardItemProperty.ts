import { z } from 'zod';

export const GetDashboardItemPropertySchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.string(),
  /** The ID of the dashboard item. */
  itemId: z.string(),
  /** The key of the dashboard item property. */
  propertyKey: z.string(),
});

export type GetDashboardItemProperty = z.input<typeof GetDashboardItemPropertySchema>;
