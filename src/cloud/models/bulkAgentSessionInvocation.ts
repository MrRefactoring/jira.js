import { z } from 'zod';
import { apiObject } from '#/core';

/** One agent-session invocation for an issue. */
export const BulkAgentSessionInvocationSchema = apiObject({
  /** Rovo agent ID. */
  agentId: z.string(),
  /** Numeric issue ID as a string. */
  issueId: z.string(),
  /** Unique per-item UUID. */
  requestId: z.string(),
  /** Optional prompt for this invocation. */
  userPrompt: z.string().nullish(),
});

export type BulkAgentSessionInvocation = z.infer<typeof BulkAgentSessionInvocationSchema>;
