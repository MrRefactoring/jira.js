import { z } from 'zod';
import { JqlFunctionPrecomputationUpdateSchema } from '#/models/jqlFunctionPrecomputationUpdate';

/** List of pairs (id and value) for precomputation updates. */
export const JqlFunctionPrecomputationUpdateRequestSchema = z.object({
  values: z.array(JqlFunctionPrecomputationUpdateSchema).optional(),
});

export type JqlFunctionPrecomputationUpdateRequest = z.infer<typeof JqlFunctionPrecomputationUpdateRequestSchema>;
