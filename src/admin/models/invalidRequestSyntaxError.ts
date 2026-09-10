import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Request syntax is not valid */
export const InvalidRequestSyntaxErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-400-19']).optional(),
      }),
    )
    .optional(),
});

export type InvalidRequestSyntaxError = z.infer<typeof InvalidRequestSyntaxErrorSchema>;
