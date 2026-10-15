import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

/** An item-level error inside an HTTP 200 response. */
export const BulkAgentSessionItemErrorSchema = apiObject({
  /** Error message. */
  message: z.string().optional(),
  /** HTTP status code. */
  statusCode: z.number().optional(),
  /** Error type. */
  type: openEnum([
    'AGENT_NOT_ASSIGNABLE',
    'AGENT_NOT_FOUND',
    'INVALID_REQUEST_ID',
    'ISSUE_NOT_FOUND',
    'IDEMPOTENCY_CONFLICT',
    'ISSUE_VERSION_MISSING',
    'ISSUE_ACCESS_DENIED',
    'RATE_LIMITED',
    'CONCURRENCY_SATURATED',
    'AGENT_TRIGGER_FAILED',
    'IDEMPOTENCY_ERROR',
    'PRIOR_ATTEMPT_FAILED',
    'SESSION_NOT_STARTED',
    'IN_DOUBT',
    'UNEXPECTED_ERROR',
  ]).optional(),
});

export type BulkAgentSessionItemError = z.infer<typeof BulkAgentSessionItemErrorSchema>;
