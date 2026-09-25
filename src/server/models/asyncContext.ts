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

export const AsyncContextSchema = apiObject({
  request: (
    z.lazy((): z.ZodType<ServletRequest, ServletRequestInput> => ServletRequestSchema) as z.ZodType<
      ServletRequest,
      ServletRequestInput
    >
  ).optional(),
  response: ServletResponseSchema.optional(),
  timeout: z.number().optional(),
}) satisfies z.ZodType<AsyncContext, AsyncContextInput>;
