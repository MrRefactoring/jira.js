import { z } from 'zod';
import { apiObject } from '#/core';
import { FormAnswerSchema } from './formAnswer';

export const FormSchema = apiObject({
  /** JSON mapping of form field answers containing form field IDs and corresponding values. */
  answers: z.record(z.string(), FormAnswerSchema).optional(),
});

export type Form = z.infer<typeof FormSchema>;
