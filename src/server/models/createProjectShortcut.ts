import { z } from 'zod';
import { apiObject } from '#/core';

export const CreateProjectShortcutSchema = apiObject({
  icon: z.string().optional(),
  name: z.string().optional(),
  sequence: z.number().optional(),
  url: z.string().optional(),
});

export type CreateProjectShortcut = z.infer<typeof CreateProjectShortcutSchema>;
