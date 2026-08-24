import { z } from 'zod';
import { apiObject } from '#/core';

export const PrioritySchemeResponseSchema = apiObject({
  defaultPriority: z.string().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  priorities: z.array(z.string()).optional(),
});

export type PrioritySchemeResponse = z.infer<typeof PrioritySchemeResponseSchema>;
