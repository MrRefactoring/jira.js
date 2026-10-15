import { z } from 'zod';
import { apiObject } from '#/core';

/** Start one agent across multiple issues with a shared optional prompt. */
export const BulkStartUniformAgentSessionsRequestSchema = apiObject({
  /** Rovo agent ID. */
  agentId: z.string(),
  /** Caller-supplied UUID. */
  clientMutationId: z.string(),
  /** Between 1 and 50 numeric issue-ID strings. IDs must be unique. */
  issueIds: z.array(z.string()),
  /** Optional prompt applied to every issue. */
  userPrompt: z.string().nullish(),
});

export type BulkStartUniformAgentSessionsRequest = z.infer<typeof BulkStartUniformAgentSessionsRequestSchema>;
