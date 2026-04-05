import { z } from 'zod';
import { DashboardGadgetPositionSchema } from '#/models/dashboardGadgetPosition';

/** The details of the gadget to update. */
export const DashboardGadgetUpdateRequestSchema = z.object({
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: z.string().optional(),
  position: DashboardGadgetPositionSchema.optional(),
  /** The title of the gadget. */
  title: z.string().optional(),
});

export type DashboardGadgetUpdateRequest = z.infer<typeof DashboardGadgetUpdateRequestSchema>;
