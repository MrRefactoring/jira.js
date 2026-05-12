import { z } from 'zod';

/** The details of the available dashboard gadget. */
export const AvailableDashboardGadgetSchema = z.object({
  /** The module key of the gadget type. */
  moduleKey: z.string().optional(),
  /** The title of the gadget. */
  title: z.string(),
  /** The URI of the gadget type. */
  uri: z.string().optional(),
});

export type AvailableDashboardGadget = z.infer<typeof AvailableDashboardGadgetSchema>;
