import { z } from 'zod';
import { VersionRelatedWorkSchema } from '../models';

export const CreateRelatedWorkSchema = z.object({}).extend(VersionRelatedWorkSchema.shape).extend({
  id: z.string(),
});

export type CreateRelatedWork = z.input<typeof CreateRelatedWorkSchema>;
