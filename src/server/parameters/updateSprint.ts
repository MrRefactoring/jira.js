import { z } from 'zod';
import { SprintSchema } from '../models';

export const UpdateSprintSchema = z.object(SprintSchema.shape).extend({
  /** The Id of the sprint to update. */
  sprintId: z.number(),
});

export type UpdateSprint = z.input<typeof UpdateSprintSchema>;
