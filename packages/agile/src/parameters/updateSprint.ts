import { z } from 'zod';

export const UpdateSprintSchema = z.object({
  /** The ID of the sprint to update. */
  sprintId: z.number(),
  completeDate: z.union([z.string(), z.date()]).optional(),
  createdDate: z.union([z.string(), z.date()]).optional(),
  endDate: z.union([z.string(), z.date()]).optional(),
  goal: z.string().optional(),
  id: z.number().optional(),
  name: z.string().max(30, 'name must be at most 30 characters'),
  originBoardId: z.number().optional(),
  startDate: z.union([z.string(), z.date()]).optional(),
  state: z.string(),
});

export type UpdateSprint = z.input<typeof UpdateSprintSchema>;
