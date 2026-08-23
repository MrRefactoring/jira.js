import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Domain not found */

export const DomainNotFoundErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type DomainNotFoundError = z.infer<typeof DomainNotFoundErrorSchema>;
