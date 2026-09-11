import { z } from 'zod';
import { apiObject } from '#/core';

export const SprintCreateSchema = apiObject({
  autoStartStop: z.boolean().optional(),
  endDate: z.string().optional(),
  goal: z.string().optional(),
  incompleteIssuesDestinationId: z.number().optional(),
  name: z.string().optional(),
  originBoardId: z.number().optional(),
  startDate: z.string().optional(),
  synced: z.boolean().optional(),
  userProfileTimeZone: z.string().optional(),
});

export type SprintCreate = z.infer<typeof SprintCreateSchema>;
