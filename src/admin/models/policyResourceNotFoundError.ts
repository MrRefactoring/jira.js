import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Policy Resource not found */

export const PolicyResourceNotFoundErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type PolicyResourceNotFoundError = z.infer<typeof PolicyResourceNotFoundErrorSchema>;
