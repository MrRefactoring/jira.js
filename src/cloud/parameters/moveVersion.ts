import { z } from 'zod';
import { VersionMoveSchema } from '../models';

export const MoveVersionSchema = z.object({}).extend(VersionMoveSchema.shape).extend({
  /** The ID of the version to be moved. */
  id: z.string(),
});

export type MoveVersion = z.input<typeof MoveVersionSchema>;
