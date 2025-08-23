import { z } from 'zod';

/** Details of a gadget position. */
export const DashboardGadgetPositionSchema = z
  .object({
    'The column position of the gadget.': z.number().int(),
    'The row position of the gadget.': z.number().int(),
  })
  .transform(val => ({
    theColumnPositionOfTheGadget: val['The column position of the gadget.'],
    theRowPositionOfTheGadget: val['The row position of the gadget.'],
  }));

export type DashboardGadgetPosition = z.infer<typeof DashboardGadgetPositionSchema>;
