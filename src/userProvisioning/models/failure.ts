import { z } from 'zod';
import { apiObject } from '#/core';

export const FailureSchema = apiObject({
  /** Human readable error message. */
  error: z.string().optional(),
  /** Unique TraceId that can be used to find log messages. */
  traceId: z.string().optional(),
});

export type Failure = z.infer<typeof FailureSchema>;
