import { z } from 'zod';

export const GetDashboardItemPropertyKeysParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.string(),
  /** The ID of the dashboard item. */
  itemId: z.string(),
});

export type GetDashboardItemPropertyKeysParameters = z.infer<typeof GetDashboardItemPropertyKeysParametersSchema>;
