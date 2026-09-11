import { z } from 'zod';
import { VersionSchema } from '../models';

export const UpdateVersionSchema = z.object({
  /** ID of the version. */
  id: z.string(),
  body: VersionSchema,
});

export type UpdateVersion = z.input<typeof UpdateVersionSchema>;
