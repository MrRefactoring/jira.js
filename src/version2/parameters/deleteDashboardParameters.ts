import { z } from 'zod';

export const DeleteDashboardParametersSchema = z.object({
  /** The ID of the dashboard. */
  id: z.string(),
});

export type DeleteDashboardParameters = z.infer<typeof DeleteDashboardParametersSchema>;
