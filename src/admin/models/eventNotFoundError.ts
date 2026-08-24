import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Event not found */

export const EventNotFoundErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type EventNotFoundError = z.infer<typeof EventNotFoundErrorSchema>;
