import { z } from 'zod';

export const AddGadgetParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.number().int(),
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: z.string().optional(),
  /**
   * Whether to ignore the validation of module key and URI. For example, when a gadget is created that is a part of an
   * application that isn't installed.
   */
  ignoreUriAndModuleKeyValidation: z.boolean().optional(),
  /** The module key of the gadget type. Can't be provided with `uri`. */
  moduleKey: z.string().optional(),
  /**
   * The position of the gadget. When the gadget is placed into the position, other gadgets in the same column are moved
   * down to accommodate it.
   */
  position: z.unknown().optional(),
  /** The title of the gadget. */
  title: z.string().optional(),
  /** The URI of the gadget type. Can't be provided with `moduleKey`. */
  uri: z.string().optional(),
});

export type AddGadgetParameters = z.infer<typeof AddGadgetParametersSchema>;
