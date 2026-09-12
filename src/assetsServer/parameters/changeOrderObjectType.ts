import { z } from 'zod';
import { JSTreePositionSchema } from '../models';

export const ChangeOrderObjectTypeSchema = z.object(JSTreePositionSchema.shape).extend({
  /** The ID of the object type to change the position of. */
  affectedId: z.string(),
});

export type ChangeOrderObjectType = z.input<typeof ChangeOrderObjectTypeSchema>;
