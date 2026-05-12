import { z } from 'zod';
import { ProjectCategorySchema } from '../models';

export const CreateProjectCategorySchema = z.object({}).extend(ProjectCategorySchema.shape);

export type CreateProjectCategory = z.input<typeof CreateProjectCategorySchema>;
