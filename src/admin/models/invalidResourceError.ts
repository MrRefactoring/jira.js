import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Resource is not valid */
export const InvalidResourceErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-400-4']).optional(),
      }),
    )
    .optional(),
});

export type InvalidResourceError = z.infer<typeof InvalidResourceErrorSchema>;
