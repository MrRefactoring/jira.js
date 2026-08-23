import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Resource is not valid */

export const InvalidResourceErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type InvalidResourceError = z.infer<typeof InvalidResourceErrorSchema>;
