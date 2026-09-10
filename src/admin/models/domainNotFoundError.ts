import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Domain not found */
export const DomainNotFoundErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-404-3']).optional(),
      }),
    )
    .optional(),
});

export type DomainNotFoundError = z.infer<typeof DomainNotFoundErrorSchema>;
