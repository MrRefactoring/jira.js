import { z } from 'zod';
import { VersionMoveSchema } from '../models';

export const MoveVersionSchema = z
  .object({
    /** The ID of the version to be moved. */
    id: z.string(),
  })
  .extend(VersionMoveSchema.shape);

export type MoveVersion = z.input<typeof MoveVersionSchema>;
