import { z } from 'zod';
import { JqlFunctionPrecomputationSchema } from '#/models/jqlFunctionPrecomputation';

/** Get precomputations by ID response. */
export const JqlFunctionPrecomputationGetByIdResponseSchema = z.object({
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs: z.array(z.string()).optional(),
  /** The list of precomputations. */
  precomputations: z.array(JqlFunctionPrecomputationSchema).optional(),
});

export type JqlFunctionPrecomputationGetByIdResponse = z.infer<typeof JqlFunctionPrecomputationGetByIdResponseSchema>;
