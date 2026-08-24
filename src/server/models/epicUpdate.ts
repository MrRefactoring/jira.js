import { z } from 'zod';
import { apiObject } from '#/core';
import { ColorSchema } from './color';

export const EpicUpdateSchema = apiObject({
  color: ColorSchema.optional(),
  done: z.boolean().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
});

export type EpicUpdate = z.infer<typeof EpicUpdateSchema>;
