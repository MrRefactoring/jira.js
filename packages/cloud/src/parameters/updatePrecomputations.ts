import { z } from 'zod';
import { JqlFunctionPrecomputationUpdateRequestSchema } from '../models';

export const UpdatePrecomputationsSchema = z
  .object({
    skipNotFoundPrecomputations: z.boolean().optional(),
  })
  .extend(JqlFunctionPrecomputationUpdateRequestSchema.shape);

export type UpdatePrecomputations = z.input<typeof UpdatePrecomputationsSchema>;
