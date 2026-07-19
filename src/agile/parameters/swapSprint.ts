import { z } from 'zod';

export const SwapSprintSchema = z.object({
  /** The ID of the sprint to swap. */
  sprintId: z.number(),
  sprintToSwapWith: z.number().optional(),
});

export type SwapSprint = z.input<typeof SwapSprintSchema>;
