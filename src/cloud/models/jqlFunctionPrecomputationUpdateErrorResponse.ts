import { z } from 'zod';
import { apiObject } from '#/core';
/** Error response returned updating JQL Function precomputations fails. */

export const JqlFunctionPrecomputationUpdateErrorResponseSchema = apiObject({
  /** The list of error messages produced by this operation. */
  errorMessages: z.array(z.string()).optional(),
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs: z.array(z.string()).optional(),
});

export type JqlFunctionPrecomputationUpdateErrorResponse = z.infer<
  typeof JqlFunctionPrecomputationUpdateErrorResponseSchema
>;
