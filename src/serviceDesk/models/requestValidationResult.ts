import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestFieldValidationErrorSchema } from './requestFieldValidationError';
import { FormValidationErrorSchema } from './formValidationError';

export const RequestValidationResultSchema = apiObject({
  /** A single, human-readable summary describing why validation failed. Null when valid. */
  errorMessage: z.string().optional(),
  /** General validation errors that are not attributable to a single field. Empty when valid. */
  errorMessages: z.array(z.string()).optional(),
  /** Field-level validation errors, keyed by the failing request field id. Empty when valid. */
  fieldErrors: z.array(RequestFieldValidationErrorSchema).optional(),
  /** ProForma form validation errors, if a form was supplied. Empty when valid or no form was present. */
  formErrors: z.array(FormValidationErrorSchema).optional(),
  /** A machine-readable reason key categorising the overall failure. Null when valid. */
  reasonKey: z.string().optional(),
  /** True when the payload is both structurally and semantically valid and safe to create. */
  valid: z.boolean().optional(),
});

export type RequestValidationResult = z.infer<typeof RequestValidationResultSchema>;
