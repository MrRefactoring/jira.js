import { z } from 'zod';
import { apiObject } from '#/core';
import { AvailableDashboardGadgetSchema } from './availableDashboardGadget';
/** The list of available gadgets. */

export const AvailableDashboardGadgetsResponseSchema = apiObject({
  /** The list of available gadgets. */
  gadgets: z.array(AvailableDashboardGadgetSchema),
});

export type AvailableDashboardGadgetsResponse = z.infer<typeof AvailableDashboardGadgetsResponseSchema>;
