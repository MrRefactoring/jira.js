import { z } from 'zod';

export const SetDashboardItemPropertyParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.string(),
  /** The ID of the dashboard item. */
  itemId: z.string(),
  /**
   * The key of the dashboard item property. The maximum length is 255 characters. For dashboard items with a spec URI
   * and no complete module key, if the provided propertyKey is equal to "config", the request body's JSON must be an
   * object with all keys and values as strings.
   */
  propertyKey: z.string(),
});

export type SetDashboardItemPropertyParameters = z.infer<typeof SetDashboardItemPropertyParametersSchema>;
