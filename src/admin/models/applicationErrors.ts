import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** A list of application errors */

export const ApplicationErrorsSchema = apiObject({
  errors: z.array(ApplicationErrorSchema).optional(),
});

export type ApplicationErrors = z.infer<typeof ApplicationErrorsSchema>;
