import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkAgentSessionOutcomeSchema } from './bulkAgentSessionOutcome';

/** Session-start outcomes, not completion of the agent's work. */
export const BulkAgentSessionsResponseSchema = apiObject({
  /** Number of ALREADY_STARTED items. */
  alreadyStartedCount: z.number().optional(),
  /** Number of FAILED and IN_DOUBT items. */
  failedCount: z.number().optional(),
  /** Number of RATE_LIMITED items. */
  rateLimitedCount: z.number().optional(),
  /** One outcome per requested item. */
  results: z.array(BulkAgentSessionOutcomeSchema).optional(),
  /** Number of STARTED items. */
  startedCount: z.number().optional(),
  /** True when startedCount or alreadyStartedCount is greater than zero. Does not indicate that every item succeeded. */
  success: z.boolean().optional(),
});

export type BulkAgentSessionsResponse = z.infer<typeof BulkAgentSessionsResponseSchema>;
