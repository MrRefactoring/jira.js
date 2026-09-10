import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Policy not found */
export const PolicyNotFoundErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-404-5']).optional(),
      }),
    )
    .optional(),
});

export type PolicyNotFoundError = z.infer<typeof PolicyNotFoundErrorSchema>;
