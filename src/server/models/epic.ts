import { z } from 'zod';
import { apiObject } from '#/core';
import { ColorSchema } from './color';

export const EpicSchema = apiObject({
  color: ColorSchema.optional(),
  done: z.boolean().optional(),
  id: z.number().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
  summary: z.string().optional(),
});

export type Epic = z.infer<typeof EpicSchema>;
