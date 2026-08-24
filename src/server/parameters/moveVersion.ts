import { z } from 'zod';
import { VersionMoveSchema } from '../models';

export const MoveVersionSchema = z.object(VersionMoveSchema.shape).extend({
  /** ID of the version. */
  id: z.string(),
});

export type MoveVersion = z.input<typeof MoveVersionSchema>;
