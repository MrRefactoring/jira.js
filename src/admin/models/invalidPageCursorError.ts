import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Invalid page cursor */

export const InvalidPageCursorErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type InvalidPageCursorError = z.infer<typeof InvalidPageCursorErrorSchema>;
