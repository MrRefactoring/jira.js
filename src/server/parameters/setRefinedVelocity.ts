import { z } from 'zod';
import { BooleanSettingSchema } from '../models';

export const SetRefinedVelocitySchema = z.object(BooleanSettingSchema.shape).extend({
  /** The id of the board on which the property will be set. */
  boardId: z.number(),
});

export type SetRefinedVelocity = z.input<typeof SetRefinedVelocitySchema>;
