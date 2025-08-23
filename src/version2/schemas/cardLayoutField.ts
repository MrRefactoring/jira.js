import { z } from 'zod';

/** Card layout settings of the board */
export const CardLayoutFieldSchema = z.object({
  fieldId: z.string().optional(),
  id: z.number().int().optional(),
  mode: z.enum(['PLAN', 'WORK']).optional(),
  position: z.number().int().optional(),
});

export type CardLayoutField = z.infer<typeof CardLayoutFieldSchema>;
