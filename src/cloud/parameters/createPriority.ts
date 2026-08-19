import { z } from 'zod';
import { CreatePriorityDetailsSchema } from '../models';

export const CreatePrioritySchema = z.object(CreatePriorityDetailsSchema.shape);

export type CreatePriority = z.input<typeof CreatePrioritySchema>;
