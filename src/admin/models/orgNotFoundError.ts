import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Organization not found */
export const OrgNotFoundErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-404-2']).optional(),
      }),
    )
    .optional(),
});

export type OrgNotFoundError = z.infer<typeof OrgNotFoundErrorSchema>;
