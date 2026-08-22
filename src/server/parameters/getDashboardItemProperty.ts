import { z } from 'zod';

export const GetDashboardItemPropertySchema = z.object({
  /** The key of the property to return. */
  propertyKey: z.string(),
  /** The dashboard item from which the property will be returned. */
  itemId: z.string(),
  /** The dashboard id. */
  dashboardId: z.string(),
});

export type GetDashboardItemProperty = z.input<typeof GetDashboardItemPropertySchema>;
