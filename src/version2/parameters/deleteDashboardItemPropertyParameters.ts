import { z } from 'zod';

export const DeleteDashboardItemPropertyParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.string(),
  /** The ID of the dashboard item. */
  itemId: z.string(),
  /** The key of the dashboard item property. */
  propertyKey: z.string(),
});

export type DeleteDashboardItemPropertyParameters = z.infer<typeof DeleteDashboardItemPropertyParametersSchema>;
