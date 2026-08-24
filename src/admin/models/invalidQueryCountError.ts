import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** The number of queries exceeded the limit */

export const InvalidQueryCountErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type InvalidQueryCountError = z.infer<typeof InvalidQueryCountErrorSchema>;
