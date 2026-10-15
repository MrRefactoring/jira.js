import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkAgentSessionInvocationSchema } from './bulkAgentSessionInvocation';

/** A batch of agent-session invocations. */
export const BulkStartAgentSessionsBatchRequestSchema = apiObject({
  /** Caller-supplied UUID */
  clientMutationId: z.string(),
  /** Between 1 and 50 invocations. Request IDs must be unique within the request. */
  invocations: z.array(BulkAgentSessionInvocationSchema),
});

export type BulkStartAgentSessionsBatchRequest = z.infer<typeof BulkStartAgentSessionsBatchRequestSchema>;
