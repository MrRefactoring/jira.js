import { z } from 'zod';
import { apiObject } from '#/core';

export const I18nErrorMessageDTOSchema = apiObject({
  /** Internationalization key for the error message. */
  i18nKey: z.string().optional(),
  /** Parameters used to render the internationalized error message. */
  parameters: z.array(z.string()).optional(),
});

export type I18nErrorMessageDTO = z.infer<typeof I18nErrorMessageDTOSchema>;
