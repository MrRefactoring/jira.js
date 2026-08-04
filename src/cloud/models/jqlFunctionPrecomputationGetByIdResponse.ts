import { z } from 'zod';
import { apiObject } from '#/core';
import { JqlFunctionPrecomputationSchema } from './jqlFunctionPrecomputation';
/** Get precomputations by ID response. */

export const JqlFunctionPrecomputationGetByIdResponseSchema = apiObject({
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs: z.array(z.string()).optional(),
  /** The list of precomputations. */
  precomputations: z.array(JqlFunctionPrecomputationSchema).optional(),
});

export type JqlFunctionPrecomputationGetByIdResponse = z.infer<typeof JqlFunctionPrecomputationGetByIdResponseSchema>;
