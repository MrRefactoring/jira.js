import { z } from 'zod';
import { apiObject } from '#/core';

export const I18nErrorMessageSchema = apiObject({
  i18nKey: z.string().optional(),
  parameters: z.array(z.string()).optional(),
});

export type I18nErrorMessage = z.infer<typeof I18nErrorMessageSchema>;
