import { z } from 'zod';
import { apiObject } from '#/core';

export const PrioritySchemeSchema = apiObject({
  defaultOptionId: z.string().optional(),
  defaultScheme: z.boolean().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  optionIds: z.array(z.string()).optional(),
  projectKeys: z.array(z.string()).optional(),
  self: z.url().optional(),
});

export type PriorityScheme = z.infer<typeof PrioritySchemeSchema>;
