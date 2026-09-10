import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Invalid page cursor */
export const InvalidPageCursorErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-400-1']).optional(),
      }),
    )
    .optional(),
});

export type InvalidPageCursorError = z.infer<typeof InvalidPageCursorErrorSchema>;
