import { z } from 'zod';

export const UpdateSprintSchema = z.object({
  /** The Id of the sprint to update. */
  sprintId: z.number(),
  activatedDate: z.string().optional(),
  autoStartStop: z.boolean().optional(),
  completeDate: z.string().optional(),
  endDate: z.string().optional(),
  goal: z.string().optional(),
  id: z.number().optional(),
  incompleteIssuesDestinationId: z.number().optional(),
  name: z.string(),
  originBoardId: z.number().optional(),
  self: z.url().optional(),
  startDate: z.string().optional(),
  state: z.string(),
  synced: z.boolean().optional(),
});

export type UpdateSprint = z.input<typeof UpdateSprintSchema>;
