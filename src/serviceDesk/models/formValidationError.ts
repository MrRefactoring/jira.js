import { z } from 'zod';
import { apiObject } from '#/core';
import { FormValidationErrorContextSchema } from './formValidationErrorContext';

export const FormValidationErrorSchema = apiObject({
  /** Machine-readable validation error code. */
  code: z.string().optional(),
  /** Identifies the form entity that caused the validation error. */
  context: z.array(FormValidationErrorContextSchema).optional(),
  /** Detailed validation error message. */
  detail: z.string().optional(),
  /** The HTTP status code. */
  status: z.number().optional(),
  /** Short summary of the validation error. */
  title: z.string().optional(),
});

export type FormValidationError = z.infer<typeof FormValidationErrorSchema>;
