import { z } from 'zod';

/** Details of a gadget. */
export const DashboardGadgetSchema = z.object({
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: z.enum(['blue', 'red', 'yellow', 'green', 'cyan', 'purple', 'gray', 'white']),
  /** The ID of the gadget instance. */
  id: z.number().int(),
  /** The module key of the gadget type. */
  moduleKey: z.string().optional(),
  /** The position of the gadget. */
  position: z.unknown(),
  /** The title of the gadget. */
  title: z.string(),
  /** The URI of the gadget type. */
  uri: z.string().optional(),
});

export type DashboardGadget = z.infer<typeof DashboardGadgetSchema>;
