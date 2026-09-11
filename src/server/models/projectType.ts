import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectTypeSchema = apiObject({
  color: z.string().optional(),
  descriptionI18nKey: z.string().optional(),
  formattedKey: z.string().optional(),
  icon: z.string().optional(),
  key: z.string().optional(),
});

export type ProjectType = z.infer<typeof ProjectTypeSchema>;
