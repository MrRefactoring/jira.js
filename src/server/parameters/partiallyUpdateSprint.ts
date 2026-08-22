import { z } from 'zod';
import { SprintSchema } from '../models';

export const PartiallyUpdateSprintSchema = z.object(SprintSchema.shape).extend({
  /** The Id of the sprint to update. */
  sprintId: z.number(),
});

export type PartiallyUpdateSprint = z.input<typeof PartiallyUpdateSprintSchema>;
