import { z } from 'zod';
import { apiObject } from '#/core';
import { DashboardGadgetSchema } from './dashboardGadget';
/** The list of gadgets on the dashboard. */

export const DashboardGadgetResponseSchema = apiObject({
  /** The list of gadgets. */
  gadgets: z.array(DashboardGadgetSchema),
});

export type DashboardGadgetResponse = z.infer<typeof DashboardGadgetResponseSchema>;
