import { z } from 'zod';
import { apiObject } from '#/core';

export const SprintSchema = apiObject({
  activatedDate: z.string().optional(),
  autoStartStop: z.boolean().optional(),
  completeDate: z.string().optional(),
  endDate: z.string().optional(),
  goal: z.string().optional(),
  id: z.number().optional(),
  incompleteIssuesDestinationId: z.number().optional(),
  name: z.string().optional(),
  originBoardId: z.number().optional(),
  self: z.url().optional(),
  startDate: z.string().optional(),
  state: z.string().optional(),
  synced: z.boolean().optional(),
});

export type Sprint = z.infer<typeof SprintSchema>;
