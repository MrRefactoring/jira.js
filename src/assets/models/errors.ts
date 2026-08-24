import { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorsSchema = apiObject({
  errorMessages: z.array(z.string()),
  errors: z.record(z.string(), z.any()),
});

export type Errors = z.infer<typeof ErrorsSchema>;
