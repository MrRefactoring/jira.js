import { z } from 'zod';
import { apiObject } from '#/core';
import { DashboardGadgetPositionSchema } from './dashboardGadgetPosition';
/** The details of the gadget to update. */

export const DashboardGadgetUpdateRequestSchema = apiObject({
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: z.string().optional(),
  position: DashboardGadgetPositionSchema.optional(),
  /** The title of the gadget. */
  title: z.string().optional(),
});

export type DashboardGadgetUpdateRequest = z.infer<typeof DashboardGadgetUpdateRequestSchema>;
