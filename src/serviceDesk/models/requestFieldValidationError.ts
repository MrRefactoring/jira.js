import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestFieldValidationErrorSchema = apiObject({
  /** The id of the request field that failed validation (matches a key in 'requestFieldValues'). */
  field: z.string().optional(),
  /** A human-readable explanation of why this field failed validation. */
  message: z.string().optional(),
});

export type RequestFieldValidationError = z.infer<typeof RequestFieldValidationErrorSchema>;
