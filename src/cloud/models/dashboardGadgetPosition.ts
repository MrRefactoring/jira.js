import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a gadget position. */

export const DashboardGadgetPositionSchema = apiObject({
  'The column position of the gadget.': z.number(),
  'The row position of the gadget.': z.number(),
});

export type DashboardGadgetPosition = z.infer<typeof DashboardGadgetPositionSchema>;
