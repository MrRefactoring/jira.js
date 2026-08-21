import { z } from 'zod';
import { apiObject } from '#/core';

export const EntityTypeSchema = apiObject({
  applicationTypeClassName: z.string().optional(),
  i18nKey: z.string().optional(),
  iconUrl: z.string().optional(),
  pluralizedI18nKey: z.string().optional(),
});

export type EntityType = z.infer<typeof EntityTypeSchema>;
