import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectPickerItemSchema = apiObject({
  avatar: z.string().optional(),
  html: z.string().optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
});

export type ProjectPickerItem = z.infer<typeof ProjectPickerItemSchema>;
