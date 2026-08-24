import { z } from 'zod';
import { apiObject } from '#/core';

export const ScreenableTabSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
});

export type ScreenableTab = z.infer<typeof ScreenableTabSchema>;
