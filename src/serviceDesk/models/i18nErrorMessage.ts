import { z } from 'zod';
import { apiObject } from '#/core';

export const I18nErrorMessageSchema = apiObject({
  /** Internationalization key for the error message. */
  i18nKey: z.string().optional(),
  /** Parameters used to render the internationalized error message. */
  parameters: z.array(z.string()).optional(),
});

export type I18nErrorMessage = z.infer<typeof I18nErrorMessageSchema>;
