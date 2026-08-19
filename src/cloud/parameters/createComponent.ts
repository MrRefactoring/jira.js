import { z } from 'zod';
import { ProjectComponentSchema } from '../models';

export const CreateComponentSchema = z.object(ProjectComponentSchema.shape);

export type CreateComponent = z.input<typeof CreateComponentSchema>;
