import { z } from 'zod';

export const GetDashboardParametersSchema = z.object({
  /** The ID of the dashboard. */
  id: z.string(),
});

export type GetDashboardParameters = z.infer<typeof GetDashboardParametersSchema>;
