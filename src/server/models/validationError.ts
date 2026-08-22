import { z } from 'zod';
import { apiObject } from '#/core';

export const ValidationErrorSchema = apiObject({
  error: z.string().optional(),
  field: z.string().optional(),
  params: z.array(z.string()).optional(),
});

export type ValidationError = z.infer<typeof ValidationErrorSchema>;
