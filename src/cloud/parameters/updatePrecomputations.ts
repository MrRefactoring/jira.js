import { z } from 'zod';
import { JqlFunctionPrecomputationUpdateRequestSchema } from '../models';

export const UpdatePrecomputationsSchema = z.object(JqlFunctionPrecomputationUpdateRequestSchema.shape).extend({
  skipNotFoundPrecomputations: z.boolean().optional(),
});

export type UpdatePrecomputations = z.input<typeof UpdatePrecomputationsSchema>;
