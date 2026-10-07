import { z } from 'zod';

export const CreateSprintSchema = z.object({
  autoStartStop: z.boolean().optional(),
  endDate: z.string().optional(),
  goal: z.string().optional(),
  incompleteIssuesDestinationId: z.number().optional(),
  name: z.string(),
  originBoardId: z.number().optional(),
  startDate: z.string().optional(),
  synced: z.boolean().optional(),
  userProfileTimeZone: z.string().optional(),
});

export type CreateSprint = z.input<typeof CreateSprintSchema>;
