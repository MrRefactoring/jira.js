import { z } from 'zod';
import { CreatePriorityDetailsSchema } from '../models';

export const CreatePrioritySchema = z.object({}).extend(CreatePriorityDetailsSchema.shape);

export type CreatePriority = z.input<typeof CreatePrioritySchema>;
