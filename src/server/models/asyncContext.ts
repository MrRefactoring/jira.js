import { z } from 'zod';
import { apiObject } from '#/core';
import { ServletRequestSchema, type ServletRequest } from './servletRequest';
import { ServletResponseSchema, type ServletResponse } from './servletResponse';

export interface AsyncContext {
  request?: ServletRequest;
  response?: ServletResponse;
  timeout?: number;
}

export const AsyncContextSchema: z.ZodType<AsyncContext> = apiObject({
  request: z.lazy(() => ServletRequestSchema).optional(),
  response: ServletResponseSchema.optional(),
  timeout: z.number().optional(),
});
