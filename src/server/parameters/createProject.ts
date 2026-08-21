import { z } from 'zod';
import { ProjectInputSchema } from '../models';

export const CreateProjectSchema = z.object(ProjectInputSchema.shape);

export type CreateProject = z.input<typeof CreateProjectSchema>;
