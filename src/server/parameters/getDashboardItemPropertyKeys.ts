import { z } from 'zod';

export const GetDashboardItemPropertyKeysSchema = z.object({
  /** The dashboard item from which keys will be returned. */
  itemId: z.string(),
  /** The dashboard id. */
  dashboardId: z.string(),
});

export type GetDashboardItemPropertyKeys = z.input<typeof GetDashboardItemPropertyKeysSchema>;
