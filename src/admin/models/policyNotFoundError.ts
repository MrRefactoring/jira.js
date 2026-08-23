import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Policy not found */

export const PolicyNotFoundErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type PolicyNotFoundError = z.infer<typeof PolicyNotFoundErrorSchema>;
