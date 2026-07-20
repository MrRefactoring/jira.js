import { z } from 'zod';
import { apiObject } from '#/core';

export const SprintSchema = apiObject({
  completeDate: z.coerce.date().optional(),
  createdDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  goal: z.string().optional(),
  id: z.number().optional(),
  name: z.string().max(30, 'name must be at most 30 characters').optional(),
  originBoardId: z.number().optional(),
  self: z.url().optional(),
  startDate: z.coerce.date().optional(),
  state: z.enum(['future', 'active', 'closed']),
});

export type Sprint = z.infer<typeof SprintSchema>;
