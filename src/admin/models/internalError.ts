import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Internal error */

export const InternalErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type InternalError = z.infer<typeof InternalErrorSchema>;
