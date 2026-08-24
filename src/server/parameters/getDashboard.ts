import { z } from 'zod';

export const GetDashboardSchema = z.object({
  /** The dashboard id. */
  id: z.string(),
});

export type GetDashboard = z.input<typeof GetDashboardSchema>;
