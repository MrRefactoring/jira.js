import { z } from 'zod';
import { ProjectCategorySchema } from '../models';

export const UpdateProjectCategorySchema = z.object({
  id: z.number(),
  body: ProjectCategorySchema,
});

export type UpdateProjectCategory = z.input<typeof UpdateProjectCategorySchema>;
