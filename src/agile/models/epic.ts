import { z } from 'zod';
import { apiObject } from '#/core';

export const EpicSchema = apiObject({
  id: z.number().optional(),
  key: z.string().optional(),
  self: z.url().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
  color: apiObject({
    key: z.string().optional(),
  }).optional(),
  done: z.boolean().optional(),
});

export type Epic = z.infer<typeof EpicSchema>;
