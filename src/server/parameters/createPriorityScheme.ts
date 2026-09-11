import { z } from 'zod';
import { PrioritySchemeUpdateSchema } from '../models';

export const CreatePrioritySchemeSchema = z.object(PrioritySchemeUpdateSchema.shape);

export type CreatePriorityScheme = z.input<typeof CreatePrioritySchemeSchema>;
