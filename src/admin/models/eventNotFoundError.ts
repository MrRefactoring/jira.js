import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApplicationErrorSchema } from './applicationError';

/** Event not found */
export const EventNotFoundErrorSchema = apiObject({
  errors: z
    .array(
      apiObject(ApplicationErrorSchema.shape).extend({
        code: openEnum(['ADMIN-404-4']).optional(),
      }),
    )
    .optional(),
});

export type EventNotFoundError = z.infer<typeof EventNotFoundErrorSchema>;
