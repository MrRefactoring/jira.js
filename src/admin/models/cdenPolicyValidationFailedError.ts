import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** CDEN policy validation failed */
export const CdenPolicyValidationFailedErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-500-2']).optional(),
      }),
    )
    .optional(),
});

export type CdenPolicyValidationFailedError = z.infer<typeof CdenPolicyValidationFailedErrorSchema>;
