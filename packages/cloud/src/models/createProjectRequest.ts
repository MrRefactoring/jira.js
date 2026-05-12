import { z } from 'zod';
import { CreateProjectDetailsSchema } from '#/models/createProjectDetails';

export const CreateProjectRequestSchema = z.object({}).extend(CreateProjectDetailsSchema.shape).extend({
  leadAccountId: z.string(),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;
