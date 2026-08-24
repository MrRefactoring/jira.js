import { z } from 'zod';
import { apiObject } from '#/core';

export const ScreenableFieldSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  showWhenEmpty: z.boolean().optional(),
  type: z.string().optional(),
});

export type ScreenableField = z.infer<typeof ScreenableFieldSchema>;
