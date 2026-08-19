import { z } from 'zod';
import { UpdatePriorityDetailsSchema } from '../models';

export const UpdatePrioritySchema = z.object(UpdatePriorityDetailsSchema.shape).extend({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type UpdatePriority = z.input<typeof UpdatePrioritySchema>;
