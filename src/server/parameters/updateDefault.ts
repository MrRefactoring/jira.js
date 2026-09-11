import { z } from 'zod';
import { DefaultSchema } from '../models';

export const UpdateDefaultSchema = z.object(DefaultSchema.shape).extend({
  /** The id of the scheme. */
  id: z.number(),
});

export type UpdateDefault = z.input<typeof UpdateDefaultSchema>;
