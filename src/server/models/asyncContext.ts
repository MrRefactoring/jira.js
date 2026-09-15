import { z } from 'zod';
import { apiObject } from '#/core';
import { ServletRequestSchema, type ServletRequest, type ServletRequestInput } from './servletRequest';
import { ServletResponseSchema, type ServletResponse } from './servletResponse';

export interface AsyncContext {
  request?: ServletRequest;
  response?: ServletResponse;
  timeout?: number;
  [key: string]: unknown;
}

export interface AsyncContextInput {
  request?: ServletRequestInput;
  response?: z.input<typeof ServletResponseSchema>;
  timeout?: number;
}

export const AsyncContextSchema: z.ZodType<AsyncContext, AsyncContextInput> = apiObject({
  request: z.lazy(() => ServletRequestSchema).optional(),
  response: ServletResponseSchema.optional(),
  timeout: z.number().optional(),
});
