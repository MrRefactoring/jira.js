import { z } from 'zod';

/** Details of a gadget position. */
export const DashboardGadgetPositionSchema = z.object({
  'The column position of the gadget.': z.number(),
  'The row position of the gadget.': z.number(),
});

export type DashboardGadgetPosition = z.infer<typeof DashboardGadgetPositionSchema>;
