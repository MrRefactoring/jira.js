import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Internal error */
export const InternalErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-500-1']).optional(),
      }),
    )
    .optional(),
});

export type InternalError = z.infer<typeof InternalErrorSchema>;
