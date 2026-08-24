import { z } from 'zod';
import { StatusInSchema } from '../models';

export const UpdateStatusTypeSchema = z.object(StatusInSchema.shape).extend({
  /** Status type id */
  id: z.string(),
});

export type UpdateStatusType = z.input<typeof UpdateStatusTypeSchema>;
