import { z } from 'zod';

export const CreateSprintSchema = z.object({
  endDate: z.union([z.string(), z.date()]).optional(),
  goal: z.string().optional(),
  name: z.string().max(30, 'name must be at most 30 characters'),
  originBoardId: z.number().optional(),
  startDate: z.union([z.string(), z.date()]).optional(),
});

export type CreateSprint = z.input<typeof CreateSprintSchema>;
