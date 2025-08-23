import { z } from 'zod';

export const UpdateGadgetParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.number().int(),
  /** The ID of the gadget. */
  gadgetId: z.number().int(),
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: z.string().optional(),
  /** The position of the gadget. */
  position: z.unknown().optional(),
  /** The title of the gadget. */
  title: z.string().optional(),
});

export type UpdateGadgetParameters = z.infer<typeof UpdateGadgetParametersSchema>;
