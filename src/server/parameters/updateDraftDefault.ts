import { z } from 'zod';
import { DefaultSchema } from '../models';

export const UpdateDraftDefaultSchema = z.object(DefaultSchema.shape).extend({
  /** The id of the parent scheme. */
  id: z.number(),
});

export type UpdateDraftDefault = z.input<typeof UpdateDraftDefaultSchema>;
