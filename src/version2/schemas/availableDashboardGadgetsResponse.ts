import { z } from 'zod';
import { AvailableDashboardGadgetSchema } from './availableDashboardGadget';

/** The list of available gadgets. */
export const AvailableDashboardGadgetsResponseSchema = z.object({
  /** The list of available gadgets. */
  gadgets: z.array(AvailableDashboardGadgetSchema),
});

export type AvailableDashboardGadgetsResponse = z.infer<typeof AvailableDashboardGadgetsResponseSchema>;
