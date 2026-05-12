import { z } from 'zod';
import { VersionSchema } from '../models';

export const UpdateVersionSchema = z
  .object({
    /** The ID of the version. */
    id: z.string(),
  })
  .extend(VersionSchema.shape);

export type UpdateVersion = z.input<typeof UpdateVersionSchema>;
