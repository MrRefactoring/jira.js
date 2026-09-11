import { z } from 'zod';
import { ProjectCategorySchema } from '../models';

export const UpdateProjectCategorySchema = z.object({
  /** Id of the project category to modify. */
  id: z.number(),
  body: ProjectCategorySchema,
});

export type UpdateProjectCategory = z.input<typeof UpdateProjectCategorySchema>;
