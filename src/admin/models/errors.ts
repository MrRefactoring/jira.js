import { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorSchema } from './error';

export const ErrorsSchema = apiObject({
  errors: z.array(ErrorSchema).optional(),
});

export type Errors = z.infer<typeof ErrorsSchema>;
