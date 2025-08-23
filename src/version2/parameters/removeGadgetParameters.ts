import { z } from 'zod';

export const RemoveGadgetParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.number().int(),
  /** The ID of the gadget. */
  gadgetId: z.number().int(),
});

export type RemoveGadgetParameters = z.infer<typeof RemoveGadgetParametersSchema>;
