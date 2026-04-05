import { z } from 'zod';

export const GetDashboardSchema = z.object({
  /** The ID of the dashboard. */
  id: z.string(),
});

export type GetDashboard = z.input<typeof GetDashboardSchema>;
