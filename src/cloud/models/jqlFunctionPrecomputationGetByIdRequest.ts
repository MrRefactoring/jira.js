import { z } from 'zod';
import { apiObject } from '#/core';
/** Request to fetch precomputations by ID. */

export const JqlFunctionPrecomputationGetByIdRequestSchema = apiObject({
  precomputationIDs: z.array(z.string()).optional(),
});

export type JqlFunctionPrecomputationGetByIdRequest = z.infer<typeof JqlFunctionPrecomputationGetByIdRequestSchema>;
