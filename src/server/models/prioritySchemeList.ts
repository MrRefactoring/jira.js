import { z } from 'zod';
import { apiObject } from '#/core';
import { PrioritySchemeSchema } from './priorityScheme';

export const PrioritySchemeListSchema = apiObject({
  maxResults: z.number().optional(),
  schemes: z.array(PrioritySchemeSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PrioritySchemeList = z.infer<typeof PrioritySchemeListSchema>;
