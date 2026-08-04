import { z } from 'zod';
import { VersionRelatedWorkSchema } from '../models';

export const UpdateRelatedWorkSchema = z.object({}).extend(VersionRelatedWorkSchema.shape).extend({
  /** The ID of the version to update the related work on. For the related work id, pass it to the input JSON. */
  id: z.string(),
});

export type UpdateRelatedWork = z.input<typeof UpdateRelatedWorkSchema>;
