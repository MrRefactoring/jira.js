import { z } from 'zod';

/** Card layout settings of the board */
export const CardLayoutFieldSchema = z.object({
  fieldId: z.string().optional(),
  id: z.number().optional(),
  mode: z.enum(['PLAN', 'WORK']).optional(),
  position: z.number().optional(),
});

export type CardLayoutField = z.infer<typeof CardLayoutFieldSchema>;
