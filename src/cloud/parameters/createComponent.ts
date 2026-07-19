import { z } from 'zod';
import { ProjectComponentSchema } from '../models';

export const CreateComponentSchema = z.object({}).extend(ProjectComponentSchema.shape);

export type CreateComponent = z.input<typeof CreateComponentSchema>;
