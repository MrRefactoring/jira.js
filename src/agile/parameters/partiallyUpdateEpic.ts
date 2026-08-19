import { z } from 'zod';
import { EpicUpdateSchema } from '../models';

export const PartiallyUpdateEpicSchema = z.object(EpicUpdateSchema.shape).extend({
  /** The id or key of the epic to update. */
  epicIdOrKey: z.string(),
});

export type PartiallyUpdateEpic = z.input<typeof PartiallyUpdateEpicSchema>;
