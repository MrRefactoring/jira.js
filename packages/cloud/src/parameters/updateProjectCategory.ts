import { z } from 'zod';
import { ProjectCategorySchema } from '../models';

export const UpdateProjectCategorySchema = z
  .object({
    id: z.number(),
  })
  .extend(ProjectCategorySchema.shape);

export type UpdateProjectCategory = z.input<typeof UpdateProjectCategorySchema>;
