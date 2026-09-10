import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** The number of queries exceeded the limit */
export const InvalidQueryCountErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-400-21']).optional(),
      }),
    )
    .optional(),
});

export type InvalidQueryCountError = z.infer<typeof InvalidQueryCountErrorSchema>;
