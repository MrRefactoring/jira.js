import { z } from 'zod';
import { SetDefaultPriorityRequestSchema } from '../models';

export const SetDefaultPrioritySchema = z.object(SetDefaultPriorityRequestSchema.shape);

export type SetDefaultPriority = z.input<typeof SetDefaultPrioritySchema>;
