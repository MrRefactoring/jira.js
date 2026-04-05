import { z } from 'zod';
import { VersionRelatedWorkSchema } from '../models';

export const UpdateRelatedWorkSchema = z
  .object({
    /** The ID of the version to update the related work on. For the related work id, pass it to the input JSON. */
    id: z.string(),
  })
  .extend(VersionRelatedWorkSchema.shape);

export type UpdateRelatedWork = z.input<typeof UpdateRelatedWorkSchema>;
