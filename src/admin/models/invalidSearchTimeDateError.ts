import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Invalid time date */
export const InvalidSearchTimeDateErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-400-3']).optional(),
      }),
    )
    .optional(),
});

export type InvalidSearchTimeDateError = z.infer<typeof InvalidSearchTimeDateErrorSchema>;
