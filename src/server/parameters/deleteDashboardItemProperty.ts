import { z } from 'zod';

export const DeleteDashboardItemPropertySchema = z.object({
  /** The key of the property to remove. */
  propertyKey: z.string(),
  /** The dashboard item from which the property will be removed. */
  itemId: z.string(),
  /** The dashboard id. */
  dashboardId: z.string(),
});

export type DeleteDashboardItemProperty = z.input<typeof DeleteDashboardItemPropertySchema>;
