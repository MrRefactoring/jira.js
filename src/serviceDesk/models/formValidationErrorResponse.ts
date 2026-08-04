import { z } from 'zod';
import { apiObject } from '#/core';
import { FormValidationErrorSchema } from './formValidationError';
import { I18nErrorMessageDTOSchema } from './i18nErrorMessageDTO';

export const FormValidationErrorResponseSchema = apiObject({
  /** Description of the error. */
  errorMessage: z.string().optional(),
  /** A list of validation errors. */
  errors: z.array(FormValidationErrorSchema).optional(),
  i18nErrorMessage: I18nErrorMessageDTOSchema.optional(),
});

export type FormValidationErrorResponse = z.infer<typeof FormValidationErrorResponseSchema>;
