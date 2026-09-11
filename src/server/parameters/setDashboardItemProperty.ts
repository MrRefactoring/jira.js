import { z } from 'zod';

export const SetDashboardItemPropertySchema = z.object({
  /** The key of the dashboard item's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string(),
  /** The dashboard item on which the property will be set. */
  itemId: z.string(),
  /** The dashboard id. */
  dashboardId: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetDashboardItemProperty = z.input<typeof SetDashboardItemPropertySchema>;
