import { z } from 'zod';

export const GetSprintSchema = z.object({
  /** The ID of the requested sprint. */
  sprintId: z.number(),
});

export type GetSprint = z.input<typeof GetSprintSchema>;
