import { z } from 'zod';
import { apiObject } from '#/core';

export const ScreenSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  expand: z.string().optional(),
});

export type Screen = z.infer<typeof ScreenSchema>;
