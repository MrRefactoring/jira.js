import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** CDEN policy validation failed */

export const CdenPolicyValidationFailedErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type CdenPolicyValidationFailedError = z.infer<typeof CdenPolicyValidationFailedErrorSchema>;
