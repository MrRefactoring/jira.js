import { z } from 'zod';
import { ComponentSchema } from '../models';

export const CreateComponentSchema = z.object(ComponentSchema.shape);

export type CreateComponent = z.input<typeof CreateComponentSchema>;
