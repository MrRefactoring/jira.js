import { z } from 'zod';

/** Result of updating JQL Function precomputations. */
export const JqlFunctionPrecomputationUpdateResponseSchema = z.object({
  /**
   * List of precomputations that were not found and skipped. Only returned if the request passed
   * skipNotFoundPrecomputations=true.
   */
  notFoundPrecomputationIDs: z.array(z.string()).optional(),
});

export type JqlFunctionPrecomputationUpdateResponse = z.infer<typeof JqlFunctionPrecomputationUpdateResponseSchema>;
