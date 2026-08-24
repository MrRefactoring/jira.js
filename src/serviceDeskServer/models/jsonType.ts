import { z } from 'zod';
import { apiObject } from '#/core';

export const JsonTypeSchema = apiObject({
  custom: z.string().optional(),
  customId: z.number().optional(),
  items: z.string().optional(),
  system: z.string().optional(),
  type: z.string().optional(),
});

export type JsonType = z.infer<typeof JsonTypeSchema>;
