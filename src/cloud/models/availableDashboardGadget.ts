import { z } from 'zod';
import { apiObject } from '#/core';
/** The details of the available dashboard gadget. */

export const AvailableDashboardGadgetSchema = apiObject({
  /** The module key of the gadget type. */
  moduleKey: z.string().optional(),
  /** The title of the gadget. */
  title: z.string(),
  /** The URI of the gadget type. */
  uri: z.string().optional(),
});

export type AvailableDashboardGadget = z.infer<typeof AvailableDashboardGadgetSchema>;
