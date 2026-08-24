import { z } from 'zod';
import { apiObject } from '#/core';

export const PrioritySchemeUpdateSchema = apiObject({
  defaultOptionId: z.string().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  optionIds: z.array(z.string()).optional(),
});

export type PrioritySchemeUpdate = z.infer<typeof PrioritySchemeUpdateSchema>;
