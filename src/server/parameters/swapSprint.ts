import { z } from 'zod';
import { SprintSwapSchema } from '../models';

export const SwapSprintSchema = z.object(SprintSwapSchema.shape).extend({
  /** The Id of the sprint to swap. */
  sprintId: z.number(),
});

export type SwapSprint = z.input<typeof SwapSprintSchema>;
