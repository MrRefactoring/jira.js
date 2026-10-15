import { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorResponseSchema = apiObject({
  errorMessages: z.array(z.string()).optional(),
  errors: z.record(z.string(), z.string()).optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
