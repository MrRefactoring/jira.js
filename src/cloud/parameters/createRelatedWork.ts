import { z } from 'zod';
import { VersionRelatedWorkSchema } from '../models';

export const CreateRelatedWorkSchema = z
  .object({
    id: z.string(),
  })
  .extend(VersionRelatedWorkSchema.shape);

export type CreateRelatedWork = z.input<typeof CreateRelatedWorkSchema>;
