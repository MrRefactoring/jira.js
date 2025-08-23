import { z } from 'zod';
import { DashboardGadgetSchema } from './dashboardGadget';

/** The list of gadgets on the dashboard. */
export const DashboardGadgetResponseSchema = z.object({
  /** The list of gadgets. */
  gadgets: z.array(DashboardGadgetSchema),
});

export type DashboardGadgetResponse = z.infer<typeof DashboardGadgetResponseSchema>;
