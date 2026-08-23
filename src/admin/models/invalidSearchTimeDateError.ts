import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Invalid time date */

export const InvalidSearchTimeDateErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type InvalidSearchTimeDateError = z.infer<typeof InvalidSearchTimeDateErrorSchema>;
