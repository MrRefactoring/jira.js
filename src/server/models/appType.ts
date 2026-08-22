import { z } from 'zod';
import { apiObject } from '#/core';

export const AppTypeSchema = apiObject({
  i18nKey: z.string().optional(),
  iconUrl: z.string().optional(),
});

export type AppType = z.infer<typeof AppTypeSchema>;
