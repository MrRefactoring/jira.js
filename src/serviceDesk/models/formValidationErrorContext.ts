import { z } from 'zod';
import { apiObject } from '#/core';

export const FormValidationErrorContextSchema = apiObject({
  /** ID of the form entity related to the validation error. */
  id: z.string().optional(),
  /** Type of form entity related to the validation error. */
  type: z.string().optional(),
});

export type FormValidationErrorContext = z.infer<typeof FormValidationErrorContextSchema>;
