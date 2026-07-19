import { z } from 'zod';
import { apiObject } from '#/core';
import { I18nErrorMessageSchema } from './i18nErrorMessage';

export const ErrorResponseSchema = apiObject({
  errorMessage: z.string().optional(),
  i18nErrorMessage: I18nErrorMessageSchema.optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
