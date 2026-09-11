import { z } from 'zod';
import { SprintCreateSchema } from '../models';

export const CreateSprintSchema = z.object(SprintCreateSchema.shape);

export type CreateSprint = z.input<typeof CreateSprintSchema>;
