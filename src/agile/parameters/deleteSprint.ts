import { z } from 'zod';

export const DeleteSprintSchema = z.object({
  /** The ID of the sprint to delete. */
  sprintId: z.number(),
});

export type DeleteSprint = z.input<typeof DeleteSprintSchema>;
