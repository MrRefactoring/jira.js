import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Policy Resource not found */
export const PolicyResourceNotFoundErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-404-6']).optional(),
      }),
    )
    .optional(),
});

export type PolicyResourceNotFoundError = z.infer<typeof PolicyResourceNotFoundErrorSchema>;
