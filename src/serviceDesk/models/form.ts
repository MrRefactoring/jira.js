import { z } from 'zod';
import { apiObject } from '#/core';

export const FormSchema = apiObject({
  /** JSON mapping of form field answers containing form field IDs and corresponding values. */
  answers: z.record(z.string(), z.any()).optional(),
});

export type Form = z.infer<typeof FormSchema>;
