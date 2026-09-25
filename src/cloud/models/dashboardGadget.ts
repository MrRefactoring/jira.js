import { z } from 'zod';
import { apiObject, openEnum, requireResponseKeys } from '#/core';
import { DashboardGadgetPositionSchema } from './dashboardGadgetPosition';

/** Details of a gadget. */
export const DashboardGadgetSchema = requireResponseKeys(
  apiObject({
    /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
    color: openEnum(['blue', 'red', 'yellow', 'green', 'cyan', 'purple', 'gray', 'white']),
    /** The ID of the gadget instance. */
    id: z.number(),
    /** The module key of the gadget type. */
    moduleKey: z.string().optional(),
    position: DashboardGadgetPositionSchema.optional(),
    /** The title of the gadget. */
    title: z.string(),
    /** The URI of the gadget type. */
    uri: z.string().optional(),
  }),
  ['position'],
);

export type DashboardGadget = z.infer<typeof DashboardGadgetSchema>;
