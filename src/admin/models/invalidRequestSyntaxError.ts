import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Request syntax is not valid */

export const InvalidRequestSyntaxErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type InvalidRequestSyntaxError = z.infer<typeof InvalidRequestSyntaxErrorSchema>;
