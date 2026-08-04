import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Card layout settings of the board */

export const CardLayoutFieldSchema = apiObject({
  fieldId: z.string().optional(),
  id: z.number().optional(),
  mode: openEnum(['PLAN', 'WORK']).optional(),
  position: z.number().optional(),
});

export type CardLayoutField = z.infer<typeof CardLayoutFieldSchema>;
