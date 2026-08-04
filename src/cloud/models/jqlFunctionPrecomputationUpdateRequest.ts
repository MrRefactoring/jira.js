import { z } from 'zod';
import { apiObject } from '#/core';
import { JqlFunctionPrecomputationUpdateSchema } from './jqlFunctionPrecomputationUpdate';
/** List of pairs (id and value) for precomputation updates. */

export const JqlFunctionPrecomputationUpdateRequestSchema = apiObject({
  values: z.array(JqlFunctionPrecomputationUpdateSchema).optional(),
});

export type JqlFunctionPrecomputationUpdateRequest = z.infer<typeof JqlFunctionPrecomputationUpdateRequestSchema>;
