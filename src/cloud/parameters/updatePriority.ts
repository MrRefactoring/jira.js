import { z } from 'zod';
import { UpdatePriorityDetailsSchema } from '../models';

export const UpdatePrioritySchema = z
  .object({
    /** The ID of the issue priority. */
    id: z.string(),
  })
  .extend(UpdatePriorityDetailsSchema.shape);

export type UpdatePriority = z.input<typeof UpdatePrioritySchema>;
