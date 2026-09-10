import { z } from 'zod';
import { apiObject } from '#/core';
import { ApiErrorSchema } from './apiError';

export const ApiErrorResponseSchema = apiObject({
  errors: z.array(ApiErrorSchema).optional(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
