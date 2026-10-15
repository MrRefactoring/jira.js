import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { BulkAgentSessionItemErrorSchema } from './bulkAgentSessionItemError';

/** The start outcome for one invocation. */
export const BulkAgentSessionOutcomeSchema = apiObject({
  /** The caller's Rovo agent ID. */
  agentId: z.string().optional(),
  /** Conversation ID for STARTED or ALREADY_STARTED only. */
  conversationId: z.string().nullish(),
  error: BulkAgentSessionItemErrorSchema.optional(),
  /** Numeric issue ID. */
  issueId: z.string().optional(),
  /** The per-item requestId for batch; the shared clientMutationId for uniform. */
  requestId: z.string().optional(),
  /**
   * STARTED: session started; ALREADY_STARTED: recorded successful retry; FAILED: invocation failed; RATE_LIMITED:
   * admission denied; IN_DOUBT: start could not be confirmed.
   */
  result: openEnum(['STARTED', 'ALREADY_STARTED', 'FAILED', 'RATE_LIMITED', 'IN_DOUBT']).optional(),
});

export type BulkAgentSessionOutcome = z.infer<typeof BulkAgentSessionOutcomeSchema>;
